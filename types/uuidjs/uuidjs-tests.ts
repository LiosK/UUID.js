import * as UUID from 'uuidjs';

const putNum = (x: number) => { console.log(x + ': number') };
const putStr = (x: string) => { console.log('"' + x + '": string') };
const putBool = (x: boolean) => { console.log(x + ': boolean') };

putStr(UUID.generate());
let objV4: UUID.UUID = UUID.genV4();
let objV1: UUID.UUID = UUID.genV1();
let parsed: UUID.UUID = UUID.parse(objV4.toString());

let _FIELD_NAMES: Array<string> = UUID.FIELD_NAMES;
let _FIELD_SIZES: Array<number> = UUID.FIELD_SIZES;
let _NIL: UUID.UUID = UUID.NIL;

let _intFields: UUID.UUIDFields<number> = objV4.intFields;
let _bitFields: UUID.UUIDFields<string> = objV4.bitFields;
let _hexFields: UUID.UUIDFields<string> = objV4.hexFields;

for (let i: number = 0; i < 6; i++) {
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
