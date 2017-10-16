declare class UUID {
  static generate(): string;

  static readonly FIELD_NAMES: string[];
  static readonly FIELD_SIZES: number[];
  static readonly NIL: UUID;

  static genV4(): UUID;
  static genV1(): UUID;
  static parse(strId: string): UUID;

  intFields: UUIDFields<number>;
  bitFields: UUIDFields<string>;
  hexFields: UUIDFields<string>;
  version: number;
  bitString: string;
  hexNoDelim: string;
  hexString: string;
  urn: string;
  toString(): string;
  equals(uuid: UUID): boolean;

  static overwrittenUUID: any;
  static resetState(): void;
  static useMathRandom(): void;
  // static makeBackwardCompatible(): void;
}

declare class UUIDFields<T> extends Array<T> {
  timeLow: T;
  timeMid: T;
  timeHiAndVersion: T;
  clockSeqHiAndReserved: T;
  clockSeqLow: T;
  node: T;
}
