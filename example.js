const UUID = require("uuidjs")

// Generate UUID string
console.log(UUID.generate())

// Create UUID objects and get string representations
console.log(UUID.genV4().toString())
console.log(UUID.genV1().hexNoDelim)
console.log(UUID.parse("84d9ca79-4d66-4373-91a0-a12d673e71be").urn)

// Get UUID internal field values
console.log(UUID.genV4().hexFields.node)
console.log(UUID.genV1().intFields.timeLow)
console.log(UUID.genV4().bitFields[2])

UUID.genV1()
