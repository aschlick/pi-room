import noble from '@abandonware/noble';

class Proximity {
  constructor(beaconAddresses, onBeaconDiscovered) {
    this.beaconAddresses = beaconAddresses;
    this.onBeaconDiscovered = onBeaconDiscovered;

    noble.on('discover', this.discovered);
  }

  start(){
    noble.startScanning([], true);
  }

  discovered(peripheral) {
    let {
      uuid,
      rssi,
      advertisement
    } = peripheral;

    if(this.beaconAddresses.contains(uuid)) {
      this.onBeaconDiscovered(uuid, advertisement);
    }
  }
}

export default Proximity;
