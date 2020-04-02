class Scene2 extends Phaser.Scene {
	constructor() {
		super("playGame");
	} 

	create() {
		this.add.bitmapText(20, 20, "pixelFont","BACK", 20);

		for (var i =0; i<21; i++) {
			
			if (i % 5 == 0) {
				this.add.bitmapText(i*28+20, config.height/2 - 12, "pixelFont", "|", 22);
				this.add.bitmapText(i*28+20, config.height/2+5, "pixelFont", i, 16);
			} else {
				this.add.bitmapText(i*28+20, config.height/2 - 10, "pixelFont", "|", 16);
			}
		
		}


		var xx  = Phaser.Math.Between(20, config.width-20);
		//var yy  = Phaser.Math.Between(50, config.height/2-20);
		var ship = this.add.image(xx, 80, "ship2");
		ship.setInteractive();
		
		this.input.on('pointerdown', this.startDrag, this);

	}

	startDrag(pointer, targets) {
		this.input.off('pointerdown', this.startDrag, this);
		this.dragObj = targets[0];
		this.input.on('pointermove', this.doDrag, this);
		this.input.on('pointerup', this.stopDrag, this);
	}

	doDrag(pointer) {
		if (this.dragObj != null) {
			if (this.dragObj.x > 20 || this.dragObj.x < config.width - 20) {
				this.dragObj.x = pointer.x;
				this.dragObj.y = 80;
			}
			//this.add.bitmapText(this.dragObj.x, this.dragObj.y, "pixelFont", "|", 20);
		}
	}

	stopDrag() {
		this.input.on('pointerdown', this.startDrag, this);
		this.input.off('pointermove', this.doDrag, this);
		this.input.off('pointerup', this.stopDrag, this);
		this.fillNumber();
	}

	fillNumber() {
		if (this.dragObj != null) {
			if (this.dragObj.x > 34 && this.dragObj.x <= 62) 
			this.add.bitmapText(1*28+20, config.height/2+5, "pixelFont", 1, 16);
			if (this.dragObj.x > 62 && this.dragObj.x <= 90) 
				this.add.bitmapText(2*28+20, config.height/2+5, "pixelFont", 2, 16);
			if (this.dragObj.x > 90 && this.dragObj.x <= 118) 
				this.add.bitmapText(3*28+20, config.height/2+5, "pixelFont", 3, 16);
			if (this.dragObj.x > 118 && this.dragObj.x <= 146) 
				this.add.bitmapText(4*28+20, config.height/2+5, "pixelFont", 4, 16);
			if (this.dragObj.x > 174 && this.dragObj.x <= 202) 
				this.add.bitmapText(6*28+20, config.height/2+5, "pixelFont", 6, 16);
			if (this.dragObj.x > 202 && this.dragObj.x <= 230) 
				this.add.bitmapText(7*28+20, config.height/2+5, "pixelFont", 7, 16);
			if (this.dragObj.x > 230 && this.dragObj.x <= 258) 
				this.add.bitmapText(8*28+20, config.height/2+5, "pixelFont", 8, 16);
			if (this.dragObj.x > 258 && this.dragObj.x <= 286) 
				this.add.bitmapText(9*28+20, config.height/2+5, "pixelFont", 9, 16);
			if (this.dragObj.x > 314 && this.dragObj.x <= 342) 
				this.add.bitmapText(11*28+20, config.height/2+5, "pixelFont", 11, 16);
			if (this.dragObj.x > 342 && this.dragObj.x <= 370) 
				this.add.bitmapText(12*28+20, config.height/2+5, "pixelFont", 12, 16);
			if (this.dragObj.x > 370 && this.dragObj.x <= 398) 
				this.add.bitmapText(13*28+20, config.height/2+5, "pixelFont", 13, 16);
			if (this.dragObj.x > 398 && this.dragObj.x <= 426) 
				this.add.bitmapText(14*28+20, config.height/2+5, "pixelFont", 14, 16);
			if (this.dragObj.x > 454 && this.dragObj.x <= 482) 
				this.add.bitmapText(16*28+20, config.height/2+5, "pixelFont", 16, 16);
			if (this.dragObj.x > 482 && this.dragObj.x <= 510) 
				this.add.bitmapText(17*28+20, config.height/2+5, "pixelFont", 17, 16);
			if (this.dragObj.x > 510 && this.dragObj.x <= 538) 
				this.add.bitmapText(18*28+20, config.height/2+5, "pixelFont", 18, 16);
			if (this.dragObj.x > 538 && this.dragObj.x <= 566) 
				this.add.bitmapText(19*28+20, config.height/2+5, "pixelFont", 19, 16);
		}
		
		
	}

	turnback() {
		this.input.on('pointerdown', () => this.scene.start("bootGame"));
	}

	update() {

	}

}