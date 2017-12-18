QUnit.module("UUID.generate()", function() {
  "use strict";

  UUIDTestCommon.testV4AsString(function() {
    return UUID.generate();
  });

});
