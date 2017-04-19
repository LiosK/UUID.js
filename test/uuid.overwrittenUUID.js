QUnit.module("UUID.overwrittenUUID");

(function(QUnit) {
  "use strict";

  QUnit.test("UUID.overwrittenUUID preserves initialOccupant", function(assert) {
    assert.expect(1);
    assert.ok(UUID.overwrittenUUID === initialOccupant, "UUID.overwrittenUUID === initialOccupant: " + initialOccupant);
  });

})(QUnit);

// vim: et ts=2 sw=2
