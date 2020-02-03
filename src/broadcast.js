import dgram from 'dgram';

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

export default Broadcast