/**
 * UUID.js - RFC-compliant UUID Generator for JavaScript
 *
 * @author  LiosK
 * @version v5.0.0
 * @license Apache License 2.0: Copyright (c) 2010-2023 LiosK
 * @packageDocumentation
 */
/**
 * UUID object.
 */
export declare class UUID {
    /**
     * Generates a version 4 UUID as a hexadecimal string.
     * @returns Hexadecimal UUID string.
     */
    static generate(): string;
    /**
     * Returns an unsigned x-bit random integer.
     * @param x - Unsigned integer ranging from 0 to 53, inclusive.
     * @returns Unsigned x-bit random integer (0 <= f(x) < 2^x).
     */
    private static _getRandomInt;
    /**
     * Converts an integer to a zero-filled hexadecimal string.
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
     * @since 3.0
     */
    static readonly FIELD_NAMES: readonly string[];
    /**
     * Sizes of UUID internal fields.
     * @since 3.0
     */
    static readonly FIELD_SIZES: readonly number[];
    /**
     * Creates a version 4 UUID object.
     * @returns Version 4 UUID object.
     * @since 3.0
     */
    static genV4(): UUID;
    /**
     * Converts a hexadecimal UUID string to a UUID object.
     * @param strId - Hexadecimal UUID string ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
     * @returns UUID object or null.
     * @since 3.0
     */
    static parse(strId: string): UUID | null;
    /**
     * UUID internal field values as an array of integers.
     */
    readonly intFields: readonly number[] & {
        readonly timeLow: number;
        readonly timeMid: number;
        readonly timeHiAndVersion: number;
        readonly clockSeqHiAndReserved: number;
        readonly clockSeqLow: number;
        readonly node: number;
    };
    /**
     * UUID internal field values as an array of binary strings.
     */
    readonly bitFields: readonly string[] & {
        readonly timeLow: string;
        readonly timeMid: string;
        readonly timeHiAndVersion: string;
        readonly clockSeqHiAndReserved: string;
        readonly clockSeqLow: string;
        readonly node: string;
    };
    /**
     * UUID internal field values as an array of hexadecimal strings.
     */
    readonly hexFields: readonly string[] & {
        readonly timeLow: string;
        readonly timeMid: string;
        readonly timeHiAndVersion: string;
        readonly clockSeqHiAndReserved: string;
        readonly clockSeqLow: string;
        readonly node: string;
    };
    /**
     * UUID version number.
     */
    readonly version: number;
    /**
     * 128-bit binary string representation.
     */
    readonly bitString: string;
    /**
     * Non-delimited hexadecimal string representation ("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx").
     * @since v3.3.0
     */
    readonly hexNoDelim: string;
    /**
     * Hexadecimal string representation ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
     */
    readonly hexString: string;
    /**
     * URN string representation ("urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
     */
    readonly urn: string;
    /**
     * Initializes the UUID object.
     * @param _timeLow - time_low field (octet 0-3, uint32).
     * @param _timeMid - time_mid field (octet 4-5, uint16).
     * @param _timeHiAndVersion - time_hi_and_version field (octet 6-7, uint16).
     * @param _clockSeqHiAndReserved - clock_seq_hi_and_reserved field (octet 8, uint8).
     * @param _clockSeqLow - clock_seq_low field (octet 9, uint8).
     * @param _node - node field (octet 10-15, uint48).
     */
    private constructor();
    /**
     * Converts an integer to a zero-filled binary string.
     */
    private static _binAligner;
    /**
     * Returns the hexadecimal string representation.
     * @returns {@link UUID#hexString}.
     */
    toString(): string;
    /**
     * Tests if two UUID objects are equal.
     * @returns True if two UUID objects are equal.
     */
    equals(uuid: UUID): boolean;
    /**
     * Nil UUID object.
     * @since v3.4.0
     */
    static readonly NIL: UUID;
    /**
     * Creates a version 1 UUID object.
     * @returns Version 1 UUID object.
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
     */
    private static _state;
    /**
     * @param time - Milliseconds elapsed since 1970-01-01.
     */
    private static _getTimeFieldValues;
    /**
     * Creates a version 6 UUID object. This function is experimentally provided
     * based on the draft RFC and may be changed or removed in the future without
     * conforming to semantic versioning requirements.
     * @returns Version 6 UUID object.
     * @since v4.2.13
     * @experimental
     */
    static genV6(): UUID;
}
