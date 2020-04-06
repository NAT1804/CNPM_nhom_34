class Scene5 extends Phaser.Scene {
	constructor(){
		super("screenStart3");
	}

	preload() {

		// for (var i=1; i<=20; i++) {
		// 	this.load.image("body-train"+i, "../assets/images/body-train"+i+".png");
		// }

		// this.load.image("head-train20", "../assets/images/head-train20.png");

		// for (var i=1; i<=20; i++) {
		// 	this.load.image("body-train"+i, "../assets/images/body-train"+i+".png");
		// }

		// for (var i=0; i<=7; i++) {
		// 	this.load.image("duong-ray"+i, "../assets/images/duong-ray"+i+".png");
		// }

		this.load.spritesheet("buttonback", "../assets/images/buttonback.png", {
			frameWidth: 60,
			frameHeight: 13
		});
		this.load.spritesheet("buttonstart", "../assets/images/buttonstart.png", {
			frameWidth: 74,
			frameHeight: 24
		});
	}

	create() {
		this.add.bitmapText(config.width/3, config.height/4, "pixelFont", "Build up the train", 50);

		this.start = this.add.sprite(config.width/2, config.height/2, "buttonstart").setInteractive();
		this.start.on('pointerover', () => this.start.setFrame(1));
		this.start.on('pointerout', () => this.start.setFrame(0));
		this.start.on('pointerdown', () => this.scene.start("screenPlay3"));
	}

}