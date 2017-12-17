"use strict;"

// adapted from v3.6.2

const mathPRNG = function(x) {
  if (x < 0 || x > 53) { return NaN; }
  var n = 0 | Math.random() * 0x40000000; // 1 << 30
  return x > 30 ? n + (0 | Math.random() * (1 << x - 30)) * 0x40000000 : n >>> 30 - x;
};
mathPRNG.engine = "math"

const cryptoPRNG = (function() {

  var crypto = null, cryptoPRNG = mathPRNG;
  if (typeof window !== "undefined" && (crypto = window.crypto || window.msCrypto)) {
    if (crypto.getRandomValues && typeof Uint32Array !== "undefined") {
      // Web Cryptography API
      cryptoPRNG = function(x) {
        if (x < 0 || x > 53) { return NaN; }
        var ns = new Uint32Array(x > 32 ? 2 : 1);
        ns = crypto.getRandomValues(ns) || ns;
        return x > 32 ? ns[0] + (ns[1] >>> 64 - x) * 0x100000000 : ns[0] >>> 32 - x;
      };
      cryptoPRNG.engine = "webcrypto"
    }
  } else if (typeof require !== "undefined" && (crypto = require("crypto"))) {
    if (crypto.randomBytes) {
      // nodejs
      cryptoPRNG = function(x) {
        if (x < 0 || x > 53) { return NaN; }
        var buf = crypto.randomBytes(x > 32 ? 8 : 4), n = buf.readUInt32BE(0);
        return x > 32 ? n + (buf.readUInt32BE(4) >>> 64 - x) * 0x100000000 : n >>> 32 - x;
      };
      cryptoPRNG.engine = "nodejscrypto"
    }
  }
  return cryptoPRNG;

})();


// for IE11
if (!String.prototype.repeat) {
  String.prototype.repeat = function(x) {
    if (x < 0) { throw "negative value" }
    const s = String(this)
    let result = ""
    for (let i = 0; i < x; i++) { result += s }
    return result
  }
}


// pass/fail counters
let pass = 0, fail = 0

const testPRNG = function(prng, bit) {
  const n = 10000
  const test = prng.engine + "(" + bit + ")"

  // binom dist 99.9% confidence interval
  const margin = 3.290527 * Math.sqrt(0.5 * 0.5 / n)
  const ubound = n * (0.5 + margin), lbound = n * (0.5 - margin)
  const ci = "CI(99.9%): [" + Math.ceil(lbound) + ", " + Math.floor(ubound) + "]"

  // generate samples
  const ns = []
  for (let i = 0; i < n; i++) { ns[i] = prng(bit) }

  const bitMatrix = ns.map(function(e) {
    const x = e.toString(2)
    return (("0").repeat(bit - x.length) + x).split("").map(Number)
  })

  const transposed = []
  for (let i = 0; i < bit; i++) {
    transposed[i] = []
    for (let j = 0; j < n; j++) {
      transposed[i][j] = bitMatrix[j][i]
    }
  }

  // uniformity
  for (let i = 0; i < bit; i++) {
    const count = transposed[i].reduce(function(x, y) { return x + y }, 0)
    if (count < lbound || ubound < count) {
      console.log("%s: count(bit%d): %d; %s", test, i, count, ci)
      fail++
    } else {
      pass++
    }
  }

  // correlation table (abbreviated test)
  for (let i = 0; i < bit; i++) {
    for (let j = i + 1; j < bit; j++) {
      let count = 0
      for (let k = 0; k < n; k++) {
        if (transposed[i][k] === transposed[j][k]) { count++ }
      }
      if (count < lbound || ubound < count) {
        console.log("%s: count(bit%d === bit%d): %d; %s", test, i, j, count, ci)
        fail++
      } else {
        pass++
      }
    }
  }
}


// main
console.log("Begin testing (some should fail by design)")
const bs = [ 4, 6, 8, 12, 14, 16, 32, 40, 48 ]
console.group("Engine: " + mathPRNG.engine)
bs.forEach(testPRNG.bind(null, mathPRNG))
console.groupEnd()
console.group("Engine: " + cryptoPRNG.engine)
bs.forEach(testPRNG.bind(null, cryptoPRNG))
console.groupEnd()
console.log("%d tests completed: pass %d, fail %d", pass + fail, pass, fail)

// vim: et ts=2 sw=2
