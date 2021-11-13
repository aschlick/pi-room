import Proximity from './proximity';
import { Broadcast, Message } from './broadcast';
import ControllerInfo from './controllerInfo';
import SpotifyHandler from './spotifyHandler';
import LocationHandler from './locationHandler';
import Range from './range';

// need to figure out how to update this later.
const beacons = ['806fb06c8353']

class Brain {
  broadcast = new Broadcast();
  locationHandler = new LocationHandler(this.broadcast);
  proximity;
  noble;
  ranges = {};

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
      this.onBeaconDiscovered.bind(this)
    );

    this.proximity.start()

    this.plugins = [
      new SpotifyHandler('/home/pi/code/librespot/target/release')
    ];
  }

  get isController() {
    return this.controllerInfo.isController
  }

  onMessageFromAnother(advert) {
    console.log(`recieved ${advert} from external source`);
  }

  onBeaconDiscovered(uuid, advert, rssi) {
    if(!this.ranges[uuid]) this.ranges[uuid] = new Range();
    this.ranges[uuid].add(rssi)
    this.locationHandler.setRange(uuid, this.ranges[uuid].average())
  }

  onBecomingController() {
    this.plugins.forEach(p => p.start());
  }

  onLosingController() {
    this.plugins.forEach(p => p.stop());
  }
}

export default Brain;
