import { UUID } from "uuidjs";

// Generate UUID string
console.log(UUID.generate());

// Create UUID objects and get string representations
console.log(UUID.genV1().toString());
console.log(UUID.genV6().hexString);
console.log(UUID.genV4().hexNoDelim);
console.log(UUID.parse("84d9ca79-4d66-4373-91a0-a12d673e71be").urn);

UUID.genV6();
