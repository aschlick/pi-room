import Proximity from './src/proximity';
import Broadcast from './src/broadcast';

let cast = new Broadcast();

cast.setReciever((advert) => {
  console.log(`recieved ${advert} from external source`);
});

let beacons = ['806fb06c8353']
let onDiscovered = (uuid, advert) => {
  console.log(`uuid ${found} with local name ${advert.localName}`);
  cast.send(advert);
}

let prox = new Proximity(beacons, onDiscovered);