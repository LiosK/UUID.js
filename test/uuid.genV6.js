import { UUID } from "../dist/uuid.js";
import { UUIDTestCommon } from "./util/uuid-test-common.js";

QUnit.module("UUID.genV6() as object", function() {

  QUnit.test("basic object tests", function(assert) {
    var n = 16;

    for (var i = 0; i < n; i++) {
      var uuid = UUID.genV6();
      assert.equal(uuid.version, 6, "version number field");

      UUIDTestCommon.testObjectProperties(assert, uuid);
    }
  });

});


QUnit.module("UUID.genV6() as string", function() {

  var generator = function() {
    return UUID.genV6().hexString;
  };

  UUIDTestCommon.testV6AsString(generator);

  QUnit.test("clock sequence tests", function(assert) {
    assert.expect(1023);
    var prev = parseInt(generator().substr(19, 4), 16) & 0x3FFF;
    for (var i = 1; i < 1024; i++) {
      var curr = parseInt(generator().substr(19, 4), 16) & 0x3FFF;
      var result = curr === prev;
      if (curr === ((prev + 1) & 0x3FFF)) {
        result = true;
      }
      assert.ok(result, "proper clock sequence step: " + prev.toString(16) + " -> " + curr.toString(16));
      prev = curr;
    }
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


QUnit.module("UUID.genV6() and UUID.resetState()", function() {

  var generator = function() {
    UUID.resetState();
    return UUID.genV6().hexString;
  };

  UUIDTestCommon.testV6AsString(generator);

  QUnit.test("random bit neutrality tests (often fail by design)", function(assert) {
    assert.expect(76);
    var n = 4096, uuids = [];
    for (var i = 0; i < n; i++) { uuids[i] = generator(); }
    var counts = UUIDTestCommon.countEachBitsOne(uuids);
    // binom dist middle 99.99% range
    var margin = 3.890592 * Math.sqrt(0.5 * 0.5 / n);
    var ubound = 0.5 + margin, lbound = 0.5 - margin;

    for (var i = 52; i < 128; i++) {
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
