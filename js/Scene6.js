class Scene6 extends Phaser.Scene {
	constructor(){
		super("screenPlay3");
	}

	create() {
		this.back = this.add.sprite(40, 20, "buttonback").setInteractive();
		this.back.on('pointerover', () => this.back.setFrame(1));
		this.back.on('pointerout', () => this.back.setFrame(0));
		this.back.on('pointerdown', () => this.scene.start("screenMain"));

		this.duongray1_1 = this.add.image(250, config.height*3/4, "duong-ray1");
		this.duongray2_1 = this.add.image(700, config.height*3/4, "duong-ray2");
		this.duongray2_1 = this.add.image(1150, config.height*3/4, "duong-ray2");
		//this.bodytrain19 = this.add.image(450, config.height*3/4 -100, "body-train19");
		this.headtrain20_1 = this.add.image(200, config.height*3/4 - 110, "head-train20");

	}

}