import Proximity from './proximity';
import Broadcast from './broadcast';

// need to figure out how to update this later.
const beacons = ['806fb06c8353']

class Brain {
  isController = false;
  broadcast = new Broadcast();
  proximity;

  constructor(noble) {
    this.noble = noble;
  }

  start() {
    this.broadcast.setReciever(this.onMessageFromAnother);
    proximity = new Proximity(
      this.noble,
      beacons,
      this.onBeaconDiscovered
    )
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