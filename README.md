# UUID.js - RFC-compliant UUID Generator for JavaScript

[![npm](https://img.shields.io/npm/v/uuidjs)](https://www.npmjs.com/package/uuidjs)
[![License](https://img.shields.io/npm/l/uuidjs)](https://github.com/LiosK/UUID.js/blob/master/LICENSE.txt)

## Synopsis

```html
<!-- HTML5 -->
<script src="src/uuid.js"></script>
<script> var uuid = UUID.generate(); </script>
```

```javascript
// Node.js
let UUID = require("uuidjs");
let uuid = UUID.generate();
```

```typescript
// TypeScript
import UUID from "uuidjs";
let str: string = UUID.generate();
let obj: UUID = UUID.genV4();
```

```bash
# Command-line
npx uuidjs
```

## Description

UUID.js is a JavaScript/ECMAScript library to generate RFC 4122 compliant
Universally Unique IDentifiers (UUIDs). This library supports both version 4
UUIDs (UUIDs from random numbers) and version 1 UUIDs (time-based UUIDs), and
provides an object-oriented interface to print a generated or parsed UUID in a
variety of forms.

## Features

- Generates version 4 UUIDs (UUIDs from random numbers) and version 1 UUIDs
  (time-based UUIDs)
- Provides an object-oriented interface to print various string representations
  of a generated or parsed UUID
- Utilizes a cryptographically secure pseudo-random number generator if
  available, whereas falling back to `Math.random()` otherwise
- Appends extra random bits to compensate for the lower timestamp resolution of
  JavaScript than that required for version 1 UUIDs
- Comes with a lot of test cases including format checks and statistical tests
  to maintain a high-quality code base
- Supports old browsers as well as modern browser and server environments, as
  kept compatible with ECMAScript 3rd edition

## Install

Download `src/uuid.js` or call `npm install uuidjs`.

Then, load `src/uuid.js`.

```html
<script src="src/uuid.js"></script>
```

Or, import `uuidjs`.

```javascript
const UUID = require("uuidjs");
```

## Usage Examples

`UUID.generate()` returns a version 4 UUID as a hexadecimal string.

```javascript
// Create a version 4 UUID as a hexadecimal string
console.log(UUID.generate());   // fa84cf42-ffdf-4975-b42b-31ab5fb983eb
```

`UUID.genV4()`, `UUID.genV1()`, and `UUID.parse()` return a UUID object that has
various fields and methods.

```javascript
// Create a version 4 (random number-based) UUID object
var objV4 = UUID.genV4();

// Create a version 1 (time-based) UUID object
var objV1 = UUID.genV1();

// Create a UUID object from a hexadecimal string
var uuid = UUID.parse("a0e0f130-8c21-11df-92d9-95795a3bcd40");

// Get string representations of a UUID object
console.log(uuid.toString());   // "a0e0f130-8c21-11df-92d9-95795a3bcd40"
console.log(uuid.hexString);    // "a0e0f130-8c21-11df-92d9-95795a3bcd40"
console.log(uuid.hexNoDelim);   // "a0e0f1308c2111df92d995795a3bcd40"
console.log(uuid.bitString);    // "101000001110000 ... 1100110101000000"
console.log(uuid.urn);          // "urn:uuid:a0e0f130-8c21-11df-92d9-95795a3bcd40"

// Compare UUID objects
console.log(objV4.equals(objV1));   // false

// Get UUID version numbers
console.log(objV4.version); // 4
console.log(objV1.version); // 1

// Get internal field values in 3 different forms via 2 different accessors
console.log(uuid.intFields.timeLow);                // 2699096368
console.log(uuid.bitFields.timeMid);                // "1000110000100001"
console.log(uuid.hexFields.timeHiAndVersion);       // "11df"
console.log(uuid.intFields.clockSeqHiAndReserved);  // 146
console.log(uuid.bitFields.clockSeqLow);            // "11011001"
console.log(uuid.hexFields.node);                   // "95795a3bcd40"

console.log(uuid.intFields[0]);                     // 2699096368
console.log(uuid.bitFields[1]);                     // "1000110000100001"
console.log(uuid.hexFields[2]);                     // "11df"
console.log(uuid.intFields[3]);                     // 146
console.log(uuid.bitFields[4]);                     // "11011001"
console.log(uuid.hexFields[5]);                     // "95795a3bcd40"
```

UUID.js supports the so-called noConflict mode to work around namespace
conflicts.

```javascript
// Avoid namespace conflicts with other libraries
var arbitraryVarName = UUID;
UUID = UUID.overwrittenUUID;                // Restore the original value
console.log(arbitraryVarName.generate());   // "cb9a0283-a44c-4e7a-a5b0-9cd2876e952b"
```

## License

Copyright (c) 2010-2022 LiosK

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

## Author

LiosK <contact@mail.liosk.net>

## See Also

- [RFC 4122](https://www.ietf.org/rfc/rfc4122.txt)
- [GitHub Repository](https://github.com/LiosK/UUID.js)
- [npm Package](https://www.npmjs.com/package/uuidjs)
- [API Documentation](https://liosk.github.io/UUID.js/docs/)
- [Run test cases on your browser](https://liosk.github.io/UUID.js/test/browser.html)
