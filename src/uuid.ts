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
export class UUID {
  // Core Component {{{

  /**
   * Generates a UUIDv4 as a hexadecimal string.
   * @returns The hexadecimal UUID string.
   */
  static generate(): string {
    var rand = UUID._getRandomInt,
      hex = UUID._hexAligner;
    return (
      hex(rand(32), 8) + // time_low
      "-" +
      hex(rand(16), 4) + // time_mid
      "-" +
      hex(0x4000 | rand(12), 4) + // time_hi_and_version
      "-" +
      hex(0x8000 | rand(14), 4) + // clock_seq_hi_and_reserved clock_seq_low
      "-" +
      hex(rand(48), 12) // node
    );
  }

  /**
   * Returns an unsigned `x`-bit random integer.
   * @param x - An unsigned integer ranging from 0 to 53, inclusive.
   * @returns An unsigned `x`-bit random integer (`0 <= f(x) < 2^x`).
   */
  private static _getRandomInt(x: number): number {
    if (x < 0 || x > 53) {
      return NaN;
    }
    var n = 0 | (Math.random() * 0x40000000); // 1 << 30
    return x > 30
      ? n + (0 | (Math.random() * (1 << (x - 30)))) * 0x40000000
      : n >>> (30 - x);
  }

  /**
   * Converts an integer to a zero-filled hexadecimal string.
   */
  private static _hexAligner(num: number, length: number): string {
    var str = num.toString(16),
      i = length - str.length,
      z = "0";
    for (; i > 0; i >>>= 1, z += z) {
      if (i & 1) {
        str = z + str;
      }
    }
    return str;
  }

  // }}}

  // Advanced Random Number Generator Component {{{

  private static _mathPRNG = UUID._getRandomInt;

  /**
   * Enables Math.random()-based pseudorandom number generator instead of cryptographically safer options.
   * @since v3.5.0
   * @deprecated This method is provided only to work around performance drawbacks of the safer algorithms.
   */
  static useMathRandom(): void {
    UUID._getRandomInt = UUID._mathPRNG;
  }

  static {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      // Web Cryptography API
      this._getRandomInt = (x) => {
        if (x < 0 || x > 53) {
          return NaN;
        }
        var ns = new Uint32Array(x > 32 ? 2 : 1);
        crypto.getRandomValues(ns);
        return x > 32
          ? ns[0] + (ns[1] >>> (64 - x)) * 0x100000000
          : ns[0] >>> (32 - x);
      };
    }
  }

  // }}}

  // UUID Object Component {{{

  /**
   * The names of UUID internal fields.
   *
   * Note that these internal fields from the obsolete RFC 4122 are no longer
   * used in the current RFC 9562.
   * @since 3.0
   */
  static readonly FIELD_NAMES: readonly string[] = [
    "timeLow",
    "timeMid",
    "timeHiAndVersion",
    "clockSeqHiAndReserved",
    "clockSeqLow",
    "node",
  ];

  /**
   * The sizes of UUID internal fields.
   *
   * Note that these internal fields from the obsolete RFC 4122 are no longer
   * used in the current RFC 9562.
   * @since 3.0
   */
  static readonly FIELD_SIZES: readonly number[] = [32, 16, 16, 8, 8, 48];

  /**
   * Creates a UUIDv4 object.
   * @returns A UUIDv4 object.
   * @since 3.0
   */
  static genV4(): UUID {
    var rand = UUID._getRandomInt;
    return new UUID(
      rand(32), // time_low
      rand(16), // time_mid
      0x4000 | rand(12), // time_hi_and_version
      0x80 | rand(6), // clock_seq_hi_and_reserved
      rand(8), // clock_seq_low
      rand(48), // node
    );
  }

  /**
   * Converts a hexadecimal UUID string to a UUID object.
   * @param strId - A hexadecimal UUID string ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
   * @returns The UUID object or `null`.
   * @since 3.0
   */
  static parse(strId: string): UUID | null {
    var r,
      p =
        /^\s*(urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(\})?\s*$/i;
    if ((r = p.exec(strId))) {
      var l = r[1] || "",
        t = r[8] || "";
      if (
        l + t === "" ||
        (l === "{" && t === "}") ||
        (l.toLowerCase() === "urn:uuid:" && t === "")
      ) {
        return new UUID(
          parseInt(r[2], 16),
          parseInt(r[3], 16),
          parseInt(r[4], 16),
          parseInt(r[5], 16),
          parseInt(r[6], 16),
          parseInt(r[7], 16),
        );
      }
    }
    return null;
  }

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
  private constructor(
    _timeLow: number,
    _timeMid: number,
    _timeHiAndVersion: number,
    _clockSeqHiAndReserved: number,
    _clockSeqLow: number,
    _node: number,
  ) {
    var names = UUID.FIELD_NAMES,
      sizes = UUID.FIELD_SIZES;
    var bin = UUID._binAligner,
      hex = UUID._hexAligner;

    // @ts-ignore
    this.intFields = new Array(6);
    // @ts-ignore
    this.bitFields = new Array(6);
    // @ts-ignore
    this.hexFields = new Array(6);

    for (var i = 0; i < 6; i++) {
      var intValue = parseInt(arguments[i] || 0);
      // @ts-ignore
      this.intFields[i] = this.intFields[names[i]] = intValue;
      // @ts-ignore
      this.bitFields[i] = this.bitFields[names[i]] = bin(intValue, sizes[i]);
      // @ts-ignore
      this.hexFields[i] = this.hexFields[names[i]] = hex(
        intValue,
        sizes[i] >>> 2,
      );
    }

    this.version = (this.intFields.timeHiAndVersion >>> 12) & 0xf;

    this.bitString = this.bitFields.join("");

    this.hexNoDelim = this.hexFields.join("");

    this.hexString =
      this.hexFields[0] +
      "-" +
      this.hexFields[1] +
      "-" +
      this.hexFields[2] +
      "-" +
      this.hexFields[3] +
      this.hexFields[4] +
      "-" +
      this.hexFields[5];

    this.urn = "urn:uuid:" + this.hexString;
  }

  /**
   * Converts an integer to a zero-filled binary string.
   */
  private static _binAligner(num: number, length: number): string {
    var str = num.toString(2),
      i = length - str.length,
      z = "0";
    for (; i > 0; i >>>= 1, z += z) {
      if (i & 1) {
        str = z + str;
      }
    }
    return str;
  }

  /**
   * Returns the hexadecimal string representation.
   * @returns {@link UUID#hexString}.
   */
  toString(): string {
    return this.hexString;
  }

  /**
   * Tests if two UUID objects are equal.
   * @returns `true` if two UUID objects are equal.
   */
  equals(uuid: UUID): boolean {
    if (!(uuid instanceof UUID)) {
      return false;
    }
    for (var i = 0; i < 6; i++) {
      if (this.intFields[i] !== uuid.intFields[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * A nil UUID object.
   * @since v3.4.0
   */
  static readonly NIL: UUID = new UUID(0, 0, 0, 0, 0, 0);

  // }}}

  // UUIDv1 Component (1 of 2) {{{

  /**
   * Creates a UUIDv1 object.
   * @returns A UUIDv1 object.
   * @since 3.0
   */
  static genV1(): UUID {
    if (UUID._state == null) {
      UUID._state = new UUIDState();
    }
    var now = new Date().getTime(),
      st = UUID._state;
    if (now != st.timestamp) {
      if (now < st.timestamp) {
        st.sequence++;
      }
      st.timestamp = now;
      st.tick = UUID._getRandomInt(12); // up to 4095, allowing 5904 tick per msec
    } else if (st.tick < 9992) {
      // advance sub-millisecond fraction up to 9999 100-nanoseconds
      st.tick += 1 + UUID._getRandomInt(3);
    } else {
      // advance seq if tick overflows in remote chance
      st.sequence++;
    }

    // format time fields
    var tf = UUID._getTimeFieldValues(st.timestamp);
    var tl = tf.low + st.tick;
    var thav = (tf.hi & 0xfff) | 0x1000; // set version '0001'

    // format clock sequence
    st.sequence &= 0x3fff;
    var cshar = (st.sequence >>> 8) | 0x80; // set variant '10'
    var csl = st.sequence & 0xff;

    return new UUID(tl, tf.mid, thav, cshar, csl, st.node);
  }

  /**
   * Re-initializes the internal state for UUIDv1 and UUIDv6 creation.
   * @since 3.0
   */
  static resetState(): void {
    UUID._state = new UUIDState();
  }

  /**
   * The persistent internal state for UUIDv1 and UUIDv6 creation.
   */
  private static _state: UUIDState | null = null;

  /**
   * @param time - The number of milliseconds elapsed since 1970-01-01.
   */
  private static _getTimeFieldValues(time: number): {
    low: number;
    mid: number;
    hi: number;
    timestamp: number;
  } {
    var ts = time - Date.UTC(1582, 9, 15);
    var hm = ((ts / 0x100000000) * 10000) & 0xfffffff;
    return {
      low: ((ts & 0xfffffff) * 10000) % 0x100000000,
      mid: hm & 0xffff,
      hi: hm >>> 16,
      timestamp: ts,
    };
  }

  // }}}

  // UUIDv6 Component {{{

  /**
   * Creates a UUIDv6 object.
   * @returns A UUIDv6 object.
   * @since v4.2.13
   */
  static genV6(): UUID {
    if (UUID._state == null) {
      UUID._state = new UUIDState();
    }
    var now = new Date().getTime(),
      st = UUID._state;
    if (now != st.timestamp) {
      if (now < st.timestamp) {
        st.sequence++;
      }
      st.timestamp = now;
      st.tick = UUID._getRandomInt(12); // up to 4095, allowing 5904 tick per msec
    } else if (st.tick < 9992) {
      // advance sub-millisecond fraction up to 9999 100-nanoseconds
      st.tick += 1 + UUID._getRandomInt(3);
    } else {
      // advance seq if tick overflows in remote chance
      st.sequence++;
    }

    // format time fields
    var ts = st.timestamp - Date.UTC(1582, 9, 15);
    var th = Math.floor((ts / 0x10000000) * 10000) % 0x100000000;
    var midlow = (((ts & 0xfffffff) * 10000) & 0xfffffff) + st.tick;
    var tm = midlow >>> 12;
    var tlav = (midlow & 0xfff) | 0x6000; // set version '0110'

    // format clock sequence
    st.sequence &= 0x3fff;
    var cshar = (st.sequence >>> 8) | 0x80; // set variant '10'
    var csl = st.sequence & 0xff;

    return new UUID(th, tm, tlav, cshar, csl, st.node);
  }

  // }}}
}

// UUIDv1 Component (2 of 2) {{{

class UUIDState {
  timestamp: number;
  tick: number;
  sequence: number;
  node: number;
  constructor() {
    // @ts-ignore
    var rand = UUID._getRandomInt;
    this.timestamp = 0;
    this.tick = 0; // timestamp fraction smaller than a millisecond
    this.sequence = rand(14);
    this.node = (rand(8) | 1) * 0x10000000000 + rand(40); // set multicast bit '1'
  }
}

// }}}

// vim: fdm=marker fmr&
