use crate::utils::brain::Brain;

pub struct Proximity {
  addresses: Vec<String>,
  on_beacon_discovered: Box<dyn Fn()>
}

impl Proximity {

}