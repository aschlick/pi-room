import { Message } from './broadcast';

const messageType = Message.types.ControllerData

class ControllerInfo {
  statusId = 0;
  controllerIp;
  broadcast;

  constructor(broadcast) {
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
          controllerIp: 'thisControllersIp'
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