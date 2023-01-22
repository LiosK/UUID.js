import { UUID } from "../dist/uuid.js";
import { UUIDTestCommon } from "./util/uuid-test-common.js";

QUnit.module("UUID.generate()", function() {

  UUIDTestCommon.testV4AsString(function() {
    return UUID.generate();
  });

});
