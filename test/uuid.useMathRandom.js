QUnit.module("UUID.useMathRandom()", function() {
  "use strict";

  UUID.useMathRandom();

  UUIDTestCommon.testV4AsString(function() {
    return UUID.generate();
  });

});
