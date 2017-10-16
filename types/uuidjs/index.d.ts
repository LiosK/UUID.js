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

// Hide unnecessary and/or deprecated methods
export let overwrittenUUID: any;
export function makeBackwardCompatible(): void;

interface UUIDFields<T> extends Array<T> {
  timeLow: T;
  timeMid: T;
  timeHiAndVersion: T;
  clockSeqHiAndReserved: T;
  clockSeqLow: T;
  node: T;
}
