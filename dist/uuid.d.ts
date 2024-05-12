/**
 * UUID.js - RFC-compliant UUID Generator for JavaScript
 *
 * @author  LiosK
 * @version v5.1.0
 * @license Apache License 2.0: Copyright (c) 2010-2024 LiosK
 * @packageDocumentation
 */
/**
 * The UUID object type.
 */
export declare class UUID {
    /**
     * Generates a UUIDv4 as a hexadecimal string.
     * @returns The hexadecimal UUID string.
     */
    static generate(): string;
    /**
     * Returns an unsigned `x`-bit random integer.
     * @param x - An unsigned integer ranging from 0 to 53, inclusive.
     * @returns An unsigned `x`-bit random integer (`0 <= f(x) < 2^x`).
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
     * The names of UUID internal fields.
     *
     * Note that these internal fields from the obsolete RFC 4122 are no longer
     * used in the current RFC 9562.
     * @since 3.0
     */
    static readonly FIELD_NAMES: readonly string[];
    /**
     * The sizes of UUID internal fields.
     *
     * Note that these internal fields from the obsolete RFC 4122 are no longer
     * used in the current RFC 9562.
     * @since 3.0
     */
    static readonly FIELD_SIZES: readonly number[];
    /**
     * Creates a UUIDv4 object.
     * @returns A UUIDv4 object.
     * @since 3.0
     */
    static genV4(): UUID;
    /**
     * Converts a hexadecimal UUID string to a UUID object.
     * @param strId - A hexadecimal UUID string ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
     * @returns The UUID object or `null`.
     * @since 3.0
     */
    static parse(strId: string): UUID | null;
    /**
     * The UUID internal field values as an array of integers.
     *
     * Note that these internal fields from the obsolete RFC 4122 are no longer
     * used in the current RFC 9562.
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
     * The UUID internal field values as an array of binary strings.
     *
     * Note that these internal fields from the obsolete RFC 4122 are no longer
     * used in the current RFC 9562.
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
     * The UUID internal field values as an array of hexadecimal strings.
     *
     * Note that these internal fields from the obsolete RFC 4122 are no longer
     * used in the current RFC 9562.
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
     * The UUID version number.
     */
    readonly version: number;
    /**
     * The 128-bit binary string representation.
     */
    readonly bitString: string;
    /**
     * The non-delimited hexadecimal string representation ("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx").
     * @since v3.3.0
     */
    readonly hexNoDelim: string;
    /**
     * The hexadecimal string representation ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
     */
    readonly hexString: string;
    /**
     * The URN string representation ("urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
     */
    readonly urn: string;
    /**
     * Initializes the UUID object.
     * @param _timeLow - The time_low field (octet 0-3, uint32).
     * @param _timeMid - The time_mid field (octet 4-5, uint16).
     * @param _timeHiAndVersion - The time_hi_and_version field (octet 6-7, uint16).
     * @param _clockSeqHiAndReserved - The clock_seq_hi_and_reserved field (octet 8, uint8).
     * @param _clockSeqLow - The clock_seq_low field (octet 9, uint8).
     * @param _node - The node field (octet 10-15, uint48).
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
     * @returns `true` if two UUID objects are equal.
     */
    equals(uuid: UUID): boolean;
    /**
     * A nil UUID object.
     * @since v3.4.0
     */
    static readonly NIL: UUID;
    /**
     * Creates a UUIDv1 object.
     * @returns A UUIDv1 object.
     * @since 3.0
     */
    static genV1(): UUID;
    /**
     * Re-initializes the internal state for UUIDv1 and UUIDv6 creation.
     * @since 3.0
     */
    static resetState(): void;
    /**
     * The persistent internal state for UUIDv1 and UUIDv6 creation.
     */
    private static _state;
    /**
     * @param time - The number of milliseconds elapsed since 1970-01-01.
     */
    private static _getTimeFieldValues;
    /**
     * Creates a UUIDv6 object.
     * @returns A UUIDv6 object.
     * @since v4.2.13
     */
    static genV6(): UUID;
}
