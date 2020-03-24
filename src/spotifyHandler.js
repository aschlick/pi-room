import Forever from 'forever-monitor';

class SpotifyHandler {

    constructor(path, name = 'PiNetwork'){
        this.name = name;
        this.path = path;
        let cmd = `${path}/librespot --name "${name}" -v`
        this.child = new (Forever.Monitor)(['librespot']);

        this.child.on("error", error => {
            console.log("There was an error starting librespot", error);
        });
    }
  
    start() {
        this.child.start();
    }

    stop() {
        this.child.stop();
    }
}

export default SpotifyHandler;