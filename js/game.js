const Game = {
    canvas: undefined,
    context: undefined,
    width: undefined,
    height: undefined,
    intervaId: undefined,
    fps: 60,
    framesCounter: 0,

    background: undefined,
    player: undefined,
    obstacles: [],

    keys: {
        keyLeftPressed: false,
        keyRightPressed: false,
        keyJumpPressed: false
    },

    init() {
        this.canvas = document.querySelector("#canvas");
        this.context = this.canvas.getContext('2d');
        this.setDimensions();
        this.start();
    },

    setDimensions() {
        this.width = window.innerWidth - 10;
        this.height = window.innerHeight - 10;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    start() {


        this.generateAll()
        this.movePlayer()

        this.intervaId = setInterval(() => {

            if (this.keys.keyLeftPressed) this.player.moveLeft()
            if (this.keys.keyRightPressed) this.player.moveRigth()
            if (this.keys.keyJumpPressed) this.player.jump()
            this.clearAll()
            this.drawAll()


        }, 1000 / this.fps);

    },

    generateAll() {
        this.background = new Background(this.context, this.width, this.height);
        this.player = new Player(this.context, 10, 500, 0, 0);
    },

    drawAll() {
        // console.log('LLEGO')
        this.background.draw();
        this.player.draw();
    },

    movePlayer() {
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowLeft': // left arrow
                    this.keys.keyLeftPressed = true
                    break
                case 'ArrowRight': // right arrow
                    this.keys.keyRightPressed = true
                    break
                case 's':
                    this.keys.keyJumpPressed = true
                    break
            }
            // console.log(e.key + 'DOWN')
        });

        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'ArrowLeft': // left arrow
                    this.keys.keyLeftPressed = false
                    break
                case 'ArrowRight': // right arrow
                    this.keys.keyRightPressed = false
                    break
                case 's':
                    this.keys.keyJumpPressed = false
                    break
            }
            // console.log(e.key + 'UP')
        });
    },

    clearAll() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }


}