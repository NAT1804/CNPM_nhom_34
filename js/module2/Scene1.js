//jshint esversion: 6
class Scene1 extends Phaser.Scene {
	constructor() {
		super("screenStart1");
	}

	create() {
		//header
		this.add.bitmapText(config.width/3+60, config.height/4, "pixelFont", "Ball on the number line", 50);

		//start button
		this.startButton = this.add.sprite(config.width/2, config.height/2, "buttonstart").setInteractive({cursor: 'pointer'});
		this.startButton.on('pointerover', () => this.startButton.setFrame(1));
		this.startButton.on('pointerout', () => this.startButton.setFrame(0));
		this.startButton.on('pointerdown', () => this.scene.start("screenPlay1"));

		//backButton button
		this.backButton = this.add.sprite(40, 50, "buttonback").setInteractive({cursor: 'pointer'});
		this.backButton.on('pointerover', () => this.backButton.setFrame(1));
		this.backButton.on('pointerout', () => this.backButton.setFrame(0));
		this.backButton.on('pointerdown', () => this.scene.start("screenMain"));
	}

}