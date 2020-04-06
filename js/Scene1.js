class Scene1 extends Phaser.Scene {
	constructor() {
		super("screenStart1");
	}

	preload() {
		
		for (var i = 1; i<=19; i++) {
			if (i%5!=0) {
				this.load.image("number"+i,"../assets/images/Number"+i+".png");
			}
		}
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
		// this.add.text(120, 50, "Ball on the number line", {
		// 	color: '#000000',
		// 	stroke: '#fff',
		// 	align: 'center',
		// 	fontFamily:'Serif',
		// 	fontSize: '30px'
		// });
		this.add.bitmapText(config.width/3, config.height/4, "pixelFont", "Ball on the number line", 50);
		this.start = this.add.sprite(config.width/2, config.height/2, "buttonstart").setInteractive();
		this.start.on('pointerover', () => this.start.setFrame(1));
		this.start.on('pointerout', () => this.start.setFrame(0));
		this.start.on('pointerdown', () => this.scene.start("screenPlay1"));
	}

}