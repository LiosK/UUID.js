# UUID.js - RFC-compliant UUID Generator for JavaScript

[![npm](https://img.shields.io/npm/v/uuidjs)](https://www.npmjs.com/package/uuidjs)
[![License](https://img.shields.io/npm/l/uuidjs)](https://github.com/LiosK/UUID.js/blob/master/LICENSE.txt)

## Synopsis

```html
<!-- HTML5 -->
<script type="module">
  import { UUID } from "https://unpkg.com/uuidjs@^5";
  const uuid = UUID.generate();
</script>
```

```javascript
// Node.js
import { UUID } from "uuidjs";
const uuid = UUID.generate();
```

```typescript
// TypeScript
import { UUID } from "uuidjs";
const str: string = UUID.generate();
const obj: UUID = UUID.genV4();
```

```bash
# Command-line
npx uuidjs
```

## Description

UUID.js is a JavaScript/ECMAScript library to generate RFC 9562 compliant
Universally Unique IDentifiers (UUIDs). This library supports UUIDv4 (random
number-based UUIDs), UUIDv1 (Gregorian time-based UUIDs), and UUIDv6 (Reordered
Gregorian time-based UUIDs). It also provides an object-oriented interface to
print a generated or parsed UUID in a variety of forms.

## Features

- Generates UUIDv4 (random number-based UUIDs), UUIDv1 (Gregorian time-based
  UUIDs), and UUIDv6 (Reordered Gregorian time-based UUIDs)
- Provides an object-oriented interface to print various string representations
  of a generated or parsed UUID
- Utilizes a cryptographically secure pseudo-random number generator if
  available, whereas falling back to `Math.random()` otherwise
- Appends extra random bits to compensate for the lower timestamp resolution of
  JavaScript than that required for UUIDv1 and UUIDv6
- Comes with a lot of test cases including format checks and statistical tests
  to maintain a high-quality code base

## Usage Examples

Import `UUID` class:

```javascript
import { UUID } from "uuidjs";
// or on browsers:
// import { UUID } from "https://unpkg.com/uuidjs@^5";
```

`UUID.generate()` returns a UUIDv4 as a hexadecimal string.

```javascript
// Create a UUIDv4 as a hexadecimal string
console.log(UUID.generate());   // fa84cf42-ffdf-4975-b42b-31ab5fb983eb
```

`UUID.genV4()`, `UUID.genV1()`, `UUID.genV6()`, and `UUID.parse()` return a UUID
object that has various fields and methods.

```javascript
// Create a UUIDv4 (random number-based UUID) object
const objV4 = UUID.genV4();

// Create a UUIDv1 (Gregorian time-based UUID) object
const objV1 = UUID.genV1();

// Create a UUIDv6 (Reordered Gregorian time-based UUID) object
const objV6 = UUID.genV6();

// Create a UUID object from a hexadecimal string
const uuid = UUID.parse("a0e0f130-8c21-11df-92d9-95795a3bcd40");

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
console.log(objV6.version); // 6
```

## License

Copyright (c) 2010-2024 LiosK

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

- [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562)
- [GitHub Repository](https://github.com/LiosK/UUID.js)
- [npm Package](https://www.npmjs.com/package/uuidjs)
- [API Documentation](https://liosk.github.io/UUID.js/docs/)
- [Run test cases on your browser](https://liosk.github.io/UUID.js/test/)
