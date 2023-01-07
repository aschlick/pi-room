const Receiver = require('rpi-clickety').Receiver

//Note we are passing 27 not 13 for pin param
const receiver = new Receiver(27);
 
//receiver is an event emitter that will emit received codes
//along with other useful info.
receiver.on('code', (data) => {
 
  console.log(data.code); //Print decimal code
});
 
receiver.listenStart();