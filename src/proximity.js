class Proximity {
  noble;

  constructor(noble_instance, beaconAddresses, onBeaconDiscovered) {
    this.noble = noble_instance;
    this.beaconAddresses = beaconAddresses || [];
    this.onBeaconDiscovered = onBeaconDiscovered;
    var self = this;
    this.noble.on('discover', this.discovered.bind(self));
  }

  start(){
    this.noble.startScanning([], true);
  }

  discovered(peripheral) {
    let {
      address,
      uuid,
      rssi,
      advertisement
    } = peripheral;

    if(this.beaconAddresses.indexOf(uuid) > -1) {
      this.onBeaconDiscovered(uuid, advertisement, rssi);
    }
  }
}

export default Proximity;
