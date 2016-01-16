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

QUnit.module("UUID.genV1() as string");

(function() {
  "use strict";

  var generator = function() {
    return UUID.genV1().hexString;
  };

  UUIDTestCommon.testV1AsString(generator);

  QUnit.test("clock sequence tests", 1024, function() {
    var nincrements = 0;
    var prev = parseInt(generator().substr(19, 4), 16) & 0x3FFF;
    for (var i = 1; i < 1024; i++) {
      var curr = parseInt(generator().substr(19, 4), 16) & 0x3FFF;
      var result = curr === prev;
      if (curr === ((prev + 1) & 0x3FFF)) {
        result = true;
        nincrements++;
      }
      ok(result, "proper clock sequence step: " + prev.toString(16) + " -> " + curr.toString(16));
      prev = curr;
    }
    notEqual(nincrements, 0, "clock sequences changed (possible to fail)");
  });

  QUnit.test("node identifier consistency tests", 48, function() {
    var n = 4096, uuids = [];
    for (var i = 0; i < n; i++) { uuids[i] = generator(); }
    var counts = UUIDTestCommon.countEachBitsOne(uuids);

    for (var i = 80; i < 128; i++) {
      var c = counts[i];
      if (i === 87) {
        equal(c, n, "bit " + i + ": reserved bit '1'");
      } else {
        ok(c === 0 || c === n, "bit " + i + ": constant bit " + c + " (allowable value: " + 0 + " or " + n + ")");
      }
    }
  });

})();

QUnit.module("UUID.genV1() and UUID.resetState()");

(function() {
  "use strict";

  var generator = function() {
    UUID.resetState();
    return UUID.genV1().hexString;
  };

  UUIDTestCommon.testV1AsString(generator);

  QUnit.test("mean +/- four-sigma tests for random bits (possible to fail in a certain low probability)", 64, function() {
    var n = 4096, uuids = [];
    for (var i = 0; i < n; i++) { uuids[i] = generator(); }
    var counts = UUIDTestCommon.countEachBitsOne(uuids);
    var mean = n * 0.5, sd = Math.sqrt(n * 0.5 * 0.5);  // binom dist
    var lbound = mean - 4 * sd, ubound = mean + 4 * sd;

    for (var i = 64; i < 128; i++) {
      var c = counts[i];
      switch (i) {
          case 64:
          case 87:
              equal(c, n, "bit " + i + ": reserved bit '1'");
              break;
          case 65:
              equal(c, 0, "bit " + i + ": reserved bit '0'");
              break;
          default:
              ok(lbound < c && c < ubound, "bit " + i + ": random bit " + c + " (allowable range: " + lbound + "-" + ubound + ")");
              break;
      }
    }
  });

})();

// vim: et ts=2 sw=2
