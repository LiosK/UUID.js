var UUIDTestCommon = {};

(function(ns) {
  var sizes = [32, 16, 16, 8, 8, 48];
  var names = ["timeLow", "timeMid", "timeHiAndVersion", "clockSeqHiAndReserved", "clockSeqLow", "node"];

  ns.testV4AsString = function(generator) {
    var n = 4096;
    var v4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    var uuids = new Array(n);
    var counts = new Array(128);
    for (var i = 0; i < 128; i++) { counts[i] = 0; }

    test("version4 format tests", n, function() {
      for (var i = 0; i < n; i++) {
        var uuid = uuids[i] = generator();
        ok(v4.test(uuid), "version4 format test: " + uuid);

        // loop to count each bit's '1'
        for (var sp = 0, np = 0, len = uuid.length; sp < len; sp++) {
          if (uuid.charAt(sp) === "-") { continue; }
          var nibble = parseInt(uuid.charAt(sp), 16);
          if (nibble & 1) { counts[np * 4 + 3]++; }
          if (nibble & 2) { counts[np * 4 + 2]++; }
          if (nibble & 4) { counts[np * 4 + 1]++; }
          if (nibble & 8) { counts[np * 4 + 0]++; }
          np++;
        }
      }
    });

    test("reserved bit tests", 6, function() {
      equal(counts[64], n, "bit 64: variant bit '1'");
      equal(counts[65], 0, "bit 65: variant bit '0'");

      equal(counts[48], 0, "bit 48: version bit '0'");
      equal(counts[49], n, "bit 49: version bit '1'");
      equal(counts[50], 0, "bit 50: version bit '0'");
      equal(counts[51], 0, "bit 51: version bit '0'");
    });

    test("collision test", 1, function() {
      var ncollisions = 0, table = {};
      for (var i = 0, len = uuids.length; i < len; i++) {
        if (table.hasOwnProperty(uuids[i])) {
          ncollisions++;
          table[uuids[i]]++;
        } else {
          table[uuids[i]] = 1;
        }
      }
      equal(ncollisions, 0, "count of collisions among " + n + " UUIDs");
    });

    test("mean +/- four-sigma tests for random bits (possible to fail in a certain low probability)", 128, function() {
      var mean = n * 0.5, sd = Math.sqrt(n * 0.5 * 0.5);  // binom dist
      var lbound = mean - 4 * sd, ubound = mean + 4 * sd;

      for (var i = 0; i < 128; i++) {
        var c = counts[i];
        switch (i) {
          case 64:
          case 49:
          equal(c, n, "bit " + i + ": reserved bit '1'");
          break;
          case 65:
          case 48:
          case 50:
          case 51:
          equal(c, 0, "bit " + i + ": reserved bit '0'");
          break;
          default:
          ok(lbound < c && c < ubound, "bit " + i + ": random bit " + c + " (allowable range: " + lbound + "-" + ubound + ")");
          break;
        }
      }
    });
  }

  ns.testObjectProperties = function(uuid) {
    ok(uuid instanceof UUID, "object instanceof UUID");

    equal(uuid.intFields.length, 6, "length of intFields list");
    equal(uuid.bitFields.length, 6, "length of bitFields list");
    equal(uuid.hexFields.length, 6, "length of hexFields list");
    for (var j = 0; j < 6; j++) {
      var nm = names[j];
      equal(uuid.intFields[j], uuid.intFields[nm], "intFields[" + j + "] == intFields[" + nm + "]");
      equal(uuid.bitFields[j], uuid.bitFields[nm], "bitFields[" + j + "] == bitFields[" + nm + "]");
      equal(uuid.hexFields[j], uuid.hexFields[nm], "hexFields[" + j + "] == hexFields[" + nm + "]");
    }
  }

})(UUIDTestCommon);
// vim: et ts=2 sw=2
