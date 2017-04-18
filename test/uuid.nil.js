QUnit.module("UUID.NIL");

QUnit.test("UUID.NIL holds the correct nil UUID object.", 2, function() {
  strictEqual(UUID.NIL.hexString, "00000000-0000-0000-0000-000000000000", 'UUID.NIL.hexString === "00000000-0000-0000-0000-000000000000"');
  ok(UUID.NIL.equals(UUID.parse("00000000-0000-0000-0000-000000000000")), 'UUID.NIL.equals(UUID.parse("00000000-0000-0000-0000-000000000000"))');
});

// vim: et ts=2 sw=2
