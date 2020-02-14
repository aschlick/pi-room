class Proximity {
  noble;

  constructor(noble_instance, beaconAddresses, onBeaconDiscovered) {
    noble = noble_instance;
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
