import { UUID } from "../dist/uuid.js";
import { UUIDTestCommon } from "./util/uuid-test-common.js";

QUnit.module("UUID.genV4() as object", function() {

  QUnit.test("basic object tests", function(assert) {
    var n = 16;

    for (var i = 0; i < n; i++) {
      var uuid = UUID.genV4();
      assert.equal(uuid.version, 4, "version number field");

      UUIDTestCommon.testObjectProperties(assert, uuid);
    }
  });

});

QUnit.module("UUID.genV4() as string", function() {

  UUIDTestCommon.testV4AsString(function() {
    return UUID.genV4().hexString;
  });

});
