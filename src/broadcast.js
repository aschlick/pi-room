import dgram from 'dgram';

class Message {
    constructor(type, payload) {
        if(!Object.values(Message.types).includes(type)){
            throw new Error(`Message must be of predefined type. Recieved ${type}`);
        }

        this.type = type;
        this.payload = payload;
    }
}

Message.fromPayload = function(payload) {
    var obj = JSON.parse(payload);
    return new Message(obj.type, obj.payload);
};

Message.types = {
    ProximityData: 'ProximityData',
    ControllerData: 'ControllerData'
};

class Broadcast {
    constructor(port = 90376) {
        this.server = dgram.createSocket('udp4');
        this.server.bind(port);
    }

    send(payload){
        let str = JSON.stringify(payload);

        this.server.send(str);
    }

    setReciever(type, fn) {
        this.server.on('message', (msg, rinfo) => {
            let message = Message.fromPayload(msg);
            if(message.type === type){
                fn(message.payload);
            }
        });
    }
}

export default Broadcast;
export { Message, Broadcast };