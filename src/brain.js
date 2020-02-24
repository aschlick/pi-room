import Proximity from './proximity';
import { Broadcast, Message } from './broadcast';
import ControllerInfo from './controllerInfo';

// need to figure out how to update this later.
const beacons = ['806fb06c8353']

class Brain {
  broadcast = new Broadcast();
  proximity;
  noble;

  constructor(noble, ip) {
    this.noble = noble;
    this.controllerInfo = new ControllerInfo(this.broadcast, ip);
    this.proximity = new Proximity(
      this.noble,
      beacons,
      this.onBeaconDiscovered
    )
  }

  get isController() {
    return this.controllerInfo.isController
  }

  onMessageFromAnother(advert) {
    console.log(`recieved ${advert} from external source`);
  }

  onBeaconDiscovered(uuid, advert) {
    console.log(`uuid ${found} with local name ${advert.localName}`);
    broadcast.send(advert);
  }
}

export default Brain;