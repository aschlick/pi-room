import { Message } from './broadcast';

const messageType = Message.types.ControllerData

class ControllerInfo {
  statusId = 0;
  controllerIp;
  broadcast;
  selfIp;

  constructor(broadcast, ip) {
    this.selfIp = ip;
    this.broadcast = broadcast;
    this.broadcast.setReciever(messageType, this.receiveMessage.bind(this))
    this.queryForController();
  }

  get isController(){
    var status = this.statusId === ControllerInfo.statuses.indexOf("isController")
    return status;
  }

  queryForController(){
    this.broadcast.send(
      new Message(
        messageType,
        "Query"
      )
    );

    setTimeout(this.declareSelfController.bind(this), 500);
  }

  declareSelfController() {
    if(!this.controllerIp && !this.isController){
      this.statusId = ControllerInfo.statuses.indexOf("isController");
      this.broadcast.send(new Message(
        messageType,
        {
          controllerIp: this.selfIp
        }
      ));
    }
  }

  receiveMessage(payload) {
    if(payload.controllerIp){
      this.controllerIp = payload.controllerIp;
    }
  }
}

ControllerInfo.statuses = [
  "init",
  "pending",
  "isController",
  "hasController"
];

export default ControllerInfo;