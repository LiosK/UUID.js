import { UUID } from "../src/uuid.js";
import { UUIDTestCommon } from "./util/uuid-test-common.js";

QUnit.module("UUID.useMathRandom()", function() {

  UUID.useMathRandom();

  UUIDTestCommon.testV4AsString(function() {
    return UUID.generate();
  });

});
