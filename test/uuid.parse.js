QUnit.module("UUID.parse()");

(function(QUnit) {
  "use strict";

  QUnit.test("pass tests", function(assert) {
    assert.expect(15);
    var passes = [
      { value: "7bfca344-bc10-11e5-af40-080027483c41" },
      { value: "8bfaf007-0545-4795-a10a-487b0f00d93f" },
      { value: "00000000-0000-0000-0000-000000000000" }
    ];

    for (var i = 0, len = passes.length; i < len; i++) {
      var value = passes[i].canonical = passes[i].value;
      passes.push(
        { canonical: value, value: value.toUpperCase() },
        { canonical: value, value: "urn:uuid:" + value },
        { canonical: value, value: "{" + value + "}" },
        { canonical: value, value: "\t  " + value + "\n" }
      );
    }

    for (var i = 0, len = passes.length; i < len; i++) {
      var uuid = UUID.parse(passes[i].value);
      assert.equal(uuid.hexString, passes[i].canonical, "UUID.parse(\"" + passes[i].value + "\") -> " + uuid.hexString);
    }
  });

  QUnit.test("fail tests", function(assert) {
    assert.expect(8);
    var fails = [
      "06536892-0g22-499d-8aaf-b0dd9cfa69a4",
      "864eh78f-0571-46jf-a1w4-538v0fdoacff",
      "45f63383 ef0e 0d9d b1ba 834a9726829e",
      "f523ccad6600490e9befa66f64f50f82",
      "leading c86e2e5f-1962-42c9-85d6-cb127040b107",
      "97f43427-788b-47bb-b2e8-cc7d79432a75 trailing",
      "910e7851-4521-45c4-866b-fc5464",
      "44b1796d-9d0b-4aac-81cd-ef8ed2b90e18b6fe54"
    ];

    for (var i = 0, len = fails.length; i < len; i++) {
      assert.equal(UUID.parse(fails[i]), null, "UUID.parse failed: " + fails[i]);
    }
  });

})(QUnit);

// vim: et ts=2 sw=2
