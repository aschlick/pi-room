import Forever from 'forever-monitor';

class SpotifyHandler {

    constructor(path, name = 'PiNetwork'){
        this.name = name;
        this.path = path;
    }
  
    start() {
        this.forever = Forever.start(['librespot'], {
            cwd: this.path,
            command: 'librespot',
            args: ['--name', this.name, '-v']
        });
    }

    stop() {
        this.forever.stop();
    }
}

export default SpotifyHandler;