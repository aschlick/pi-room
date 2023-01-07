use bluer;
use tokio;
use serde_json::json;
use futures::stream::StreamExt;
use anyhow::Result;

#[tokio::main]
async fn main() -> Result<(), bluer::Error>{
    let bluetooth_session = bluer::Session::new().await?;
    let bluetooth_adapter = bluetooth_session.default_adapter().await?;

    let name = bluetooth_adapter.name();
    let powered = bluetooth_adapter.is_powered().await?;
    println!("Adapter name: {name} is_powered: {powered}");

    let stream = bluetooth_adapter.discover_devices_with_changes().await?;

    // while let Some(event) = stream.next().await {
    //     println!("{}", json!(event))
    // }

    Ok(())
}
