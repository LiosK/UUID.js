/** @namespace */
export declare module UUID {
   /**
    * Generates a version 4 UUID as a hexadecimal string.
    * @returns {string} Hexadecimal UUID string.
    */
   function generate(): string;

   /**
    * Returns an unsigned x-bit random integer.
    * @private
    * @param {number} x Positive integer ranging from 0 to 53, inclusive.
    * @returns {number} Unsigned x-bit random integer (0 <= f(x) < 2^x).
    */
   function _getRandomInt(x: number): number;

   /**
    * Converts an integer to a zero-filled hexadecimal string.
    * @private
    * @param {number} num
    * @param {number} length
    * @returns {string}
    */
   function _hexAligner(num: number, length: number): string;

   /**
    * Retains the value of 'UUID' global variable assigned before loading UUID.js.
    * @since 3.2
    */
   var overwrittenUUID: any;

}

