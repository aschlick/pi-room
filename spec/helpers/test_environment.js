import sinon from 'sinon';
import dgram from 'dgram';
import Brain from '../../src/brain';

var dgramStub = sinon.stub(dgram);
var nobleStub = {
  startScanning: sinon.spy(),
  on: sinon.spy(),

};

class TestEnvironment {
  broadcasts = [];
  nodes = [];

  constructor() {
    var self = this;
    dgramStub.createSocket.returns({
      send: (msg) => {
        self.broadcasts.forEach(b => b(msg))
      },
      on: (type, fn) => self.broadcasts.push(fn),
      bind: sinon.spy()
    })
  }

  addNode(){
    let node = new Brain(nobleStub);
    this.nodes.push(node);
  }

  mimicBroadcast() {

  }
}

export default TestEnvironment;