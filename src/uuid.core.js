/**
 * UUID.core.js: A small subset of UUID.js, the RFC-compliant UUID generator for JavaScript.
 *
 * @file
 * @author  LiosK
 * @version v3.5.0-rc
 * @license The MIT License: Copyright (c) 2010-2017 LiosK.
 */

/** @namespace */
var UUID;

UUID = (function(overwrittenUUID) {
"use strict";

// Core Component {{{

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
 * @private
 * @param {int} x A positive integer ranging from 0 to 53, inclusive.
 * @returns {int} An unsigned x-bit random integer (0 <= f(x) < 2^x).
 */
UUID._getRandomInt = function(x) {
  if (x < 0 || x > 53) { return NaN; }
  var n = 0 | Math.random() * 0x40000000; // 1 << 30
  return x > 30 ? n + (0 | Math.random() * (1 << x - 30)) * 0x40000000 : n >>> 30 - x;
};

/**
 * Converts an integer to a zero-filled hexadecimal string.
 * @private
 * @param {int} num
 * @param {int} length
 * @returns {string}
 */
UUID._hexAligner = function(num, length) {
  var str = num.toString(16), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
};

/**
 * Preserves the value of 'UUID' global variable set before the load of UUID.js.
 * @since 3.2
 * @type object
 */
UUID.overwrittenUUID = overwrittenUUID;

// }}}

// create local namespace
function UUID() {}

// for nodejs
if (typeof module !== "undefined" && module && module.exports) {
  module.exports = UUID;
}

return UUID;

})(UUID);

// vim: et ts=2 sw=2 fdm=marker fmr&
