import Forever from 'forever-monitor';

class SpotifyHandler {

    constructor(path, name = 'PiNetwork'){
        this.name = name;
        this.path = path;

        this.child = new (Forever.Monitor)(['librespot'], {
            cwd: this.path,
            command: 'librespot',
            args: ['--name', this.name, '-v']
        });

        this.child.on("error", error => {
            console.error("There was an error starting librespot", error);
        })
    }
  
    start() {
        this.child.start();
    }

    stop() {
        this.child.stop();
    }
}

export default SpotifyHandler;