class Scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	preload() {
		//this.load.image("background", "../assets/images/background.png");
		
		for (var i = 1; i<=19; i++) {
			if (i%5!=0) {
				this.load.image("number"+i,"../assets/images/Number"+i+".png");
			}
		}
		this.load.image("backbutton", "../assets/images/backbutton.png");
		this.load.image("startbutton", "../assets/images/startbutton.png");
		this.load.bitmapFont("pixelFont", "../assets/font/font.png", "../assets/font/font.xml");
	}

	create() {
		this.add.bitmapText(120, 50, "pixelFont", "Ball on the number line", 40);
		this.start = this.add.image(config.width/2, config.height/2, "startbutton");
		this.start.setInteractive().on('pointerdown', () => this.scene.start("playGame"));
	}

}