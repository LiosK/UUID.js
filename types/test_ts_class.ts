import { UUID } from "..";

interface UUIDFields<T> extends ReadonlyArray<T> {
  readonly timeLow: T;
  readonly timeMid: T;
  readonly timeHiAndVersion: T;
  readonly clockSeqHiAndReserved: T;
  readonly clockSeqLow: T;
  readonly node: T;
}

const putNum = (x: number) => console.log(`${x}: number`);
const putStr = (x: string) => console.log(`"${x}": string`);
const putBool = (x: boolean) => console.log(`${x}: boolean`);

putStr(UUID.generate());
const objV4: UUID = UUID.genV4();
const objV1: UUID = UUID.genV1();
const objV6: UUID = UUID.genV6();
const parsed: UUID | null = UUID.parse(objV4.toString());

const _FIELD_NAMES: readonly string[] = UUID.FIELD_NAMES;
const _FIELD_SIZES: readonly number[] = UUID.FIELD_SIZES;
const _NIL: UUID = UUID.NIL;

const _intFields: UUIDFields<number> = objV4.intFields;
const _bitFields: UUIDFields<string> = objV4.bitFields;
const _hexFields: UUIDFields<string> = objV4.hexFields;

for (let i = 0; i < 6; i++) {
  putNum(_intFields[i]);
  putStr(_bitFields[i]);
  putStr(_hexFields[i]);
}

putNum(_intFields.timeLow);
putNum(_intFields.timeMid);
putNum(_intFields.timeHiAndVersion);
putNum(_intFields.clockSeqHiAndReserved);
putNum(_intFields.clockSeqLow);
putNum(_intFields.node);
putStr(_bitFields.timeLow);
putStr(_bitFields.timeMid);
putStr(_bitFields.timeHiAndVersion);
putStr(_bitFields.clockSeqHiAndReserved);
putStr(_bitFields.clockSeqLow);
putStr(_bitFields.node);
putStr(_hexFields.timeLow);
putStr(_hexFields.timeMid);
putStr(_hexFields.timeHiAndVersion);
putStr(_hexFields.clockSeqHiAndReserved);
putStr(_hexFields.clockSeqLow);
putStr(_hexFields.node);

putNum(objV4.version);
putStr(objV4.bitString);
putStr(objV4.hexNoDelim);
putStr(objV4.hexString);
putStr(objV4.urn);
putStr(objV4.toString());
putBool(objV4.equals(objV1));

UUID.resetState();
UUID.useMathRandom();
