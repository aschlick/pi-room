import Brain from "src/brain";
import test from 'ava';
import 'spec/helpers/stub_dependencies';

const runner = new Brain();

test('when no controller, it assigns itself', t => {
  runner.start();
  setTimeout(() => {
    t.true(runner.isController);
  }, 500);
});
