QUnit.module("UUID.makeBackwardCompatible()");

(function(QUnit) {
  "use strict";

  var n = 4;
  var v4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  var v1 = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f][13579bdf][0-9a-f]{10}$/;

  QUnit.test("before UUID.makeBackwardCompatible()", function(assert) {
    assert.expect(n * 3);
    for (var i = 0; i < n; i++) {
      var x = UUID.generate();
      var y = UUID.generate({ version: 1 });
      var z = UUID.generate({ version: "1" });
      assert.ok(v4.test(x) && (UUID.parse(x).version === 4), "UUID.generate() returns UUIDv4: " + x);
      assert.ok(v4.test(y) && (UUID.parse(y).version === 4), "UUID.generate({ version: 1 }) returns UUIDv4: " + y);
      assert.ok(v4.test(z) && (UUID.parse(z).version === 4), "UUID.generate({ version: \"1\" }) returns UUIDv4: " + z);
    }
  });

  QUnit.test("after UUID.makeBackwardCompatible()", function(assert) {
    assert.expect(n * 3);
    UUID.makeBackwardCompatible();
    for (var i = 0; i < n; i++) {
      var x = UUID.generate();
      var y = UUID.generate({ version: 1 });
      var z = UUID.generate({ version: "1" });
      assert.ok(v4.test(x) && (UUID.parse(x).version === 4), "UUID.generate() returns UUIDv4: " + x);
      assert.ok(v1.test(y) && (UUID.parse(y).version === 1), "UUID.generate({ version: 1 }) returns UUIDv1: " + y);
      assert.ok(v1.test(z) && (UUID.parse(z).version === 1), "UUID.generate({ version: \"1\" }) returns UUIDv1: " + z);
    }
  });

})(QUnit);

// vim: et ts=2 sw=2
