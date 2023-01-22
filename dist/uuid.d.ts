/**
 * UUID.js - RFC-compliant UUID Generator for JavaScript
 *
 * @file
 * @author  LiosK
 * @version v4.2.13
 * @license Apache License 2.0: Copyright (c) 2010-2023 LiosK
 */
/**
 * @class
 * @classdesc {@link UUID} object.
 * @hideconstructor
 */
export declare class UUID {
    /**
     * Generates a version 4 UUID as a hexadecimal string.
     * @returns {string} Hexadecimal UUID string.
     */
    static generate(): string;
    /**
     * Returns an unsigned x-bit random integer.
     * @private
     * @param {number} x Unsigned integer ranging from 0 to 53, inclusive.
     * @returns {number} Unsigned x-bit random integer (0 <= f(x) < 2^x).
     */
    private static _getRandomInt;
    /**
     * Converts an integer to a zero-filled hexadecimal string.
     * @private
     * @param {number} num
     * @param {number} length
     * @returns {string}
     */
    private static _hexAligner;
    private static _mathPRNG;
    /**
     * Enables Math.random()-based pseudorandom number generator instead of cryptographically safer options.
     * @since v3.5.0
     * @deprecated This method is provided only to work around performance drawbacks of the safer algorithms.
     */
    static useMathRandom(): void;
    /**
     * Names of UUID internal fields.
     * @type {string[]}
     * @constant
     * @since 3.0
     */
    static readonly FIELD_NAMES: readonly string[];
    /**
     * Sizes of UUID internal fields.
     * @type {number[]}
     * @constant
     * @since 3.0
     */
    static readonly FIELD_SIZES: readonly number[];
    /**
     * Creates a version 4 {@link UUID} object.
     * @returns {UUID} Version 4 {@link UUID} object.
     * @since 3.0
     */
    static genV4(): UUID;
    /**
     * Converts a hexadecimal UUID string to a {@link UUID} object.
     * @param {string} strId Hexadecimal UUID string ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
     * @returns {UUID} {@link UUID} object or null.
     * @since 3.0
     */
    static parse(strId: string): UUID | null;
    readonly intFields: readonly number[] & {
        readonly timeLow: number;
        readonly timeMid: number;
        readonly timeHiAndVersion: number;
        readonly clockSeqHiAndReserved: number;
        readonly clockSeqLow: number;
        readonly node: number;
    };
    readonly bitFields: readonly string[] & {
        readonly timeLow: string;
        readonly timeMid: string;
        readonly timeHiAndVersion: string;
        readonly clockSeqHiAndReserved: string;
        readonly clockSeqLow: string;
        readonly node: string;
    };
    readonly hexFields: readonly string[] & {
        readonly timeLow: string;
        readonly timeMid: string;
        readonly timeHiAndVersion: string;
        readonly clockSeqHiAndReserved: string;
        readonly clockSeqLow: string;
        readonly node: string;
    };
    readonly version: number;
    readonly bitString: string;
    readonly hexNoDelim: string;
    readonly hexString: string;
    readonly urn: string;
    private constructor();
    /**
     * Initializes a {@link UUID} object.
     * @private
     * @constructs UUID
     * @param {number} [timeLow=0] time_low field (octet 0-3, uint32).
     * @param {number} [timeMid=0] time_mid field (octet 4-5, uint16).
     * @param {number} [timeHiAndVersion=0] time_hi_and_version field (octet 6-7, uint16).
     * @param {number} [clockSeqHiAndReserved=0] clock_seq_hi_and_reserved field (octet 8, uint8).
     * @param {number} [clockSeqLow=0] clock_seq_low field (octet 9, uint8).
     * @param {number} [node=0] node field (octet 10-15, uint48).
     * @returns {UUID} this.
     */
    private _init;
    /**
     * Converts an integer to a zero-filled binary string.
     * @private
     * @param {number} num
     * @param {number} length
     * @returns {string}
     */
    private static _binAligner;
    /**
     * Returns the hexadecimal string representation.
     * @returns {string} {@link UUID#hexString}.
     */
    toString(): string;
    /**
     * Tests if two {@link UUID} objects are equal.
     * @param {UUID} uuid
     * @returns {boolean} True if two {@link UUID} objects are equal.
     */
    equals(uuid: UUID): boolean;
    /**
     * Nil UUID object.
     * @type {UUID}
     * @constant
     * @since v3.4.0
     */
    static readonly NIL: UUID;
    /**
     * Creates a version 1 {@link UUID} object.
     * @returns {UUID} Version 1 {@link UUID} object.
     * @since 3.0
     */
    static genV1(): UUID;
    /**
     * Re-initializes the internal state for version 1 UUID creation.
     * @since 3.0
     */
    static resetState(): void;
    /**
     * Persistent internal state for version 1 UUID creation.
     * @private
     * @type {UUIDState}
     */
    private static _state;
    /**
     * @private
     * @param {Date|number} time ECMAScript Date Object or milliseconds from 1970-01-01.
     * @returns {any}
     */
    private static _getTimeFieldValues;
    /**
     * Creates a version 6 {@link UUID} object. This function is experimentally
     * provided based on the draft RFC and may be changed or removed in the future
     * without conforming to semantic versioning requirements.
     * @returns {UUID} Version 6 {@link UUID} object.
     * @since v4.2.13
     * @experimental
     */
    static genV6(): UUID;
}
