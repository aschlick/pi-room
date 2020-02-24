class Proximity {
  noble;

  constructor(noble_instance, beaconAddresses, onBeaconDiscovered) {
    this.noble = noble_instance;
    this.beaconAddresses = beaconAddresses;
    this.onBeaconDiscovered = onBeaconDiscovered;

    this.noble.on('discover', this.discovered);
  }

  start(){
    this.noble.startScanning([], true);
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
