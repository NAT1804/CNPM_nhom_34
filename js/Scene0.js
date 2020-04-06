class Scene0 extends Phaser.Scene {
	constructor() {
		super("screenMain")
	}

	preload() {
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
	}

	create() {
		this.khung1 = this.add.sprite(550,150,"khung1").setInteractive();
		this.khung1.setOrigin(0, 0);		
		this.khung1.on('pointerover', () => this.khung1.setFrame(1));
		this.khung1.on('pointerout', () => this.khung1.setFrame(0));
		this.khung1.on('pointerdown', () => this.scene.start('screenStart1'));
		this.khung2 = this.add.sprite(50,150,"khung2").setInteractive();
		this.khung2.setOrigin(0, 0);		
		this.khung2.on('pointerover', () => this.khung2.setFrame(1));
		this.khung2.on('pointerout', () => this.khung2.setFrame(0));
		this.khung2.on('pointerdown', () => this.scene.start('screenStart2'));
		this.khung3 = this.add.sprite(1050,150,"khung3").setInteractive();
		this.khung3.setOrigin(0, 0);		
		this.khung3.on('pointerover', () => this.khung3.setFrame(1));
		this.khung3.on('pointerout', () => this.khung3.setFrame(0));
		this.khung3.on('pointerdown', () => this.scene.start('screenStart3'));
	}

}