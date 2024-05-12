# Changelog

## v5.1.0 - 2024-05-12

- Marked `UUID.genV6()` as stable
- Updated documents with RFC 9562 verbiage
- Updated dev dependencies

## v5.0.1 - 2023-03-30

### Added

- CHANGELOG.md to NPM package

### Maintenance

- Updated TypeScript to 5.0
- Refined doc comment style

## v5.0.0 - 2023-01-28

### Breaking changes

- Migrated to native ES Modules from global variable and CommonJS export
  - Added named `UUID` export and removed default export
  - Removed `UUID.overwrittenUUID` property (a.k.a. no conflict mode)
- Removed `node:crypto` module-based CSPRNG implementation
  - Now requires Web Crypto API to utilize cryptographically secure pseudorandom
    number generators
- Changed target ECMAScript version from ES3 to ES2016
- Removed uuid.core.js and bower.json from repository
- Fixed wrong return type declaration of `UUID.parse()`: `UUID` -> `UUID | null`
- Placed tighter type constraints on `UUID` class members
  - Marked constructor() as private
  - Marked `UUID.FIELD_NAMES`, `UUID.FIELD_SIZES`, `UUID#intFields`,
    `UUID#bitFields`, and `UUID#hexFields` as read-only arrays/objects

### Dev environment changes

- Migrated to TypeScript and transpilation from pure JavaScript
  - Replaced manually written type declaration with auto-generated .d.ts
- Adopted class declaration syntax
- Applied Prettier style to source code
- Migrated to TypeDoc from JSDoc for API document generation
- Updated dev dependencies

### Migration notes

Import the `UUID` class using the ESM syntax:

```diff
<!-- HTML5 -->
-<script src="https://unpkg.com/uuidjs@^4"></script>
-<script>
+<script type="module">
+  import { UUID } from "https://unpkg.com/uuidjs@^5";
   const uuid = UUID.generate();
 </script>
```

```diff
// Node.js
-const UUID = require("uuidjs");
+import { UUID } from "uuidjs";
const uuid = UUID.generate();
```

Call static methods through the `UUID` class, rather than importing them
directly:

```diff
// Node.js
-const { generate } = require("uuidjs");
-const uuid = generate();
+import { UUID } from "uuidjs";
+const uuid = UUID.generate();
```

Run type checking relating to the following items, as these items have different
type declarations than those in v4:

- `UUID.parse()`
- `UUID.FIELD_NAMES`
- `UUID.FIELD_SIZES`
- `new UUID()`
- `UUID#intFields`
- `UUID#bitFields`
- `UUID#hexFields`

## v4.2.14

Last version that:

- Retains ECMAScript 3 compatibility
- Supports Internet Explorer 6
- Registers `UUID` in global scope
- Exports CommonJS entry point
- Accompanies uuid.core.js variant
- Ships with bower.json
- Uses `node:crypto`-based cryptographically secure pseudorandom number
  generator on Node.js
