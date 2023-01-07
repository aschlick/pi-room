use crate::utils::proximity::Proximity;

pub struct Brain{
  proximity: Proximity
}

const beacons: [String; 1] = [String::from("806fb06c8353")];

impl Brain {
  pub fn new(&self) -> Self {
    Self{
      proximity: Proximity{
        addresses: beacons.to_vec(), 
        on_beacon_discovered: Box::new(self.on_beacon_discovered)
      }
    }
  }

  fn on_beacon_discovered() -> () {}
}