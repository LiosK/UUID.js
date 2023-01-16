export interface UUIDFields<T> extends Array<T> {
  timeLow: T;
  timeMid: T;
  timeHiAndVersion: T;
  clockSeqHiAndReserved: T;
  clockSeqLow: T;
  node: T;
}

/**
 * Modern class-based definition
 *
 * @since v4.2.0
 */
export default class UUID {
  static generate(): string;

  static genV4(): UUID;
  static genV1(): UUID;
  /**
   * @since v4.2.13
   * @experimental
   */
  static genV6(): UUID;
  static parse(strId: string): UUID;

  static readonly FIELD_NAMES: string[];
  static readonly FIELD_SIZES: number[];
  static readonly NIL: UUID;

  readonly intFields: UUIDFields<number>;
  readonly bitFields: UUIDFields<string>;
  readonly hexFields: UUIDFields<string>;
  readonly version: number;
  readonly bitString: string;
  readonly hexNoDelim: string;
  readonly hexString: string;
  readonly urn: string;
  toString(): string;
  equals(uuid: UUID): boolean;

  static resetState(): void;
  static useMathRandom(): void;

  // Hide unnecessary methods
  static overwrittenUUID: any;
}
