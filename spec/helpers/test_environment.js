import sinon from 'sinon';
import dgram from 'dgram';
import Brain from '../../src/brain';

var dgramStub = sinon.stub(dgram);
var nobleStub = {
  startScanning: sinon.spy(),
  on: sinon.spy()
};

class TestEnvironment {
  count = 0;
  broadcasts = {};
  nodes = {};

  addNode(){
    var self = this;
    var cast = {
      id: this.count,
      send: function(msg) {
        console.info(`Node ${this.id} sent ${msg}`);
        Object.keys(self.broadcasts)
          .filter(k => k != this.id)
          .forEach(k => {
            console.info(`sending ${msg} to ${k}`);
            self.broadcasts[k](msg);
          })
      },
      on: function(type, fn){
        self.broadcasts[this.id] = fn;
      },
      bind: sinon.spy()
    }

    dgramStub.createSocket.returns(cast);
    let node = new Brain(nobleStub, `192.168.42.${this.count}`);
    this.nodes[this.count] = node;
    console.info(`Added node ${this.count}`);
    this.count = this.count + 1;
  }

  mimicBroadcast() {

  }

  getNodes() {
    return Object.values(this.nodes);
  }
}

export default TestEnvironment;