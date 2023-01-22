export interface UUIDFields<T> extends ReadonlyArray<T> {
  readonly timeLow: T;
  readonly timeMid: T;
  readonly timeHiAndVersion: T;
  readonly clockSeqHiAndReserved: T;
  readonly clockSeqLow: T;
  readonly node: T;
}

export class UUID {
  private constructor();

  static generate(): string;

  static genV4(): UUID;
  static genV1(): UUID;
  /**
   * @since v4.2.13
   * @experimental
   */
  static genV6(): UUID;
  static parse(strId: string): UUID | null;

  static readonly FIELD_NAMES: readonly string[];
  static readonly FIELD_SIZES: readonly number[];
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
}
