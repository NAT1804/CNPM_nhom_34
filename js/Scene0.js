class Scene0 extends Phaser.Scene {
	constructor() {
		super("screenMain");
	}

	preload() {
		// chung
		this.load.image("khungmain", "../assets/images/khungmain.png");
		this.load.image("khungtrang", "../assets/images/khungtrang.png");
		this.load.spritesheet("khung1","../assets/images/khung1.png", {
			frameWidth: 343,
			frameHeight: 382
		});
		this.load.spritesheet("khung2","../assets/images/khung2.png", {
			frameWidth: 343,
			frameHeight: 382
		});
		this.load.spritesheet("khung3","../assets/images/khung3.png", {
			frameWidth: 343,
			frameHeight: 382
		});
		this.load.bitmapFont("pixelFont", "../assets/font/font.png", "../assets/font/font.xml");

		this.load.image("greenball", "../assets/images/greenball.png");
		this.load.image("thanhbar", "../assets/images/thanhbar2.png");
		this.load.image("loa", "../assets/images/loa.png");
		this.load.spritesheet("explosion", "../assets/images/explosion.png", {
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.image("finishbutton", "../assets/images/finishbutton.png");
		this.load.image("khungfinish", "../assets/images/khungfinish.png");
		this.load.image("imagewrong", "../assets/images/imagewrong.png");
		this.load.audio("sound", ["../assets/images/pickup.ogg","../assets/images/pickup.mp3"]);

		// bai 1 va bai 3
		for (var i=1; i<=20; i++) {
			this.load.image("body-train"+i, "../assets/images/body-train"+i+".png");
		}

		this.load.image("head-train0", "../assets/images/head-train0.png");
		this.load.image("head-train20", "../assets/images/head-train20.png");

		for (var i=1; i<=20; i++) {
			this.load.image("body-train"+i, "../assets/images/body-train"+i+".png");
		}

		this.load.spritesheet("duong-ray", "../assets/images/duong-ray.png",{
			frameWidth: 570,
			frameHeight: 93
		});
		
		this.load.spritesheet("buttonback", "../assets/images/buttonback.png", {
			frameWidth: 60,
			frameHeight: 13
		});
		this.load.spritesheet("buttonstart", "../assets/images/buttonstart.png", {
			frameWidth: 74,
			frameHeight: 24
		});

		// bai 2
		this.load.image("numberline", "../assets/images/numberline.png");
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
		this.khungmain = this.add.image(0, 30, "khungmain");
		this.khungmain.setOrigin(0, 0);
		this.khung1 = this.add.sprite(550, 150,"khung1").setInteractive({cursor: 'pointer'});
		this.khung1.setOrigin(0, 0);		
		this.khung1.on('pointerover', () => this.khung1.setFrame(1));
		this.khung1.on('pointerout', () => this.khung1.setFrame(0));
		this.khung1.on('pointerdown', () => this.scene.start('screenStart1'));
		this.khung2 = this.add.sprite(50, 150,"khung2").setInteractive({cursor: 'pointer'}); 
		this.khung2.setOrigin(0, 0);		
		this.khung2.on('pointerover', () => this.khung2.setFrame(1));
		this.khung2.on('pointerout', () => this.khung2.setFrame(0));
		this.khung2.on('pointerdown', () => this.scene.start('screenStart2'));
		this.khung3 = this.add.sprite(1050, 150,"khung3").setInteractive({cursor: 'pointer'});
		this.khung3.setOrigin(0, 0);		
		this.khung3.on('pointerover', () => this.khung3.setFrame(1));
		this.khung3.on('pointerout', () => this.khung3.setFrame(0));
		this.khung3.on('pointerdown', () => this.scene.start('screenStart3'));

		this.anims.create({
			key: "explode",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 20, // 20 frames per second
			repeat: 0,
			hideOnComplete: true
		});
	}

}