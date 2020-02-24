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
  var cnt = environment.getNodes()
    .filter(n => n.isController === true)
    .length;

  t.is(cnt, 1);
});

test('non-controllers know the ip of the controller', t => {
  environment.getNodes()
    .filter(n => n.isController === false)
    .forEach(n => t.is(n.controllerInfo.controllerIp, '192.168.42.0'))
});