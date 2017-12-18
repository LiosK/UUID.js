QUnit.module("UUID.overwrittenUUID", function() {
  "use strict";

  QUnit.test("UUID.overwrittenUUID preserves preceding UUID variable", function(assert) {
    assert.expect(1);
    assert.strictEqual(UUID.overwrittenUUID, precedingUUID, "UUID.overwrittenUUID === precedingUUID: " + precedingUUID);
  });

});
