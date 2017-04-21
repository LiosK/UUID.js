var UUID = require("uuidjs");

var fs = require("fs");
eval("" + fs.readFileSync("test/uuid.test.common.js"));
eval("" + fs.readFileSync("test/uuid.generate.js"));
eval("" + fs.readFileSync("test/uuid.genV4.js"));
eval("" + fs.readFileSync("test/uuid.genV1.js"));
eval("" + fs.readFileSync("test/uuid.parse.js"));
eval("" + fs.readFileSync("test/uuid.nil.js"));
eval("" + fs.readFileSync("test/uuid.useMathRandom.js"));

// vim: et ts=2 sw=2
