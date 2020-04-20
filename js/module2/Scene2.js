class Scene2 extends Phaser.Scene {
	constructor() {
		super("screenPlay1");
		var status;
	} 

	create() {
		//background
		this.khungtrang = this.add.image(0, 30, "khungtrang");
		this.khungtrang.setOrigin(0, 0);

		// header
		this.add.text(420, 85, "Place the ball on the number line", {
			color: '#000000',
			fontSize: '30px',
			stroke: '#000',
			strokeThickness: 3 
		})
		//back button
		this.back = this.add.sprite(40, 50, "buttonback").setInteractive({cursor: 'pointer'});
		this.back.on('pointerover', () => this.back.setFrame(1));
		this.back.on('pointerout', () => this.back.setFrame(0));
		this.back.on('pointerdown', () => this.scene.start("screenMain"));


		//thanh chay
		this.thanhbar = this.add.image(400, 30, "thanhbar").setScale(0.5);
		this.thanhbar.setOrigin(0, 0);
		this.greenball1 = this.add.image(402, 33 , "greenball").setScale(0.5);
		this.greenball1.setOrigin(0, 0);
		this.greenball2 = this.add.image(446, 33 , "greenball").setScale(0.5);
		this.greenball2.setOrigin(0, 0);
		this.greenball3 = this.add.image(490, 33 , "greenball").setScale(0.5);
		this.greenball3.setOrigin(0, 0);
		this.greenball4 = this.add.image(534, 33 , "greenball").setScale(0.5);
		this.greenball4.setOrigin(0, 0);

		// status green ball
		this.greenball4.statusRight = true;
		this.greenball3.statusRight = false;
		this.greenball2.statusRight = false;
		this.greenball1.statusRight = false;
		this.greenball4.statusLeft = false;
		this.greenball3.statusLeft = false;
		this.greenball2.statusLeft = false;
		this.greenball1.statusLeft = false;

		// am thanh
		this.loa = this.add.image(280, 60, "loa").setScale(0.2);
		this.loa.setOrigin(0, 0);
		this.loa.setInteractive({cursor: 'pointer'});
		this.music = this.sound.add('sound');
		this.loa.on('pointerdown', () => this.music.play());

		this.khoitao();
		
		this.input.on('pointerdown', this.startDrag, this);

	}

	khoitao() {
		this.time.addEvent({
		    delay: 1000,
		    callback: ()=>{
		    	this.countCorrect = 0;
		        // number line
				this.numberline = this.add.image(100, 300, "numberline");
				this.numberline.setOrigin(0, 0);
				//random number
				 this.randomNumber();
				//status
				this.statusLabel = this.add.bitmapText(config.width/2-100, config.height*3/4-25, "pixelFont", "STATUS: ", 30);
				this.end = false;
				
		    },
		    loop: false
		})
	}

	randomNumber() {
		if (this.countCorrect == 0) {
			var xx  = Phaser.Math.Between(100, config.width-100);
			do {
				this.number = Phaser.Math.Between(1,7);
			} while (this.number % 5 == 0);
			this.numberObj1 = this.add.sprite(xx, 250, "ball"+this.number).setFrame(0).setScale(1.5).setInteractive({cursor: 'pointer'});
		}
		if (this.countCorrect == 1) {
			var xx  = Phaser.Math.Between(100, config.width-100);
			do {
				this.number = Phaser.Math.Between(8,13);
			} while (this.number % 5 == 0);
			this.numberObj2 = this.add.sprite(xx, 250, "ball"+this.number).setFrame(0).setScale(1.5).setInteractive({cursor: 'pointer'});
		}
		if (this.countCorrect == 2) {
			var xx  = Phaser.Math.Between(100, config.width-100);
			do {
				this.number = Phaser.Math.Between(14,19);
			} while (this.number % 5 == 0);
			this.numberObj3 = this.add.sprite(xx, 250, "ball"+this.number).setFrame(0).setScale(1.5).setInteractive({cursor: 'pointer'});
		}
		
	}

	startDrag(pointer, targets) {
		this.input.off('pointerdown', this.startDrag, this);
		this.dragObj = targets[0];
		this.input.on('pointermove', this.doDrag, this);
		this.input.on('pointerup', this.stopDrag, this);
	}

	doDrag(pointer) {
		if (this.dragObj != null) {
			this.dragObj.setFrame(1);
			if (this.dragObj.x > 100 || this.dragObj.x < config.width - 100) {
				this.dragObj.x = pointer.x;
				this.dragObj.y = 250;
			}
			else {
				this.dragObj.x = 100;
				this.dragObj.y = 250;
			}
		}
	}

	stopDrag() {
		this.input.on('pointerdown', this.startDrag, this);
		this.input.off('pointermove', this.doDrag, this);
		this.input.off('pointerup', this.stopDrag, this);
		this.fillNumber();
		
	}

	fillNumber() {
		
		if (this.dragObj != null && this.dragObj != this.loa) {
			// vi tri cua so 0
			if (this.dragObj.x > 155 && this.dragObj.x <= 200) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 1
			if (this.dragObj.x > 200 && this.dragObj.x <= 250) {
				this.check(this.number, 1);
			}
			// vi tri cua so 2
			if (this.dragObj.x > 250 && this.dragObj.x <= 300) {
				this.check(this.number, 2);	
			}
			// vi tri cua so 3
			if (this.dragObj.x > 300 && this.dragObj.x <= 350) {
				this.check(this.number, 3);	
			}
			// vi tri cua so 4
			if (this.dragObj.x > 350 && this.dragObj.x <= 400) {
				this.check(this.number, 4);	
			}
			// vi tri cua so 5
			if (this.dragObj.x > 400 && this.dragObj.x <= 450) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 6
			if (this.dragObj.x > 450 && this.dragObj.x <= 500) {
				this.check(this.number, 6);	
			}
			// vi tri cua so 7
			if (this.dragObj.x > 500 && this.dragObj.x <= 550) {
				this.check(this.number, 7);	
			}
			// vi tri cua so 8
			if (this.dragObj.x > 550 && this.dragObj.x <= 600) {
				this.check(this.number, 8);
			}
			// vi tri cua so 9
			if (this.dragObj.x > 600 && this.dragObj.x <= 650) {
				this.check(this.number, 9);	
			}
			// vi tri cua so 10
			if (this.dragObj.x > 650 && this.dragObj.x <= 700) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 11
			if (this.dragObj.x > 700 && this.dragObj.x <= 750) {
				this.check(this.number, 11);	
			}
			// vi tri cua so 12
			if (this.dragObj.x > 750 && this.dragObj.x <= 800) {
				this.check(this.number, 12);	
			}
			// vi tri cua so 13
			if (this.dragObj.x > 800 && this.dragObj.x <= 850) {
				this.check(this.number, 13);	
			}
			// vi tri cua so 14
			if (this.dragObj.x > 850 && this.dragObj.x <= 900) {
				this.check(this.number, 14);	
			}
			// vi tri cua so 15
			if (this.dragObj.x > 900 && this.dragObj.x <= 950) {
				this.wrongAnswer();
				return;
			}
			// vi tri cua so 16
			if (this.dragObj.x > 950 && this.dragObj.x <= 1000) {
				this.check(this.number, 16);	
			}
			// vi tri cua so 17
			if (this.dragObj.x > 1000 && this.dragObj.x <= 1050) {
				this.check(this.number, 17);	
			}
			// vi tri cua so 18
			if (this.dragObj.x > 1050 && this.dragObj.x <= 1100) {
				this.check(this.number, 18);	
			}
			// vi tri cua so 19
			if (this.dragObj.x > 1100 && this.dragObj.x <= 1150) {
				this.check(this.number, 19);	
			}
			// vi tri cua so 20
			if (this.dragObj.x > 1150 && this.dragObj.x <= 1200) {
				this.wrongAnswer();
				return;
			}

		}
			
	}

	check(number, tmp) {
		if (number == tmp) {
			this.correctAnswer();
			return;
		} else {
			this.wrongAnswer();
			return;
		}
	}

	wrongAnswer() {
		if (this.countCorrect == 0) this.numberObj1.setFrame(3);
		if (this.countCorrect == 1) this.numberObj2.setFrame(3);
		if (this.countCorrect == 2) this.numberObj3.setFrame(3);
		status = "WRONG";
		this.statusLabel.text = "STATUS: "+status;
		
		
		if (this.greenball4.statusLeft) {
			this.greenballMoveLeft(this.greenball4, 4);
			this.greenball4.statusLeft = false;
			this.greenball3.statusRight = false;
			this.greenball4.statusRight = true;
		}
		if (this.greenball3.statusLeft) {
			this.greenballMoveLeft(this.greenball3, 3);
			this.greenball3.statusLeft = false;
			this.greenball2.statusRight = false;
			this.greenball4.statusLeft = true;
			this.greenball3.statusRight = true;
		}
		if (this.greenball2.statusLeft) {
			this.greenballMoveLeft(this.greenball2, 2);
			this.greenball2.statusLeft = false;
			this.greenball1.statusRight = false;
			this.greenball3.statusLeft = true;
			this.greenball2.statusRight = true;
		}

		this.move = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (this.countCorrect == 0) {
					this.numberObj1.y -= 2;
					if (this.numberObj1.y < config.height/4-70) {
						this.move.remove();
					}
				}
				if (this.countCorrect == 1) {
					this.numberObj2.y -= 2;
					if (this.numberObj2.y < config.height/4-70) {
						this.move.remove();
					}
				}
				if (this.countCorrect == 2) {
					this.numberObj3.y -= 2;
					if (this.numberObj3.y < config.height/4-70) {
						this.move.remove();
					}
				}
				
			},
			loop: true
		})

		this.time.addEvent({
			delay: 1000,
			callback: () => {
				if (this.countCorrect == 0) {
					this.numberObj1.destroy();
				}
				if (this.countCorrect == 1) {
					this.numberObj1.destroy();
					this.numberObj2.destroy();
				}
				if (this.countCorrect == 2) {
					this.numberObj1.destroy();
					this.numberObj2.destroy();
					this.numberObj3.destroy();
				}				

				this.numberline.destroy();
				this.khoitao();
			},
			loop: false
		})
		
	}

	correctAnswer() {
		if (this.countCorrect == 0) this.numberObj1.setFrame(2);
		if (this.countCorrect == 1) this.numberObj2.setFrame(2);
		if (this.countCorrect == 2) this.numberObj3.setFrame(2);
		this.countCorrect++;
		status = "CORRECT";
		this.statusLabel.text = "STATUS: "+status;

		this.move = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (this.countCorrect == 1) {
					this.numberObj1.y += 15;
					if (this.numberObj1.y > config.height/2+190) {
						this.move.remove();
						this.numberObj1.disableInteractive();
						this.numberObj1.y = config.height/2+190;
						this.numberObj1.x = 227 + 50*(this.number - 1);

					}
				}
				if (this.countCorrect == 2) {
					this.numberObj2.y += 15;
					if (this.numberObj2.y > config.height/2+190) {
						this.move.remove();
						this.numberObj2.disableInteractive();
						this.numberObj2.y = config.height/2+190;
						this.numberObj2.x = 227 + 50*(this.number - 1);
					}
				}
				if (this.countCorrect == 3) {
					this.numberObj3.y += 15;
					if (this.numberObj3.y > config.height/2+190) {
						this.move.remove();
						this.numberObj3.disableInteractive();
						this.numberObj3.y = config.height/2+190;
						this.numberObj3.x = 227 + 50*(this.number - 1);
					}
				}
				
			},
			loop: true
		})

		if (this.countCorrect == 3) {
			
			if (this.greenball1.statusRight) {
				this.greenballMoveRight(this.greenball1, 1);
				this.greenball1.statusRight = false;
				this.greenball1.statusLeft = true;

				this.end = true;
				this.time.addEvent({
					delay: 3000,
					callback: () => {
						this.finishScreen = this.add.image(0, 30, "khungfinish");
						this.finishScreen.setOrigin(0, 0);
						this.buttonfinish = this.add.image(770, 500, "finishbutton").setInteractive({cursor: 'pointer'});
						this.buttonfinish.on('pointerdown', () => this.scene.start("screenMain"));
					}
				})
			}
			if (this.greenball2.statusRight) {
				this.greenballMoveRight(this.greenball2, 2);
				this.greenball2.statusRight = false;
				this.greenball2.statusLeft = true;
				this.greenball1.statusRight = true;
				this.greenball3.statusLeft = false;
			}
			if (this.greenball3.statusRight) {
				this.greenballMoveRight(this.greenball3, 3);
				this.greenball3.statusRight = false;
				this.greenball3.statusLeft = true;
				this.greenball2.statusRight = true;
				this.greenball4.statusLeft = false;
			}
			if (this.greenball4.statusRight) {
				this.greenballMoveRight(this.greenball4, 4);
				this.greenball4.statusRight = false;
				this.greenball4.statusLeft = true;
				this.greenball3.statusRight = true;
			}

			if (!this.end) {

				this.time.addEvent({
					delay: 1500,
					callback: () => {
						this.numberObj1.destroy();
						this.numberObj2.destroy();
						this.numberObj3.destroy();
						this.numberline.destroy();
						this.khoitao();
					},
					loop: false
				})
			}

		}
		else {
			this.time.addEvent({
				delay: 1000,
				callback: () => {
					this.randomNumber();
				},
				loop: false
			})	
		}

	}

	greenballMoveRight(ball, i){
		var run = this.time.addEvent({
			delay: 0,
			callback: () => { 
				if (i == 4 || i == 3) {
					if (ball.x > 992 - (4-i)*50) run.remove();
				}
				else if (i == 2) {
					if (ball.x > 900) run.remove();
				}
				else if (i == 1) {
					if (ball.x > 860) run.remove();
				}
				ball.x += 10;
			},
			loop: true
		})
	}

	greenballMoveLeft(ball, i){
		var run = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (i == 4) {
					if (ball.x < 550) run.remove();
				}
				else if (i == 3) {
					if (ball.x < 510) run.remove();
				}
				else if (i == 2) {
					if (ball.x < 460) run.remove();
				}
				
				ball.x -= 10;
			},
			loop: true
		})
	}


}