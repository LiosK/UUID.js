/**
 * UUID.core.js: A small subset of UUID.js, the RFC-compliant UUID generator for JavaScript.
 *
 * @fileOverview
 * @author  LiosK
 * @version v3.5.0-dev
 * @license The MIT License: Copyright (c) 2010-2017 LiosK.
 */

/** @constructor */
var UUID;

UUID = (function(overwrittenUUID) {
"use strict";

// Core Component {{{

/** @lends UUID */
function UUID() {}

/**
 * The simplest function to get an UUID string.
 * @returns {string} A version 4 UUID string.
 */
UUID.generate = function() {
  var rand = UUID._getRandomInt, hex = UUID._hexAligner;
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
UUID._getRandomInt = function(x) {
  if (x <   0) return NaN;
  if (x <= 30) return (0 | Math.random() * (1 <<      x));
  if (x <= 53) return (0 | Math.random() * (1 <<     30))
                    + (0 | Math.random() * (1 << x - 30)) * (1 << 30);
  return NaN;
};

if (typeof crypto === "object" && typeof crypto.getRandomValues === "function") {
  UUID._getRandomInt = function(x) {
    if (x < 0 || x > 53) { return NaN; }
    var nums = crypto.getRandomValues(new Uint32Array(x <= 32 ? 1 : 2));
    if (x <= 32) {
      return nums[0] >>> 32 - x;
    } else {
      return nums[0] + (nums[1] >>> 64 - x) * 0x100000000;
    }
  };
}

/**
 * Converts an integer to a zero-filled hexadecimal string.
 * @param {int} num
 * @param {int} length
 * @returns {string}
 */
UUID._hexAligner = function(num, length) {
  var str = num.toString(16), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
};

// }}}

// Misc. Component {{{

/**
 * Preserves the value of 'UUID' global variable set before the load of UUID.js.
 * @since 3.2
 * @type object
 */
UUID.overwrittenUUID = overwrittenUUID;

// For nodejs
if (typeof module !== "undefined" && module && module.exports) {
  module.exports = UUID;
}

// }}}

return UUID;

})(UUID);

// vim: et ts=2 sw=2 fdm=marker fmr&
