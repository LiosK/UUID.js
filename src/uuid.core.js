/**
 * UUID.core.js: A small subset of UUID.js, the RFC-compliant UUID generator for JavaScript.
 *
 * @fileOverview
 * @author  LiosK
 * @version v3.3.1
 * @license The MIT License: Copyright (c) 2010-2016 LiosK.
 */

/** @constructor */
var UUID;

UUID = (function(overwrittenUUID) {
"use strict";

/** @lends UUID */
function UUID() {}

/**
 * The simplest function to get an UUID string.
 * @returns {string} A version 4 UUID string.
 */
UUID.generate = function() {
  return  hex(rand(32), 8)          // time_low
        + "-"
        + hex(rand(16), 4)          // time_mid
        + "-"
        + hex(0x4000 | rand(12), 4) // time_hi_and_version
        + "-"
        + hex(0x8000 | rand(14), 4) // clock_seq_hi_and_reserved clock_seq_low
        + "-"
        + hex(rand(48), 12);        // node
};

/**
 * Returns an unsigned x-bit random integer.
 * @param {int} x A positive integer ranging from 0 to 53, inclusive.
 * @returns {int} An unsigned x-bit random integer (0 <= f(x) < 2^x).
 */
var rand = (function() {
  if (typeof crypto === "object" && typeof crypto.getRandomValues === "function") {
    return function(x) {
      if (x < 0 || x > 53) { return NaN; }
      var nums = crypto.getRandomValues(new Uint32Array(x <= 32 ? 1 : 2));
      if (x <= 32) {
        return nums[0] >>> 32 - x;
      } else {
        return nums[0] + (nums[1] >>> 64 - x) * 0x100000000;
      }
    };
  } else {
    return function(x) {
      if (x <   0) return NaN;
      if (x <= 30) return (0 | Math.random() * (1 <<      x));
      if (x <= 53) return (0 | Math.random() * (1 <<     30))
                        + (0 | Math.random() * (1 << x - 30)) * (1 << 30);
      return NaN;
    };
  }
})();

/**
 * Converts an integer to a zero-filled hexadecimal string.
 * @param {int} num
 * @param {int} length
 * @returns {string}
 */
function hex(num, length) { // _hexAligner
  var str = num.toString(16), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
}

/**
 * Preserves the value of 'UUID' global variable set before the load of UUID.js.
 * @since core-1.1
 * @type object
 */
UUID.overwrittenUUID = overwrittenUUID;

return UUID;

})(UUID);

// vim: et ts=2 sw=2
