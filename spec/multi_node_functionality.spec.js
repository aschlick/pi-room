import TestEnvironment from "./helpers/test_environment";
import timeout from './helpers/timeout';
import test from 'ava';

const environment = new TestEnvironment();

test.before.cb(t => {
  environment.addNode();
  environment.addNode();
  environment.addNode();

  timeout(1000).then(t.end);
});

test("first node up should be controller", t => {
  t.true(environment.nodes[0].isController);
});

test('only one node is a controller', t => {
  var cnt = Object.values(environment.nodes)
    .filter(n => n.isController === true)
    .length;

  t.is(cnt, 1);
});