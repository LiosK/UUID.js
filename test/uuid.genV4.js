QUnit.module("UUID.genV4() as object");

(function(QUnit) {
  "use strict";

  QUnit.test("basic object tests", function(assert) {
    var n = 16;

    for (var i = 0; i < n; i++) {
      var uuid = UUID.genV4();
      assert.equal(uuid.version, 4, "version number field");

      UUIDTestCommon.testObjectProperties(assert, uuid);
    }
  });

})(QUnit);

QUnit.module("UUID.genV4() as string");

UUIDTestCommon.testV4AsString(function() {
  return UUID.genV4().hexString;
});

// vim: et ts=2 sw=2
