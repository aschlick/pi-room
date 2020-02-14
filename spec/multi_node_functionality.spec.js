import TestEnvironment from "./helpers/test_environment";
import test from 'ava';

test("first node up should be controller", t => {
  const environment = new TestEnvironment()

  environment.addNode()
  environment.addNode()
  environment.addNode()

  t.true(environment.nodes[0].isController)
})