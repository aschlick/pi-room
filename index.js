import noble from '@abandonware/noble';

noble.startScanning([], true);

noble.on('discover', function(peripheral) { 
  var macAddress = peripheral.uuid;
  var rss = peripheral.rssi;
  var localName = peripheral.advertisement.localName; 

  if(macAddress == '806fb06c8353'){
    console.log('found device: ', macAddress, ' ', localName, ' ', rss);   
  }
});
