QUnit.module("UUID.genV1() as object", function() {
  "use strict";

  QUnit.test("basic object tests", function(assert) {
    var n = 16;

    for (var i = 0; i < n; i++) {
      var uuid = UUID.genV1();
      assert.equal(uuid.version, 1, "version number field");

      UUIDTestCommon.testObjectProperties(assert, uuid);
    }
  });

});


QUnit.module("UUID.genV1() as string", function() {
  "use strict";

  var generator = function() {
    return UUID.genV1().hexString;
  };

  UUIDTestCommon.testV1AsString(generator);

  QUnit.test("clock sequence tests", function(assert) {
    assert.expect(1024);
    var nincrements = 0;
    var prev = parseInt(generator().substr(19, 4), 16) & 0x3FFF;
    for (var i = 1; i < 1024; i++) {
      var curr = parseInt(generator().substr(19, 4), 16) & 0x3FFF;
      var result = curr === prev;
      if (curr === ((prev + 1) & 0x3FFF)) {
        result = true;
        nincrements++;
      }
      assert.ok(result, "proper clock sequence step: " + prev.toString(16) + " -> " + curr.toString(16));
      prev = curr;
    }
    assert.notEqual(nincrements, 0, "clock sequences changed (possible to fail)");
  });

  QUnit.test("node identifier consistency tests", function(assert) {
    assert.expect(48);
    var n = 4096, uuids = [];
    for (var i = 0; i < n; i++) { uuids[i] = generator(); }
    var counts = UUIDTestCommon.countEachBitsOne(uuids);

    for (var i = 80; i < 128; i++) {
      var c = counts[i];
      if (i === 87) {
        assert.equal(c, n, "bit " + i + ": reserved bit '1'");
      } else {
        assert.ok(c === 0 || c === n, "bit " + i + ": constant bit " + c + " (allowable value: " + 0 + " or " + n + ")");
      }
    }
  });

});


QUnit.module("UUID.genV1() and UUID.resetState()", function() {
  "use strict";

  var generator = function() {
    UUID.resetState();
    return UUID.genV1().hexString;
  };

  UUIDTestCommon.testV1AsString(generator);

  QUnit.test("random bit neutrality tests (often fail by design)", function(assert) {
    assert.expect(64);
    var n = 4096, uuids = [];
    for (var i = 0; i < n; i++) { uuids[i] = generator(); }
    var counts = UUIDTestCommon.countEachBitsOne(uuids);
    // binom dist middle 99.99% range
    var margin = 3.890592 * Math.sqrt(0.5 * 0.5 / n);
    var ubound = 0.5 + margin, lbound = 0.5 - margin;

    for (var i = 64; i < 128; i++) {
      var c = counts[i] / n;
      switch (i) {
          case 64:
          case 87:
              assert.equal(c, 1, "bit " + i + ": reserved bit '1'");
              break;
          case 65:
              assert.equal(c, 0, "bit " + i + ": reserved bit '0'");
              break;
          default:
              assert.ok(lbound < c && c < ubound, "bit " + i + ": random bit " + c + " (cutoff range: " + lbound + "-" + ubound + ")");
              break;
      }
    }
  });

});
