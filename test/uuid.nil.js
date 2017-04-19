QUnit.module("UUID.NIL");

(function(QUnit) {
  "use strict";

  QUnit.test("UUID.NIL holds the correct nil UUID object.", function(assert) {
    assert.expect(2);
    assert.strictEqual(UUID.NIL.hexString, "00000000-0000-0000-0000-000000000000", 'UUID.NIL.hexString === "00000000-0000-0000-0000-000000000000"');
    assert.ok(UUID.NIL.equals(UUID.parse("00000000-0000-0000-0000-000000000000")), 'UUID.NIL.equals(UUID.parse("00000000-0000-0000-0000-000000000000"))');
  });

})(QUnit);

// vim: et ts=2 sw=2
