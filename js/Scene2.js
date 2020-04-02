class Scene2 extends Phaser.Scene {
	constructor() {
		super("playGame");
		var status;
	} 

	create() {
		this.back = this.add.image(40, 20, "backbutton");

		for (var i =0; i<21; i++) {
			
			if (i % 5 == 0) {
				this.add.bitmapText(i*28+20, config.height/2 - 12, "pixelFont", "|", 22);
				this.add.bitmapText(i*28+20, config.height/2+5, "pixelFont", i, 16);
			} else {
				this.add.bitmapText(i*28+20, config.height/2 - 10, "pixelFont", "|", 16);
			}
		
		}

		this.khoitao();
		
		this.statusLabel = this.add.bitmapText(config.width/2, config.height*3/4, "pixelFont", "STATUS: ", 16);

		this.input.on('pointerdown', this.startDrag, this);

		this.back.setInteractive().on('pointerdown', () => this.scene.start("bootGame"));


	}

	khoitao() {
		this.time.addEvent({
		    delay: 1000,
		    callback: ()=>{
		        var xx  = Phaser.Math.Between(20, config.width-20);
				do {
					this.number = Phaser.Math.Between(1,19);
				} while (this.number % 5 == 0);
			
				this.numberObj = this.add.image(xx, 80, "number"+this.number);
				this.numberObj.setInteractive();
		    },
		    loop: false
		})
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
		}
	}

	stopDrag() {
		this.input.on('pointerdown', this.startDrag, this);
		this.input.off('pointermove', this.doDrag, this);
		this.input.off('pointerup', this.stopDrag, this);
		this.fillNumber(this.number);
		
	}

	fillNumber(number) {
		
		if (this.dragObj != null) {
			// vi tri cua so 0
			if (this.dragObj.x > 6 && this.dragObj.x <= 34) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 1
			if (this.dragObj.x > 34 && this.dragObj.x <= 62) {
				if (number == 1) {
					this.add.bitmapText(1*28+20, config.height/2+5, "pixelFont", 1, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 2
			if (this.dragObj.x > 62 && this.dragObj.x <= 90) {
				if (number == 2) {
					this.add.bitmapText(2*28+20, config.height/2+5, "pixelFont", 2, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 3
			if (this.dragObj.x > 90 && this.dragObj.x <= 118) {
				if (number == 3) {
					this.add.bitmapText(3*28+20, config.height/2+5, "pixelFont", 3, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 4
			if (this.dragObj.x > 118 && this.dragObj.x <= 146) {
				if (number == 4) {
					this.add.bitmapText(4*28+20, config.height/2+5, "pixelFont", 4, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();			
					return;
				}
				
			}
			// vi tri cua so 5
			if (this.dragObj.x >146 && this.dragObj.x <= 174) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 6
			if (this.dragObj.x > 174 && this.dragObj.x <= 202) {
				if (number == 6) {
					this.add.bitmapText(6*28+20, config.height/2+5, "pixelFont", 6, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 7
			if (this.dragObj.x > 202 && this.dragObj.x <= 230) {
				if (number == 7) {
					this.add.bitmapText(7*28+20, config.height/2+5, "pixelFont", 7, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 8
			if (this.dragObj.x > 230 && this.dragObj.x <= 258) {
				if (number == 8) {
					this.add.bitmapText(8*28+20, config.height/2+5, "pixelFont", 8, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 9
			if (this.dragObj.x > 258 && this.dragObj.x <= 286) {
				if (number == 9) {
					this.add.bitmapText(9*28+20, config.height/2+5, "pixelFont", 9, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 10
			if (this.dragObj.x > 286 && this.dragObj.x <= 314) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 11
			if (this.dragObj.x > 314 && this.dragObj.x <= 342) {
				if (number == 11) {
					this.add.bitmapText(11*28+20, config.height/2+5, "pixelFont", 11, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 12
			if (this.dragObj.x > 342 && this.dragObj.x <= 370) {
				if (number == 12) {
				this.add.bitmapText(12*28+20, config.height/2+5, "pixelFont", 12, 16);
				this.correctAnswer();
				return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 13
			if (this.dragObj.x > 370 && this.dragObj.x <= 398) {
				if (number == 13) {
					this.add.bitmapText(13*28+20, config.height/2+5, "pixelFont", 13, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 14
			if (this.dragObj.x > 398 && this.dragObj.x <= 426) {
				if (number == 14) {
					this.add.bitmapText(14*28+20, config.height/2+5, "pixelFont", 14, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 15
			if (this.dragObj.x > 426 && this.dragObj.x <= 454) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 16
			if (this.dragObj.x > 454 && this.dragObj.x <= 482) {
				if (number == 16) {
					this.add.bitmapText(16*28+20, config.height/2+5, "pixelFont", 16, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 17
			if (this.dragObj.x > 482 && this.dragObj.x <= 510) {
				if (number == 17) {
					this.add.bitmapText(17*28+20, config.height/2+5, "pixelFont", 17, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 18
			if (this.dragObj.x > 510 && this.dragObj.x <= 538) {
				if (number == 18) {
					this.add.bitmapText(18*28+20, config.height/2+5, "pixelFont", 18, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 19
			if (this.dragObj.x > 538 && this.dragObj.x <= 566) {
				if (number == 19) {
					this.add.bitmapText(19*28+20, config.height/2+5, "pixelFont", 19, 16);
					this.correctAnswer();
					return;
				} else {
					this.wrongAnswer();
					return;
				}
				
			}
			// vi tri cua so 20
			if (this.dragObj.x > 566 && this.dragObj.x <= 594) {
				this.wrongAnswer();
				return;
			}
			
		}
		
		
	}

	wrongAnswer() {
		status = "WRONG";
		this.statusLabel.text = "STATUS: "+status;
		this.numberObj.destroy();
		this.khoitao();
	}

	correctAnswer() {
		status = "CORRECT";
		this.statusLabel.text = "STATUS: "+status;
		while(this.numberObj.y < config.height) {
			this.numberObj.y+=1;
		}
		this.numberObj.destroy();
		this.khoitao();
	}

	update() {

	}

}