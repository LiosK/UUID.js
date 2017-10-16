import * as UUID from 'uuidjs';

let strV4: string = UUID.generate();

let objV4: UUID.UUID = UUID.genV4();
let objV1: UUID.UUID = UUID.genV1();
let parsed: UUID.UUID = UUID.parse(strV4);

let _FIELD_NAMES: Array<string> = UUID.FIELD_NAMES;
let _FIELD_SIZES: Array<number> = UUID.FIELD_SIZES;
let _NIL: UUID.UUID = UUID.NIL;

let _intFields: UUID.UUIDFields<number> = objV4.intFields;
let _bitFields: UUID.UUIDFields<string> = objV4.bitFields;
let _hexFields: UUID.UUIDFields<string> = objV4.hexFields;

let num: number;
let str: string;
for (let i: number = 0; i < 6; i++) {
  num = _intFields[i];
  str = _bitFields[i];
  str = _hexFields[i];
}

num = _intFields.timeLow;
num = _intFields.timeMid;
num = _intFields.timeHiAndVersion;
num = _intFields.clockSeqHiAndReserved;
num = _intFields.clockSeqLow;
num = _intFields.node;
str = _bitFields.timeLow;
str = _bitFields.timeMid;
str = _bitFields.timeHiAndVersion;
str = _bitFields.clockSeqHiAndReserved;
str = _bitFields.clockSeqLow;
str = _bitFields.node;
str = _hexFields.timeLow;
str = _hexFields.timeMid;
str = _hexFields.timeHiAndVersion;
str = _hexFields.clockSeqHiAndReserved;
str = _hexFields.clockSeqLow;
str = _hexFields.node;

let _version: number = objV4.version;
let _bitString: string = objV4.bitString;
let _hexNoDelim: string = objV4.hexNoDelim;
let _hexString: string = objV4.hexString;
let _urn: string = objV4.urn;
let _toString: string = objV4.toString();
let _equals: boolean = objV4.equals(objV1);

UUID.resetState();
UUID.useMathRandom();
