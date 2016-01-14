QUnit.module("UUID.genV1() as object");

(function() {
  "use strict";

  QUnit.test("basic object tests", function() {
    var n = 16;

    for (var i = 0; i < n; i++) {
      var uuid = UUID.genV1();
      equal(uuid.version, 1, "version number field");

      UUIDTestCommon.testObjectProperties(uuid);
    }
  });

})();

// vim: et ts=2 sw=2
