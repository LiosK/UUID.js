export function generate(): string;

export function genV4(): UUID;
export function genV1(): UUID;
export function parse(strId: string): UUID;

export const FIELD_NAMES: string[];
export const FIELD_SIZES: number[];
export const NIL: UUID;

interface UUID {
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
}

export function resetState(): void;
export function useMathRandom(): void;

// Hide unnecessary methods
export let overwrittenUUID: any;

interface UUIDFields<T> extends Array<T> {
  timeLow: T;
  timeMid: T;
  timeHiAndVersion: T;
  clockSeqHiAndReserved: T;
  clockSeqLow: T;
  node: T;
}

// Modern class-based definition
export default class UUIDClass {
  static generate(): string;

  static genV4(): UUIDClass;
  static genV1(): UUIDClass;
  static parse(strId: string): UUIDClass;

  static readonly FIELD_NAMES: string[];
  static readonly FIELD_SIZES: number[];
  static readonly NIL: UUIDClass;

  readonly intFields: UUIDFields<number>;
  readonly bitFields: UUIDFields<string>;
  readonly hexFields: UUIDFields<string>;
  readonly version: number;
  readonly bitString: string;
  readonly hexNoDelim: string;
  readonly hexString: string;
  readonly urn: string;
  toString(): string;
  equals(uuid: UUIDClass): boolean;

  static resetState(): void;
  static useMathRandom(): void;

  static overwrittenUUID: any;
}
