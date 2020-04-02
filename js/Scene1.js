class Scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	preload() {
		//this.load.image("background", "../assets/images/background.png");
		this.load.image("ship2", "../assets/images/ship2.png");
		this.load.bitmapFont("pixelFont", "../assets/font/font.png", "../assets/font/font.xml");
	}

	create() {
		//this.background = this.add.image(0, 0, "background");
		//this.background.setOrigin(0,0);
		this.add.bitmapText(140, 130, "pixelFont", "START", 50);
		this.input.on('pointerdown', () => this.scene.start("playGame"));
	}

}