var UUIDTestCommon = {};

(function(QUnit, ns) {
  "use strict";

  function generateUUIDs(generator, n) {
    var uuids = [];
    for (var i = 0, len = n >>> 0; i < len; i++) {
      uuids[i] = generator();
    }
    return uuids;
  }

  ns.countEachBitsOne = function(uuids) {
    var counts = new Array(128);
    for (var i = 0; i < 128; i++) { counts[i] = 0; }

    for (var i = 0, len = uuids.length; i < len; i++) {
      // loop to count each bit's '1'
      for (var sp = 0, np = 0, slen = uuids[i].length; sp < slen; sp++) {
        if (uuids[i].charAt(sp) === "-") { continue; }
        var nibble = parseInt(uuids[i].charAt(sp), 16);
        if (nibble & 1) { counts[np * 4 + 3]++; }
        if (nibble & 2) { counts[np * 4 + 2]++; }
        if (nibble & 4) { counts[np * 4 + 1]++; }
        if (nibble & 8) { counts[np * 4 + 0]++; }
        np++;
      }
    }
    return counts;
  };

  ns.testV4AsString = function(generator) {

    QUnit.test("regexp format tests", function(assert) {
      assert.expect(1024);
      var reformat = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
      for (var i = 0; i < 1024; i++) {
        var uuid = generator();
        assert.ok(reformat.test(uuid), reformat.source + " =~ " + uuid);
      }
    });

    QUnit.test("collision tests", function(assert) {
      assert.expect(1);
      var n = 16384, nerrors = 0, table = {};
      for (var i = 0; i < n; i++) {
        var uuid = generator();
        if (table.hasOwnProperty(uuid)) {
          nerrors++;
        } else {
          table[uuid] = true;
        }
      }
      assert.equal(nerrors, 0, "no collision among " + n + " UUIDs");
    });

    var n = 4096, uuids = generateUUIDs(generator, n), counts = ns.countEachBitsOne(uuids);

    QUnit.test("reserved bit tests", function(assert) {
      assert.expect(6);
      assert.equal(counts[64], n, "bit 64: variant bit '1'");
      assert.equal(counts[65], 0, "bit 65: variant bit '0'");

      assert.equal(counts[48], 0, "bit 48: version bit '0'");
      assert.equal(counts[49], n, "bit 49: version bit '1'");
      assert.equal(counts[50], 0, "bit 50: version bit '0'");
      assert.equal(counts[51], 0, "bit 51: version bit '0'");
    });

    QUnit.test("mean +/- four-sigma tests for random bits (possible to fail in a certain low probability)", function(assert) {
      assert.expect(128);
      var mean = n * 0.5, sd = Math.sqrt(n * 0.5 * 0.5);  // binom dist
      var lbound = mean - 4 * sd, ubound = mean + 4 * sd;

      for (var i = 0; i < 128; i++) {
        var c = counts[i];
        switch (i) {
            case 64:
            case 49:
                assert.equal(c, n, "bit " + i + ": reserved bit '1'");
                break;
            case 65:
            case 48:
            case 50:
            case 51:
                assert.equal(c, 0, "bit " + i + ": reserved bit '0'");
                break;
            default:
                assert.ok(lbound < c && c < ubound, "bit " + i + ": random bit " + c + " (allowable range: " + lbound + "-" + ubound + ")");
                break;
        }
      }
    });
  };

  ns.testV1AsString = function(generator) {

    QUnit.test("regexp format tests", function(assert) {
      assert.expect(1024);
      var reformat = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f][13579bdf][0-9a-f]{10}$/;
      for (var i = 0; i < 1024; i++) {
        var uuid = generator();
        assert.ok(reformat.test(uuid), reformat.source + " =~ " + uuid);
      }
    });

    QUnit.test("collision tests", function(assert) {
      assert.expect(1);
      var n = 16384, nerrors = 0, table = {};
      for (var i = 0; i < n; i++) {
        var uuid = generator();
        if (table.hasOwnProperty(uuid)) {
          nerrors++;
        } else {
          table[uuid] = true;
        }
      }
      assert.equal(nerrors, 0, "no collision among " + n + " UUIDs");
    });

    QUnit.test("reserved bit tests", function(assert) {
      assert.expect(7);
      var n = 4096, uuids = generateUUIDs(generator, n), counts = ns.countEachBitsOne(uuids);

      assert.equal(counts[64], n, "bit 64: variant bit '1'");
      assert.equal(counts[65], 0, "bit 65: variant bit '0'");

      assert.equal(counts[48], 0, "bit 48: version bit '0'");
      assert.equal(counts[49], 0, "bit 49: version bit '0'");
      assert.equal(counts[50], 0, "bit 50: version bit '0'");
      assert.equal(counts[51], n, "bit 51: version bit '1'");

      assert.equal(counts[87], n, "bit 87: multicast bit '1'");
    });

    QUnit.test("timestamp tests", function(assert) {
      assert.expect(1024);
      var now = new Date() - Date.UTC(1582, 9, 15, 0, 0, 0, 0);
      for (var i = 0; i < 1024; i++) {
        var uuid = generator();
        var hex = uuid.substr(15, 3) + uuid.substr(9, 4) + uuid.substr(0, 8);
        var diff = Math.abs(now - parseInt(hex, 16) / 10000);
        assert.ok(diff < 60 * 1000, "current timestamp - UUID timestamp < 1 minute: " + diff);
      }
    });

  };

  ns.testObjectProperties = function(assert, uuid) {
    var sizes = [32, 16, 16, 8, 8, 48];
    var names = ["timeLow", "timeMid", "timeHiAndVersion", "clockSeqHiAndReserved", "clockSeqLow", "node"];
    var ubounds = new Array(6);
    for (var i = 0; i < 6; i++) { ubounds[i] = Math.pow(2, sizes[i]); }

    var patHex = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|0{8}-0{4}-0{4}-0{4}-0{12})$/;
    var patBit = /^(?:[01]{48}0(?:001|010|011|100|101)[01]{12}10[01]{62}|0{128})$/;
    var patHexND = /^(?:[0-9a-f]{12}[1-5][0-9a-f]{3}[89ab][0-9a-f]{15}|0{32})$/;

    assert.ok(uuid instanceof UUID, "object instanceof UUID");

    assert.ok((uuid.version === 1) || (uuid.version === 2) || (uuid.version === 3) || (uuid.version === 4) || (uuid.version === 5), "UUID#version in (1-5)");
    assert.ok(patHex.test(uuid.hexString), "UUID#hexString matches" + patHex);
    assert.ok(patBit.test(uuid.bitString), "UUID#bitString matches " + patBit);
    assert.ok(patHexND.test(uuid.hexNoDelim), "UUID#hexNoDelim matches " + patHexND);

    assert.strictEqual(uuid.hexString, String(uuid), "UUID#hexString === UUID#toString()");
    assert.strictEqual("urn:uuid:" + uuid.hexString, uuid.urn, "'urn:uuid:' + UUID#hexString === UUID#urn");

    assert.strictEqual(uuid.bitFields.join(""), uuid.bitString, "joined bitFields equals bitString");
    assert.strictEqual(uuid.hexFields.join(""), uuid.hexNoDelim, "joined hexFields equals hexNoDelim");
    assert.strictEqual(uuid.hexFields.slice(0, 4).join("-") + uuid.hexFields.slice(4).join("-"), uuid.hexString, "joined hexFields equals hexString");

    assert.equal(uuid.intFields.length, 6, "length of intFields list");
    assert.equal(uuid.bitFields.length, 6, "length of bitFields list");
    assert.equal(uuid.hexFields.length, 6, "length of hexFields list");
    for (var j = 0; j < 6; j++) {
      var nm = names[j];
      assert.strictEqual(uuid.intFields[j], uuid.intFields[nm], "intFields[" + j + "] === intFields." + nm);
      assert.strictEqual(uuid.bitFields[j], uuid.bitFields[nm], "bitFields[" + j + "] === bitFields." + nm);
      assert.strictEqual(uuid.hexFields[j], uuid.hexFields[nm], "hexFields[" + j + "] === hexFields." + nm);

      assert.ok(0 <= uuid.intFields[j] && uuid.intFields[j] < ubounds[j], "0 <= intFields." + nm + " < 2^" + sizes[j]);
      assert.equal(uuid.bitFields[j].length, sizes[j], "bitFields." + nm + ".length");
      assert.equal(uuid.hexFields[j].length, sizes[j] / 4, "hexFields." + nm + ".length");

      assert.strictEqual(parseInt(uuid.bitFields[j], 2), uuid.intFields[j], "parseInt(bitFields." + nm + ", 2) === intFields." + nm);
      assert.strictEqual(parseInt(uuid.hexFields[j], 16), uuid.intFields[j], "parseInt(hexFields." + nm + ", 16) === intFields." + nm);
    }

    assert.ok(uuid.equals(uuid), "UUID#equals(self)");
    assert.notOk(uuid.equals(UUID.genV4()), "!UUID#equals(UUID.genV4())");
    assert.ok(uuid.equals(UUID.parse(uuid.hexString)), "UUID#equals(UUID.parse(UUID#hexString))");
    assert.ok(uuid.equals(UUID.parse(uuid.urn)), "UUID#equals(UUID.parse(UUID#urn))");
    assert.ok(uuid.hexString === UUID.parse(uuid.hexString).hexString, "UUID#hexString === UUID.parse(UUID#hexString)#hexString");
    assert.ok(uuid.hexString === UUID.parse(uuid.urn).hexString, "UUID#hexString === UUID.parse(UUID#urn)#hexString");
  };

})(QUnit, UUIDTestCommon);

// vim: et ts=2 sw=2
