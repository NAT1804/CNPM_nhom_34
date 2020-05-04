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
		this.load.spritesheet("finishbutton", "../assets/images/finishbutton.png",{
			frameWidth: 492,
			frameHeight: 87
		});
		this.load.image("khungfinish", "../assets/images/khungfinish.png");
		this.load.image("imagewrong", "../assets/images/imagewrong.png");
		this.load.audio("sound", ["../assets/sounds/pickup.ogg","../assets/sounds/pickup.mp3"]);
		this.load.audio("sound1", "../assets/sounds/sound1.mp3");
		this.load.audio("sound2", "../assets/sounds/sound2.mp3");
		this.load.audio("sound3", "../assets/sounds/sound3.mp3");
		this.load.audio("sound4", "../assets/sounds/sound4.mp3");

		this.load.image("start", "../assets/images/startButton.png");
		this.load.image("background", "../assets/images/background.png");
		this.load.image("backgroundBonus", "../assets/images/banva.png");
		this.load.spritesheet("startlabel", "../assets/images/startlabel3.png",{
			frameWidth: 300,
			frameHeight: 300
		});

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
		this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
		this.box = this.add.image(0, 30, "khungmain");
		this.box.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

		this.imageModule2 = this.add.sprite(550, 220,"khung1").setInteractive({cursor: 'pointer'});	
		this.imageModule2.setPosition(this.cameras.main.centerX, this.cameras.main.centerY+30);
		this.imageModule2.on('pointerover', () => this.imageModule2.setFrame(1));
		this.imageModule2.on('pointerout', () => this.imageModule2.setFrame(0));
		this.imageModule2.on('pointerdown', () => this.scene.start('screenPlay1'));

		this.imageModule1 = this.add.sprite(50, 220,"khung2").setInteractive({cursor: 'pointer'}); 
		this.imageModule1.setPosition(this.cameras.main.centerX/2-80, this.cameras.main.centerY+30);
		this.imageModule1.on('pointerover', () => this.imageModule1.setFrame(1));
		this.imageModule1.on('pointerout', () => this.imageModule1.setFrame(0));
		this.imageModule1.on('pointerdown', () => this.scene.start('screenPlay2'));

		this.imageModule3 = this.add.sprite(1050, 220,"khung3").setInteractive({cursor: 'pointer'});
		this.imageModule3.setPosition(this.cameras.main.centerX*3/2+80, this.cameras.main.centerY+30);		
		this.imageModule3.on('pointerover', () => this.imageModule3.setFrame(1));
		this.imageModule3.on('pointerout', () => this.imageModule3.setFrame(0));
		this.imageModule3.on('pointerdown', () => this.scene.start('screenPlay3'));

		this.anims.create({
			key: "explode",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 5, // 5 frames per second
			repeat: 0,
			hideOnComplete: true
		});
	}

}