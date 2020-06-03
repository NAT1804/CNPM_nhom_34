class Scene4 extends Phaser.Scene {
	constructor() {
		super('screenFinish');
	}
	
	create() {
		this.text = this.add.text(485, 140, 'Well done! You completed the card!', {
			fontFamily: 'PT Sans',
			fontSize: '30px',
			color: '#000000'
		});
		this.dragonImg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY-50, 'dragon');
		this.finishButton = this.add.sprite(0, 0, "finishbutton").setInteractive({cursor: 'pointer'});
		this.finishButton.setPosition(this.cameras.main.centerX, this.cameras.main.centerY+200);
		this.finishButton.on('pointerover', () => this.finishButton.setFrame(1));
		this.finishButton.on('pointerout', () => this.finishButton.setFrame(0));
		this.finishButton.on('pointerdown', () => this.scene.start("screenMain"));
	}
}