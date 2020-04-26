//jshint esversion: 6
class Scene0 extends Phaser.Scene {
	constructor() {
		super("screenMain");
	}

	preload() {
		// general
		this.load.image("khungmain", "../assets/images/khungmain.png");
		this.load.image("khungtrang", "../assets/images/khungtrang2.png");
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

		// module 1 and module 3
		for (var i=1; i<=20; i++) {
			this.load.image("body-train"+i, "../assets/images/body-train"+i+".png");
		}

		this.load.image("head-train0", "../assets/images/head-train0.png");
		this.load.image("head-train20", "../assets/images/head-train20.png");

		for (var j=1; j<=20; j++) {
			this.load.image("body-train"+j, "../assets/images/body-train"+j+".png");
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

		// module 2
		this.load.image("numberline", "../assets/images/numberline.png");
		for (var k = 1; k <= 19; k++) {
			if (k % 5 != 0) {
				this.load.spritesheet("ball"+k, "../assets/images/Ball"+k+".png", {
					frameWidth: 33,
					frameHeight: 166
				});
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
		this.background = this.add.image(0, 30, "khungmain");
		this.background.setOrigin(0, 0);
		this.imageModule2 = this.add.sprite(550, 150,"khung1").setInteractive({cursor: 'pointer'});
		this.imageModule2.setOrigin(0, 0);		
		this.imageModule2.on('pointerover', () => this.imageModule2.setFrame(1));
		this.imageModule2.on('pointerout', () => this.imageModule2.setFrame(0));
		this.imageModule2.on('pointerdown', () => this.scene.start('screenStart1'));
		this.imageModule1 = this.add.sprite(50, 150,"khung2").setInteractive({cursor: 'pointer'}); 
		this.imageModule1.setOrigin(0, 0);		
		this.imageModule1.on('pointerover', () => this.imageModule1.setFrame(1));
		this.imageModule1.on('pointerout', () => this.imageModule1.setFrame(0));
		this.imageModule1.on('pointerdown', () => this.scene.start('screenStart2'));
		this.imageModule3 = this.add.sprite(1050, 150,"khung3").setInteractive({cursor: 'pointer'});
		this.imageModule3.setOrigin(0, 0);		
		this.imageModule3.on('pointerover', () => this.imageModule3.setFrame(1));
		this.imageModule3.on('pointerout', () => this.imageModule3.setFrame(0));
		this.imageModule3.on('pointerdown', () => this.scene.start('screenStart3'));

		this.anims.create({
			key: "explode",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 5, // 5 frames per second
			repeat: 0,
			hideOnComplete: true
		});
	}

}