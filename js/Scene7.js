class Scene7 extends Phaser.Scene {
	constructor() {
		super("screenEnd");
	}

	create() {
		this.finishScreen = this.add.image(0, 30, "khungfinish");
		this.finishScreen.setOrigin(0, 0);
		this.buttonfinish = this.add.image(770, 500, "finishbutton").setInteractive({cursor: 'pointer'});
		this.buttonfinish.on('pointerdown', () => this.scene.start("screenMain"));
	}

}