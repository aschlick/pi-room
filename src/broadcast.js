import dgram from 'dgram';

class Message {
  constructor(type, payload) {
    if(!Message.types.values.contains(type)){
      throw new Error('Message must be of predefined type');
    }

    this.type = type;
    this.payload = payload;
  }
}

Message.types = {
  ProximityData: "ProximityData",
  ControllerData: "ControllerData"
}

class Broadcast {
  constructor(port = 90376) {
    this.server = dgram.createSocket('udp4');
    this.server.bind(port)
  }

  send(payload){
    let str = JSON.stringify(payload);

    this.server.send(str);
  }

  setReciever(fn) {
    this.server.on('message', (msg, rinfo) => {
      let obj = JSON.parse(msg);
      fn(obj);
    })
  }
}

export default Broadcast;
export { Message };