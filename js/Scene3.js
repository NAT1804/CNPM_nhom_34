class Scene3 extends Phaser.Scene {
	constructor(){
		super("screenStart2");
	}

	create() {
		//header
		this.add.bitmapText(config.width/3+80, config.height/4, "pixelFont", "Ordering numbers", 50);

		// start button
		this.start = this.add.sprite(config.width/2, config.height/2, "buttonstart").setInteractive({
			cursor: 'pointer'
		});
		this.start.on('pointerover', () => this.start.setFrame(1));
		this.start.on('pointerout', () => this.start.setFrame(0));
		this.start.on('pointerdown', () => this.scene.start("screenPlay2"));

		//back button
		this.back = this.add.sprite(40, 50, "buttonback").setInteractive({cursor: 'pointer'});
		this.back.on('pointerover', () => this.back.setFrame(1));
		this.back.on('pointerout', () => this.back.setFrame(0));
		this.back.on('pointerdown', () => this.scene.start("screenMain"));
	}

}