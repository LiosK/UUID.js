# NAME

UUID.js - The RFC-compliant UUID generator for JavaScript.

# SYNOPSYS

```javascript
var uuid = UUID.generate();
```

# DESCRIPTION

UUID.js library generates an RFC 4122 compliant Universally Unique IDentifier (UUID).

# FEATURES

* Supports Version 4 UUIDs (UUIDs from random numbers) and version 1 UUIDs (time-based UUIDs).
* Provides an object-oriented interface, allowing users to output a UUID in several formats, compare UUIDs, and access the internal fields of a UUID.
* Adds random digits to compensate for the low (millisecond) timestamp resolution of JavaScript when generating Version 1 UUIDs, which requires 100-nanosecond resolution.
* Properly handles 32-bit `Math.random()` implementation of WebKit-based browsers when generating a large random integer.
* Tested by many test cases including format checks and statistical variance tests.

# USAGE EXAMPLES

Load `src/uuid.js` to get full functionality. If you only need `UUID.generate()` method, load `dist/uuid.core.js`.

```javascript
// the simplest way to get an UUID (as a hexadecimal string)
document.writeln(UUID.generate());  // "0db9a5fa-f532-4736-89d6-8819c7f3ac7b"


// create a version 4 (random-numbers-based) UUID object
var objV4 = UUID.genV4();

// create a version 1 (time-based) UUID object
var objV1 = UUID.genV1();

// create an UUID object from a hexadecimal string
var uuid = UUID.parse("a0e0f130-8c21-11df-92d9-95795a3bcd40");


// UUID object as a string
document.writeln(uuid.toString());  // "a0e0f130-8c21-11df-92d9-95795a3bcd40"
document.writeln(uuid.hexString);   // "a0e0f130-8c21-11df-92d9-95795a3bcd40"
document.writeln(uuid.bitString);   // "101000001110000 ... 1100110101000000"
document.writeln(uuid.urn);         // "urn:uuid:a0e0f130-8c21-11df-92d9-95795a3bcd40"
document.writeln(uuid.hexNoDelim);  // "a0e0f1308c2111df92d995795a3bcd40"

// compare UUID objects
document.writeln(objV4.equals(objV1));  // false

// show version numbers
document.writeln(objV4.version);  // 4
document.writeln(objV1.version);  // 1

// get UUID field values in 3 different formats by 2 different accessors
document.writeln(uuid.intFields.timeLow);               // 2699096368
document.writeln(uuid.bitFields.timeMid);               // "1000110000100001"
document.writeln(uuid.hexFields.timeHiAndVersion);      // "11df"
document.writeln(uuid.intFields.clockSeqHiAndReserved); // 146
document.writeln(uuid.bitFields.clockSeqLow);           // "11011001"
document.writeln(uuid.hexFields.node);                  // "95795a3bcd40"

document.writeln(uuid.intFields[0]);                    // 2699096368
document.writeln(uuid.bitFields[1]);                    // "1000110000100001"
document.writeln(uuid.hexFields[2]);                    // "11df"
document.writeln(uuid.intFields[3]);                    // 146
document.writeln(uuid.bitFields[4]);                    // "11011001"
document.writeln(uuid.hexFields[5]);                    // "95795a3bcd40"


// avoid conflicts with other libraries (noConflict mode)
var arbitraryVarName = UUID;
UUID = UUID.overwrittenUUID;  // restore original value
```

# LICENSE

This library is licensed under the MIT license.

    Copyright (c) 2010-2016 LiosK.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

# AUTHOR

LiosK <contact@mail.liosk.net>

# SEE ALSO

* [RFC 4122](http://www.ietf.org/rfc/rfc4122.txt)
* [API Document](http://liosk.github.io/UUID.js/doc/symbols/UUID.html)
* [Test cases: uuid.js](http://liosk.github.io/UUID.js/test/test.uuid.js.html)
* [Test cases: uuid.core.js](http://liosk.github.io/UUID.js/test/test.uuid.core.js.html)
