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
		this.load.spritesheet("startlabel", "../assets/images/startLabel3.png",{
			frameWidth: 300,
			frameHeight: 300
		});
		this.load.image('cell', '../assets/images/background4.png');
        this.load.image('color', '../assets/images/background3.png');
        this.load.image('grad', '../assets/images/background1.jpg');
        this.load.image('stuff', '../assets/images/background2.png');

	}

	create() {
		// background
        var grad = this.add.image(0, 0, 'grad').setOrigin(0, 0).setScale(3.0);

        for (let i=0; i<8; ++i) {
            for (let j=0; j<8; ++j) {
                var stuff = this.add.image(250*j, 150*i, 'stuff').setOrigin(0, 0);
            }
        }
        for (let i=0; i<30; ++i) {
            for (let j=0; j<16; ++j) {
                var cell = this.add.image(50*j, 50*i, 'cell').setOrigin(0, 0);
            }
        }
        for (let i=0; i<2; ++i) {
            for (let j=0; j<2; ++j) {
                var color = this.add.image(0+1000*j, 0+1000*i, 'color').setOrigin(0, 0);
            }
        }

		this.box = this.add.image(0, 0, "khungmain");
		this.box.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

		this.imageModule2 = this.add.sprite(0, 0,"khung1").setInteractive({cursor: 'pointer'});
		this.imageModule2.setPosition(this.cameras.main.centerX, this.cameras.main.centerY+30);
		this.imageModule2.on('pointerover', () => this.imageModule2.setFrame(1));
		this.imageModule2.on('pointerout', () => this.imageModule2.setFrame(0));
		this.imageModule2.on('pointerdown', () => this.scene.start('screenPlay1'));

		this.imageModule1 = this.add.sprite(0, 0,"khung2").setInteractive({cursor: 'pointer'});
		this.imageModule1.setPosition(this.cameras.main.centerX/2-80, this.cameras.main.centerY+30);
		this.imageModule1.on('pointerover', () => this.imageModule1.setFrame(1));
		this.imageModule1.on('pointerout', () => this.imageModule1.setFrame(0));
		this.imageModule1.on('pointerdown', () => this.scene.start('screenPlay2'));

		this.imageModule3 = this.add.sprite(0, 0,"khung3").setInteractive({cursor: 'pointer'}); 
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

	checkCreateObject() {
		let imageModule1 = this.imageModule1;
		let imageModule2 = this.imageModule2;
		let imageModule3 = this.imageModule3;
		if (imageModule1 !== null && imageModule2 !== null && imageModule3 !== null) return true;
		return false;
	}

}