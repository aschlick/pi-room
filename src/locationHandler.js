const RANGE_CUTOFF = -80;
const INRANGE = 1;
const OUTRANGE = -1;

class LocationHandler{
  broadcast;
  oldRanges = {};
  newRanges = {};

  constructor(broadcast) {
    this.broadcast = broadcast;
  }

  setRange(uuid, range) {
    this.oldRanges[uuid] = this.newRanges[uuid];
    this.newRanges[uuid] = range;
    
    this.checkIfRangeChanged(uuid, this.oldRanges[uuid], this.newRanges[uuid])
  }

  checkIfRangeChanged(uuid, oldRange, newRange){
    var oldDiff = oldRange - RANGE_CUTOFF;
    var newDiff = newRange - RANGE_CUTOFF;
    var ret = 0;
    if(oldDiff > 0 && newDiff < 0) {
      ret = INRANGE;
    } else if(oldDiff < 0 && newDiff > 0){
      ret = OUTRANGE;
    }

    if(ret != 0){
      console.log(`${uuid} changed to ${ret}`);
    }
  }
}

export default LocationHandler