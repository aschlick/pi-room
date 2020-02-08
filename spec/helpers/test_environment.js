import sinon from 'sinon';
import dgram from 'dgram';
import noble from '@abandonware/noble';
import Brain from '../../src/brain';


class TestEnvironment {
  dgramStub = sinon.stub(dgram);
  nobleStub = sinon.stub(noble);
  
  broadcastEvents = [];
  nodes = [];

  addNode(){
    let node = new Brain();
    this.nodes.push(node);
  }
}

export default TestEnvironment;