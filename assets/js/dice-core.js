(function (root) {
    "use strict";

    const LIMITS = Object.freeze({
      dice: 100,
      faces: 1000,
      distEntries: 40000,
      keepStates: 80000,
      convolutionWork: 8000000,
      exponent: 24
    });

    class DiceError extends Error {
      constructor(message, position) {
        super(message);
        this.name = "DiceError";
        this.position = Number.isInteger(position) ? position : null;
      }
    }

    const BIG_ZERO = 0n;
    const BIG_ONE = 1n;

    function absBig(value) {
      return value < BIG_ZERO ? -value : value;
    }

    function gcdBig(a, b) {
      a = absBig(a);
      b = absBig(b);
      while (b) {
        const next = a % b;
        a = b;
        b = next;
      }
      return a || BIG_ONE;
    }

    class Frac {
      constructor(numerator, denominator = BIG_ONE) {
        numerator = BigInt(numerator);
        denominator = BigInt(denominator);
        if (denominator === BIG_ZERO) throw new DiceError("除数不能是 0。");
        if (denominator < BIG_ZERO) {
          numerator = -numerator;
          denominator = -denominator;
        }
        const divisor = gcdBig(numerator, denominator);
        this.n = numerator / divisor;
        this.d = denominator / divisor;
        Object.freeze(this);
      }

      static fromInt(value) {
        return new Frac(BigInt(value), BIG_ONE);
      }

      static fromDecimal(text) {
        let value = String(text);
        let sign = BIG_ONE;
        if (value[0] === "-") {
          sign = -BIG_ONE;
          value = value.slice(1);
        }
        if (value[0] === "+") value = value.slice(1);
        const parts = value.split(".");
        if (parts.length > 2) throw new DiceError(`无法识别数字“${text}”。`);
        const integerPart = parts[0] || "0";
        const fractionalPart = parts[1] || "";
        if (!/^\d+$/.test(integerPart) || (fractionalPart && !/^\d+$/.test(fractionalPart))) {
          throw new DiceError(`无法识别数字“${text}”。`);
        }
        if (integerPart.length + fractionalPart.length > 30) {
          throw new DiceError("数字太长了。");
        }
        const numerator = BigInt(integerPart + fractionalPart) * sign;
        const denominator = 10n ** BigInt(fractionalPart.length);
        return new Frac(numerator, denominator);
      }

      add(other) {
        if (this.d === other.d) return new Frac(this.n + other.n, this.d);
        return new Frac(this.n * other.d + other.n * this.d, this.d * other.d);
      }

      sub(other) {
        if (this.d === other.d) return new Frac(this.n - other.n, this.d);
        return new Frac(this.n * other.d - other.n * this.d, this.d * other.d);
      }

      mul(other) {
        return new Frac(this.n * other.n, this.d * other.d);
      }

      div(other) {
        if (other.n === BIG_ZERO) throw new DiceError("除数不能是 0。");
        return new Frac(this.n * other.d, this.d * other.n);
      }

      neg() {
        return new Frac(-this.n, this.d);
      }

      pow(exponent) {
        if (!Number.isInteger(exponent) || exponent < 0) {
          throw new DiceError("指数必须是非负整数。");
        }
        return new Frac(this.n ** BigInt(exponent), this.d ** BigInt(exponent));
      }

      trunc() {
        return new Frac(this.n / this.d, BIG_ONE);
      }

      compare(other) {
        const left = this.n * other.d;
        const right = other.n * this.d;
        return left < right ? -1 : left > right ? 1 : 0;
      }

      isZero() {
        return this.n === BIG_ZERO;
      }

      isInteger() {
        return this.d === BIG_ONE;
      }

      toNumber() {
        return Number(this.n) / Number(this.d);
      }

      toString() {
        return this.d === BIG_ONE ? String(this.n) : `${this.n}/${this.d}`;
      }
    }

    Frac.ZERO = new Frac(0n, 1n);
    Frac.ONE = new Frac(1n, 1n);

    function fracText(frac, maxDecimals = 8) {
      if (frac.d === BIG_ONE) return String(frac.n);
      let reduced = frac.d;
      while (reduced % 2n === BIG_ZERO) reduced /= 2n;
      while (reduced % 5n === BIG_ZERO) reduced /= 5n;
      if (reduced === BIG_ONE && Math.abs(frac.toNumber()) < 1e12) {
        let text = frac.toNumber().toFixed(maxDecimals);
        text = text.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
        return text;
      }
      return frac.toString();
    }

    class Dist {
      constructor() {
        this.map = new Map();
        this.sorted = null;
      }

      add(value, probability) {
        if (probability.isZero()) return;
        const key = value.toString();
        const found = this.map.get(key);
        if (found) {
          found.probability = found.probability.add(probability);
        } else {
          this.map.set(key, { value, probability });
        }
        this.sorted = null;
        if (this.map.size > LIMITS.distEntries) {
          throw new DiceError(
            `可能结果超过 ${LIMITS.distEntries.toLocaleString("en-US")} 种，分布过于复杂，暂不支持绘制。`
          );
        }
      }

      isConstant() {
        return this.map.size === 1;
      }

      constantValue() {
        return this.map.values().next().value.value;
      }

      entries() {
        if (!this.sorted) {
          this.sorted = Array.from(this.map.values()).sort((a, b) => a.value.compare(b.value));
        }
        return this.sorted;
      }

      expectation() {
        let value = Frac.ZERO;
        for (const entry of this.map.values()) {
          value = value.add(entry.value.mul(entry.probability));
        }
        return value;
      }

      totalProbability() {
        let value = Frac.ZERO;
        for (const entry of this.map.values()) {
          value = value.add(entry.probability);
        }
        return value;
      }
    }

    function constantDist(value) {
      const dist = new Dist();
      dist.add(value, Frac.ONE);
      return dist;
    }

    function shiftDist(dist, amount) {
      if (amount.isZero()) return dist;
      if (dist.isConstant()) return constantDist(dist.constantValue().add(amount));
      const result = new Dist();
      for (const entry of dist.entries()) {
        result.add(entry.value.add(amount), entry.probability);
      }
      return result;
    }

    function scaleDist(dist, factor) {
      if (factor.isZero()) return constantDist(Frac.ZERO);
      if (factor.compare(Frac.ONE) === 0) return dist;
      if (dist.isConstant()) return constantDist(dist.constantValue().mul(factor));
      const result = new Dist();
      for (const entry of dist.entries()) {
        result.add(entry.value.mul(factor), entry.probability);
      }
      return result;
    }

    function addDists(left, right) {
      if (left.isConstant()) return shiftDist(right, left.constantValue());
      if (right.isConstant()) return shiftDist(left, right.constantValue());
      const result = new Dist();
      for (const a of left.entries()) {
        for (const b of right.entries()) {
          result.add(a.value.add(b.value), a.probability.mul(b.probability));
        }
      }
      return result;
    }

    function subDists(left, right) {
      return addDists(left, negateDist(right));
    }

    function negateDist(dist) {
      if (dist.isConstant()) return constantDist(dist.constantValue().neg());
      return scaleDist(dist, Frac.fromInt(-1));
    }

    function mulDists(left, right) {
      if (left.isConstant()) return scaleDist(right, left.constantValue());
      if (right.isConstant()) return scaleDist(left, right.constantValue());
      const result = new Dist();
      for (const a of left.entries()) {
        for (const b of right.entries()) {
          result.add(a.value.mul(b.value), a.probability.mul(b.probability));
        }
      }
      return result;
    }

    function divDists(left, right) {
      if (right.isConstant() && right.constantValue().isZero()) {
        throw new DiceError("除数不能是 0。");
      }
      if (right.isConstant()) {
        const divisor = right.constantValue();
        if (left.isConstant()) return constantDist(left.constantValue().div(divisor).trunc());
        const result = new Dist();
        for (const entry of left.entries()) {
          result.add(entry.value.div(divisor).trunc(), entry.probability);
        }
        return result;
      }
      for (const entry of right.entries()) {
        if (entry.value.isZero()) throw new DiceError("除数可能为 0，无法计算这条指令。");
      }
      if (left.isConstant()) {
        const numerator = left.constantValue();
        const result = new Dist();
        for (const entry of right.entries()) {
          result.add(numerator.div(entry.value).trunc(), entry.probability);
        }
        return result;
      }
      const result = new Dist();
      for (const a of left.entries()) {
        for (const b of right.entries()) {
          result.add(a.value.div(b.value).trunc(), a.probability.mul(b.probability));
        }
      }
      return result;
    }

    function powDists(base, exponent) {
      if (!exponent.isInteger() || exponent.n < BIG_ZERO) {
        throw new DiceError("指数必须是非负整数。");
      }
      const power = Number(exponent.n);
      if (!Number.isSafeInteger(power) || power > LIMITS.exponent) {
        throw new DiceError(`指数不能超过 ${LIMITS.exponent}。`);
      }
      if (base.isConstant()) return constantDist(base.constantValue().pow(power));
      if (power === 0) return constantDist(Frac.ONE);
      let result = constantDist(Frac.ONE);
      let factor = base;
      let remaining = power;
      while (remaining > 0) {
        if (remaining % 2 === 1) result = mulDists(result, factor);
        remaining = Math.floor(remaining / 2);
        if (remaining > 0) factor = mulDists(factor, factor);
      }
      return result;
    }

    function insertKept(kept, value, keepCount, mode) {
      const next = kept.slice();
      if (mode === "highest") {
        let index = next.length;
        for (let i = 0; i < next.length; i += 1) {
          if (value > next[i]) {
            index = i;
            break;
          }
        }
        next.splice(index, 0, value);
        if (next.length > keepCount) next.length = keepCount;
      } else {
        let index = next.length;
        for (let i = 0; i < next.length; i += 1) {
          if (value < next[i]) {
            index = i;
            break;
          }
        }
        next.splice(index, 0, value);
        if (next.length > keepCount) next.length = keepCount;
      }
      return next;
    }

    function sumDice(count, faceWeights) {
      let sums = new Map([[0, BIG_ONE]]);
      for (let i = 0; i < count; i += 1) {
        const next = new Map();
        for (const [sum, ways] of sums) {
          for (const [face, multiplicity] of faceWeights) {
            const total = sum + face;
            next.set(total, (next.get(total) || BIG_ZERO) + ways * multiplicity);
          }
        }
        sums = next;
        if (sums.size > LIMITS.distEntries) {
          throw new DiceError("可能结果太多，分布过于复杂，暂不支持绘制。");
        }
      }
      return sums;
    }

    function keepDice(count, faceWeights, keepCount, mode) {
      let states = new Map([["", { kept: [], ways: BIG_ONE }]]);
      for (let i = 0; i < count; i += 1) {
        const next = new Map();
        for (const state of states.values()) {
          for (const [face, multiplicity] of faceWeights) {
            const kept = insertKept(state.kept, face, keepCount, mode);
            const key = kept.join(",");
            const found = next.get(key);
            const ways = state.ways * multiplicity;
            if (found) found.ways += ways;
            else next.set(key, { kept, ways });
          }
        }
        states = next;
        if (states.size > LIMITS.keepStates) {
          throw new DiceError("保留骰的组合过多，暂不支持计算这条指令。");
        }
      }
      const sums = new Map();
      for (const state of states.values()) {
        let sum = 0;
        for (const value of state.kept) sum += value;
        sums.set(sum, (sums.get(sum) || BIG_ZERO) + state.ways);
      }
      return sums;
    }

    function diceNotation(node) {
      let text = `${node.count}d${node.faces}`;
      if (node.keepMode) text += `${node.keepMode === "highest" ? "k" : "q"}${node.keepCount}`;
      if (node.min !== null) text += `min${node.min}`;
      if (node.max !== null) text += `max${node.max}`;
      return text;
    }

    function buildDice(node) {
      if (node.min !== null && node.max !== null && node.min > node.max) {
        throw new DiceError("min 不能大于 max。");
      }
      const keepCount = node.keepMode ? node.keepCount : node.count;
      const usesKeep = Boolean(node.keepMode && keepCount < node.count);
      const estimatedWork = node.count * node.count * node.faces * node.faces;
      if (!usesKeep && estimatedWork > LIMITS.convolutionWork) {
        throw new DiceError(
          "骰子数量与面数的组合规模过大，暂不支持展开完整概率分布。请减少骰子数量或面数。",
          node.position
        );
      }
      const faceWeights = new Map();
      for (let face = 1; face <= node.faces; face += 1) {
        let value = face;
        if (node.max !== null) value = Math.min(value, node.max);
        if (node.min !== null) value = Math.max(value, node.min);
        faceWeights.set(value, (faceWeights.get(value) || BIG_ZERO) + BIG_ONE);
      }

      const totalWays = BigInt(node.faces) ** BigInt(node.count);
      const sums = usesKeep
        ? keepDice(node.count, faceWeights, keepCount, node.keepMode)
        : sumDice(node.count, faceWeights);

      const dist = new Dist();
      for (const [sum, ways] of sums) {
        dist.add(Frac.fromInt(sum), new Frac(ways, totalWays));
      }

      const entries = dist.entries();
      const expected = dist.expectation();
      let singleExpected = Frac.ZERO;
      for (const [value, multiplicity] of faceWeights) {
        singleExpected = singleExpected.add(Frac.fromInt(value).mul(new Frac(multiplicity, BigInt(node.faces))));
      }

      const info = {
        notation: diceNotation(node),
        count: node.count,
        faces: node.faces,
        keepMode: node.keepMode,
        keepCount: node.keepMode ? node.keepCount : null,
        min: node.min,
        max: node.max,
        expected: expected.toString(),
        expectedNumber: expected.toNumber(),
        singleExpected: singleExpected.toString(),
        singleExpectedNumber: singleExpected.toNumber(),
        minOutcome: entries[0].value.toNumber(),
        maxOutcome: entries[entries.length - 1].value.toNumber()
      };

      return { dist, info };
    }

    function tokenize(source) {
      const tokens = [];
      let index = 0;

      function push(type, text, start, end) {
        tokens.push({ type, text, start, end });
      }

      while (index < source.length) {
        const char = source[index];
        if (/\s/.test(char)) {
          index += 1;
          continue;
        }

        if (/[0-9.]/.test(char)) {
          const start = index;
          while (index < source.length && /[0-9.]/.test(source[index])) index += 1;
          const text = source.slice(start, index);
          if (!/^(\d+(\.\d*)?|\.\d+)$/.test(text)) {
            throw new DiceError(`无法识别数字“${text}”。`, start);
          }
          if (text.replace(".", "").length > 30) {
            throw new DiceError("数字太长了。", start);
          }
          push("NUM", text, start, index);
          continue;
        }

        if (/[a-zA-Z]/.test(char)) {
          const start = index;
          while (index < source.length && /[a-zA-Z]/.test(source[index])) index += 1;
          const word = source.slice(start, index).toLowerCase();
          const typeMap = {
            d: "D",
            k: "K",
            kh: "KH",
            kl: "KL",
            dh: "DH",
            dl: "DL",
            q: "Q",
            min: "MIN",
            max: "MAX",
            x: "MUL"
          };
          if (typeMap[word]) {
            push(typeMap[word], word, start, index);
            continue;
          }
          if (["a", "c", "f", "df", "p", "b", "lp", "sp", "tp"].includes(word)) {
            throw new DiceError(`暂不支持“${word}”运算符；第一版只实现 D&D 常用子集。`, start);
          }
          throw new DiceError(`无法识别“${word}”。`, start);
        }

        const start = index;
        const single = {
          "+": "PLUS",
          "-": "MINUS",
          "*": "STAR",
          "/": "SLASH",
          "^": "CARET",
          "(": "LPAREN",
          ")": "RPAREN"
        };
        if (single[char]) {
          index += 1;
          push(single[char], char, start, index);
          continue;
        }
        if (["[", "]", ",", "?", ":", "$", "&", "|", "!", "<", ">", "%"].includes(char)) {
          throw new DiceError(`暂不支持“${char}”语法；第一版只实现基础运算与常用骰子参数。`, start);
        }
        throw new DiceError(`无法识别“${char}”。`, start);
      }

      tokens.push({ type: "EOF", text: "", start: source.length, end: source.length });
      return tokens;
    }

    function flattenTerms(node, sign = 1, output = []) {
      if (node.kind === "binary" && (node.op === "+" || node.op === "-")) {
        flattenTerms(node.left, sign, output);
        flattenTerms(node.right, node.op === "-" ? -sign : sign, output);
      } else if (node.kind === "unary" && node.op === "-") {
        flattenTerms(node.operand, -sign, output);
      } else if (node.kind === "unary" && node.op === "+") {
        flattenTerms(node.operand, sign, output);
      } else {
        output.push({ sign, node });
      }
      return output;
    }

    const PRECEDENCE = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };

    function astToString(node, parentPrecedence = 0) {
      if (node.kind === "const") return fracText(node.value);
      if (node.kind === "dice") return diceNotation(node);
      if (node.kind === "unary") {
        const operand = astToString(node.operand, 4);
        return node.op === "-" ? `-${operand}` : `+${operand}`;
      }
      const precedence = PRECEDENCE[node.op];
      const left = astToString(node.left, precedence + (node.op === "^" ? 1 : 0));
      const right = astToString(node.right, precedence + (node.op === "+" || node.op === "*" ? 0 : 1));
      let text = `${left} ${node.op} ${right}`;
      if (precedence < parentPrecedence) text = `(${text})`;
      return text;
    }

    class Parser {
      constructor(tokens, source, warnings) {
        this.tokens = tokens;
        this.source = source;
        this.index = 0;
        this.warnings = warnings;
      }

      peek() {
        return this.tokens[this.index];
      }

      advance() {
        const token = this.tokens[this.index];
        this.index += 1;
        return token;
      }

      match(type) {
        if (this.peek().type === type) {
          this.advance();
          return true;
        }
        return false;
      }

      expect(type, message) {
        if (this.peek().type === type) return this.advance();
        throw new DiceError(message, this.peek().start);
      }

      warn(message) {
        if (!this.warnings.includes(message)) this.warnings.push(message);
      }

      parse() {
        if (this.peek().type === "EOF") {
          throw new DiceError("还没有输入指令。可以试试 4d6k3 或 rd20+5。", 0);
        }
        const expression = this.parseAdditive();
        if (this.peek().type !== "EOF") {
          const token = this.peek();
          throw new DiceError(`“${token.text || "表达式"}”后面还有无法解析的内容。`, token.start);
        }
        return expression;
      }

      parseAdditive() {
        let node = this.parseMultiplicative();
        while (this.peek().type === "PLUS" || this.peek().type === "MINUS") {
          const operator = this.advance().type === "PLUS" ? "+" : "-";
          const right = this.parseMultiplicative();
          node = { kind: "binary", op: operator, left: node, right };
        }
        return node;
      }

      parseMultiplicative() {
        let node = this.parseUnary();
        while (this.peek().type === "STAR" || this.peek().type === "SLASH" || this.peek().type === "MUL") {
          const token = this.advance();
          const operator = token.type === "SLASH" ? "/" : "*";
          const right = this.parseUnary();
          node = { kind: "binary", op: operator, left: node, right };
        }
        return node;
      }

      parseUnary() {
        if (this.peek().type === "PLUS" || this.peek().type === "MINUS") {
          const operator = this.advance().type === "MINUS" ? "-" : "+";
          return { kind: "unary", op: operator, operand: this.parseUnary() };
        }
        return this.parsePower();
      }

      parsePower() {
        const base = this.parsePrimary();
        if (this.match("CARET")) {
          const exponent = this.parseUnary();
          return { kind: "binary", op: "^", left: base, right: exponent };
        }
        return base;
      }

      parsePrimary() {
        const token = this.peek();
        if (token.type === "NUM") {
          this.advance();
          const value = Frac.fromDecimal(token.text);
          if (this.peek().type === "D") {
            this.advance();
            return this.parseDice(value, token.start);
          }
          return { kind: "const", value };
        }
        if (token.type === "D") {
          this.advance();
          return this.parseDice(Frac.ONE, token.start);
        }
        if (token.type === "LPAREN") {
          this.advance();
          const expression = this.parseAdditive();
          this.expect("RPAREN", "括号没有闭合，请补上右括号。");
          return expression;
        }
        if (token.type === "EOF") {
          throw new DiceError("表达式还没有输入完整。", token.start);
        }
        if (["STAR", "SLASH", "CARET", "RPAREN"].includes(token.type)) {
          throw new DiceError(`“${token.text}”前面缺少数字或骰子。`, token.start);
        }
        throw new DiceError("这里需要一个数字、骰子或左括号。", token.start);
      }

      parseDice(countValue, startPosition) {
        if (!countValue.isInteger()) {
          throw new DiceError("骰子数量必须是整数。", startPosition);
        }
        const count = Number(countValue.n);
        if (!Number.isSafeInteger(count) || count < 1 || count > LIMITS.dice) {
          throw new DiceError(`骰子数量必须在 1 到 ${LIMITS.dice} 之间。`, startPosition);
        }

        let faces = 20;
        if (this.peek().type === "NUM") {
          const faceToken = this.advance();
          const faceValue = Frac.fromDecimal(faceToken.text);
          if (!faceValue.isInteger()) {
            throw new DiceError("骰子面数必须是整数。", faceToken.start);
          }
          faces = Number(faceValue.n);
          if (!Number.isSafeInteger(faces) || faces < 1 || faces > LIMITS.faces) {
            throw new DiceError(`骰子面数必须在 1 到 ${LIMITS.faces} 之间。`, faceToken.start);
          }
        } else {
          this.warn("有骰子省略了面数，已按 d20 计算。");
        }

        let keepMode = null;
        let keepCount = null;
        let min = null;
        let max = null;

        while (true) {
          const type = this.peek().type;
          if (type === "K" || type === "Q" || type === "KH" || type === "KL" || type === "DH" || type === "DL") {
            if (keepMode !== null) {
              throw new DiceError("一个骰子组只能指定一次保留数量。", this.peek().start);
            }
            const modifier = this.advance();
            if (modifier.type === "K" || modifier.type === "KH" || modifier.type === "DL") {
              keepMode = "highest";
            } else {
              keepMode = "lowest";
            }
            keepCount = 1;
            if (this.peek().type === "NUM") {
              const countToken = this.advance();
              const keepValue = Frac.fromDecimal(countToken.text);
              if (!keepValue.isInteger()) {
                throw new DiceError("保留的骰子数量必须是整数。", countToken.start);
              }
              keepCount = Number(keepValue.n);
              if (!Number.isSafeInteger(keepCount) || keepCount < 1) {
                throw new DiceError("保留的骰子数量至少为 1。", countToken.start);
              }
            }
            if (keepCount > count) {
              throw new DiceError(`只有 ${count} 枚骰子，不能保留 ${keepCount} 枚。`, modifier.start);
            }
            continue;
          }

          if (type === "MIN" || type === "MAX") {
            const modifier = this.advance();
            const thresholdToken = this.peek();
            if (thresholdToken.type !== "NUM") {
              throw new DiceError(`${modifier.text} 后面需要一个整数阈值，例如 ${modifier.text}3。`, modifier.start);
            }
            this.advance();
            const thresholdValue = Frac.fromDecimal(thresholdToken.text);
            if (!thresholdValue.isInteger()) {
              throw new DiceError(`${modifier.text} 的阈值必须是整数。`, thresholdToken.start);
            }
            const threshold = Number(thresholdValue.n);
            if (!Number.isSafeInteger(threshold) || threshold < 0 || threshold > 1000000) {
              throw new DiceError("阈值超出可用范围。", thresholdToken.start);
            }
            if (type === "MIN") {
              if (min !== null) throw new DiceError("一个骰子组只能指定一次 min。", modifier.start);
              min = threshold;
            } else {
              if (max !== null) throw new DiceError("一个骰子组只能指定一次 max。", modifier.start);
              max = threshold;
            }
            continue;
          }

          break;
        }

        if (min !== null && max !== null && min > max) {
          throw new DiceError("min 不能大于 max。", startPosition);
        }

        return {
          kind: "dice",
          count,
          faces,
          keepMode,
          keepCount,
          min,
          max,
          position: startPosition
        };
      }
    }

    class Evaluator {
      constructor() {
        this.cache = new WeakMap();
        this.diceInfos = [];
      }

      evaluate(node) {
        if (this.cache.has(node)) return this.cache.get(node);
        let result;
        if (node.kind === "const") {
          result = { dist: constantDist(node.value), dice: [] };
        } else if (node.kind === "dice") {
          const built = buildDice(node);
          this.diceInfos.push(built.info);
          result = { dist: built.dist, dice: [built.info] };
        } else if (node.kind === "unary") {
          const operand = this.evaluate(node.operand);
          result = {
            dist: node.op === "-" ? negateDist(operand.dist) : operand.dist,
            dice: operand.dice
          };
        } else if (node.kind === "binary") {
          const left = this.evaluate(node.left);
          const right = this.evaluate(node.right);
          let dist;
          if (node.op === "+") dist = addDists(left.dist, right.dist);
          else if (node.op === "-") dist = subDists(left.dist, right.dist);
          else if (node.op === "*") dist = mulDists(left.dist, right.dist);
          else if (node.op === "/") dist = divDists(left.dist, right.dist);
          else if (node.op === "^") dist = powDists(left.dist, right.dist.isConstant()
            ? right.dist.constantValue()
            : (() => { throw new DiceError("指数必须是确定的整数。"); })());
          else throw new DiceError("未知的运算符。");
          result = { dist, dice: left.dice.concat(right.dice) };
        } else {
          throw new DiceError("无法解析这个表达式。");
        }
        this.cache.set(node, result);
        return result;
      }
    }

    function normalizeInput(raw) {
      if (typeof raw !== "string") throw new DiceError("请输入一条掷骰指令。");
      let source = raw.normalize("NFKC").trim();
      source = source.replace(/[×✕]/g, "*").replace(/÷/g, "/").replace(/[−–—]/g, "-");
      const warnings = [];
      const prefix = source.match(/^(?:\/r|\.r|r)(?=\s|d|\d|\(|\+|-)/i);
      if (prefix) {
        source = source.slice(prefix[0].length).trim();
        warnings.push("已忽略命令前缀 r。");
      }
      if (!source) throw new DiceError("还没有输入指令。可以试试 4d6k3 或 rd20+5。");
      return { source, warnings };
    }

    function calculate(raw) {
      const normalized = normalizeInput(raw);
      const tokens = tokenize(normalized.source);
      const parser = new Parser(tokens, normalized.source, normalized.warnings);
      const ast = parser.parse();
      const evaluator = new Evaluator();
      const root = evaluator.evaluate(ast);
      const entries = root.dist.entries();
      if (!entries.length) throw new DiceError("没有可计算的结果。");

      const expected = root.dist.expectation();
      let mode = entries[0];
      let modeCount = 1;
      for (let i = 1; i < entries.length; i += 1) {
        const compare = entries[i].probability.compare(mode.probability);
        if (compare > 0) {
          mode = entries[i];
          modeCount = 1;
        } else if (compare === 0) {
          modeCount += 1;
        }
      }

      const terms = flattenTerms(ast).map((term) => {
        const evaluated = evaluator.evaluate(term.node);
        return {
          sign: term.sign,
          text: astToString(term.node),
          expected: evaluated.dist.expectation().toString(),
          expectedNumber: evaluated.dist.expectation().toNumber(),
          isRandom: evaluated.dice.length > 0,
          dice: evaluated.dice.map((info) => info.notation)
        };
      });

      return {
        source: normalized.source,
        canonical: astToString(ast),
        expected: expected.toString(),
        expectedNumber: expected.toNumber(),
        distribution: entries.map((entry) => ({
          value: entry.value.toString(),
          valueNumber: entry.value.toNumber(),
          probability: entry.probability.toString(),
          probabilityNumber: entry.probability.toNumber()
        })),
        minOutcome: entries[0].value.toNumber(),
        maxOutcome: entries[entries.length - 1].value.toNumber(),
        outcomeCount: entries.length,
        mode: {
          value: mode.value.toNumber(),
          valueText: fracText(mode.value),
          probability: mode.probability.toNumber(),
          probabilityText: mode.probability.toString(),
          tied: modeCount > 1,
          tieCount: modeCount
        },
        probabilityTotal: root.dist.totalProbability().toString(),
        terms,
        dice: evaluator.diceInfos,
        warnings: normalized.warnings
      };
    }

    function summarizeDistribution(dist) {
      const entries = dist.entries();
      if (!entries.length) throw new DiceError("没有可计算的结果。");
      const expected = dist.expectation();
      return {
        expected: expected.toString(),
        expectedNumber: expected.toNumber(),
        distribution: entries.map((entry) => ({
          value: entry.value.toString(),
          valueNumber: entry.value.toNumber(),
          probability: entry.probability.toString(),
          probabilityNumber: entry.probability.toNumber()
        })),
        minOutcome: entries[0].value.toNumber(),
        maxOutcome: entries[entries.length - 1].value.toNumber(),
        outcomeCount: entries.length
      };
    }

    function doubleDiceForCritical(node) {
      if (node.kind === "dice") {
        return {
          kind: "binary",
          op: "+",
          left: { ...node },
          right: { ...node }
        };
      }
      if (node.kind === "const") return node;
      if (node.kind === "unary") {
        return { kind: "unary", op: node.op, operand: doubleDiceForCritical(node.operand) };
      }
      if (node.kind === "binary") {
        return {
          kind: "binary",
          op: node.op,
          left: doubleDiceForCritical(node.left),
          right: doubleDiceForCritical(node.right)
        };
      }
      throw new DiceError("无法解析这个伤害表达式。");
    }

    function analyzeDamage(raw) {
      const normalized = normalizeInput(raw);
      const tokens = tokenize(normalized.source);
      const parser = new Parser(tokens, normalized.source, normalized.warnings);
      const ast = parser.parse();
      const evaluator = new Evaluator();
      const normal = summarizeDistribution(evaluator.evaluate(ast).dist);

      const criticalAst = doubleDiceForCritical(ast);
      const criticalEvaluator = new Evaluator();
      const critical = summarizeDistribution(criticalEvaluator.evaluate(criticalAst).dist);

      return {
        source: normalized.source,
        canonical: astToString(ast),
        ...normal,
        crit: {
          ...critical,
          canonical: astToString(criticalAst)
        },
        warnings: normalized.warnings
      };
    }

    root.DiceCore = Object.freeze({ calculate, analyzeDamage, DiceError, Frac });
  })(typeof globalThis !== "undefined" ? globalThis : this);
  