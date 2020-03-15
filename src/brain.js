import Proximity from './proximity';
import { Broadcast, Message } from './broadcast';
import ControllerInfo from './controllerInfo';
import SpotifyHandler from './spotifyHandler';

// need to figure out how to update this later.
const beacons = ['806fb06c8353']

class Brain {
  broadcast = new Broadcast();
  proximity;
  noble;

  constructor(noble, ip) {
    this.noble = noble;
    this.controllerInfo = new ControllerInfo(
      this.broadcast, 
      ip,
      this.onBecomingController.bind(this),
      this.onLosingController.bind(this)
    );
    this.proximity = new Proximity(
      this.noble,
      beacons,
      this.onBeaconDiscovered
    );

    this.plugins = [
      new SpotifyHandler('~/code/librespot/target/release')
    ];
  }

  get isController() {
    return this.controllerInfo.isController
  }

  onMessageFromAnother(advert) {
    console.log(`recieved ${advert} from external source`);
  }

  onBeaconDiscovered(uuid, advert) {
    console.log(`uuid ${uuid} with local name ${advert.localName}`);
    broadcast.send(advert);
  }

  onBecomingController() {
    this.plugins.forEach(p => p.start());
  }

  onLosingController() {
    this.plugins.forEach(p => p.stop());
  }
}

export default Brain;