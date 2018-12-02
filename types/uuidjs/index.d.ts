/** @deprecated Use class-based API */
export function generate(): string;

/** @deprecated Use class-based API */
export function genV4(): UUID;

/** @deprecated Use class-based API */
export function genV1(): UUID;

/** @deprecated Use class-based API */
export function parse(strId: string): UUID;

/** @deprecated Use class-based API */
export const FIELD_NAMES: string[];

/** @deprecated Use class-based API */
export const FIELD_SIZES: number[];

/** @deprecated Use class-based API */
export const NIL: UUID;

/** @deprecated Use class-based API */
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

/** @deprecated Use class-based API */
export function resetState(): void;

/** @deprecated Use class-based API */
export function useMathRandom(): void;

/** @deprecated Use class-based API */
export let overwrittenUUID: any;

interface UUIDFields<T> extends Array<T> {
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

  // Hide unnecessary methods
  static overwrittenUUID: any;
}
