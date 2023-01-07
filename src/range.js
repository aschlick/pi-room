const RANGE_LENGTH = 10;

class Range {
  values = [];

  add(value){
    this.values.push(value)
    if(this.values.length > RANGE_LENGTH) this.values.shift();
  }

  average(){
    return this.values.reduce((a,b)=>a+b)/this.values.length
  }
}

export default Range;