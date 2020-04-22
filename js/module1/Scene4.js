// jshint esversion: 6
class Scene4 extends Phaser.Scene {
	constructor(){
		super("screenPlay2");
	}

	create() {
		//background
		this.background = this.add.image(0, 30, "khungtrang");
		this.background.setOrigin(0, 0);
		//header
		this.add.text(300, 85, "Order the train cars from the smaller to the greater", {
			color: '#000000',
			fontSize: '30px',
			stroke: '#000',
			strokeThickness: 3 
		});
		//back button
		this.backButton = this.add.sprite(40, 50, "buttonback").setInteractive({cursor: 'pointer'});
		this.backButton.on('pointerover', () => this.backButton.setFrame(1));
		this.backButton.on('pointerout', () => this.backButton.setFrame(0));
		this.backButton.on('pointerdown', () => this.scene.start("screenMain"));
		//bar
		this.thanhbar = this.add.image(400, 30, "thanhbar").setScale(0.5);
		this.thanhbar.setOrigin(0, 0);
		//green ball
		this.greenBall1 = this.add.image(402, 33 , "greenball").setScale(0.5);
		this.greenBall1.setOrigin(0, 0);
		this.greenBall2 = this.add.image(446, 33 , "greenball").setScale(0.5);
		this.greenBall2.setOrigin(0, 0);
		this.greenBall3 = this.add.image(490, 33 , "greenball").setScale(0.5);
		this.greenBall3.setOrigin(0, 0);
		this.greenBall4 = this.add.image(534, 33 , "greenball").setScale(0.5);
		this.greenBall4.setOrigin(0, 0);
		// status green ball
		this.greenBall4.statusRight = true;
		this.greenBall3.statusRight = false;
		this.greenBall2.statusRight = false;
		this.greenBall1.statusRight = false;
		this.greenBall4.statusLeft = false;
		this.greenBall3.statusLeft = false;
		this.greenBall2.statusLeft = false;
		this.greenBall1.statusLeft = false;
		// sound
		this.speaker = this.add.image(200, 60, "loa").setScale(0.2);
		this.speaker.setOrigin(0, 0);
		this.speaker.setInteractive({cursor: 'pointer'});
		this.music = this.sound.add('sound');
		this.speaker.on('pointerdown', () => this.music.play());
		// track
		this.track1 = this.add.sprite(50, config.height*3/4, "duong-ray").setFrame(4);
		this.track2 = this.add.sprite(250, config.height*3/4, "duong-ray").setFrame(4);
		this.track3 = this.add.sprite(450, config.height*3/4, "duong-ray").setFrame(4);
		this.track4 = this.add.sprite(650, config.height*3/4, "duong-ray").setFrame(4);
		this.track5 = this.add.sprite(850, config.height*3/4 , "duong-ray").setFrame(4);
		this.track6 = this.add.sprite(1050, config.height*3/4, "duong-ray").setFrame(4);
		this.track7 = this.add.sprite(1250, config.height*3/4, "duong-ray").setFrame(4);
		this.track8 = this.add.sprite(1450, config.height*3/4, "duong-ray").setFrame(4);
		//init
		this.initial();
		// track image
		this.track1.setScale(0.4);
		this.track2.setScale(0.4);
		this.track3.setScale(0.4);
		this.track4.setScale(0.4);
		this.track5.setScale(0.4);
		this.track6.setScale(0.4);
		this.track7.setScale(0.4);
		this.track8.setScale(0.4);
		// drag object
		this.input.on('pointerdown', this.startDrag, this);
		
	}

	initial() {
		this.time.addEvent({
			delay: 1000,
			callback: () => {
				// The number of turns it takes for a green ball to run to the right
				this.count = 0;
				// if checkFalse = true green ball can run to the left else green ball can't run to the left
				this.checkFalse = true;
				// track 
				this.track3.setFrame(0);
				this.track4.setFrame(3);
				this.track5.setFrame(3);
				this.track6.setFrame(3);
				this.track7.setFrame(3);
				// number of train body
				this.number1 = Phaser.Math.Between(1, 4);
				this.number2 = Phaser.Math.Between(5, 8);
				this.number3 = Phaser.Math.Between(9, 12);
				this.number4 = Phaser.Math.Between(13, 16);
				this.number5 = Phaser.Math.Between(17, 20);
				// train body
				this.trainBody5 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number5).setInteractive({cursor:'pointer'});
				this.trainBody4 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number4).setInteractive({cursor:'pointer'});
				this.trainBody3 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number3).setInteractive({cursor:'pointer'});
				this.trainBody2 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number2).setInteractive({cursor:'pointer'});
				this.trainBody1 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number1).setInteractive({cursor:'pointer'});
				this.trainBody1.setScale(0.8);
				this.trainBody2.setScale(0.8);
				this.trainBody3.setScale(0.8);
				this.trainBody4.setScale(0.8);
				this.trainBody5.setScale(0.8);
				//status train body
				this.trainBody1.status = true;
				this.trainBody2.status = false;
				this.trainBody3.status = false;
				this.trainBody4.status = false;
				this.trainBody5.status = false;
				//train head
				this.trainHead0 = this.add.image(210, config.height*3/4 - 95, "head-train0");
				this.trainHead0.setScale(0.8);
				
				this.end = false;
			},
			loop: false
		});
	}

	startDrag(pointer, targets) {
		this.input.off('pointerdown', this.startDrag, this);
		this.dragObject = targets[0];
		this.input.on('pointermove', this.doDrag, this);
		this.input.on('pointerup', this.stopDrag, this);
	}

	doDrag(pointer) {
		if (this.dragObject != null) {
			this.dragObject.x = pointer.x;
			this.dragObject.y = pointer.y;
		}
		this.changeColor();
	}

	stopDrag() {
		this.input.on('pointerdown', this.startDrag, this);
		this.input.off('pointermove', this.doObject, this);
		this.input.off('pointerup', this.stopObject, this);

		this.checkResult();
	}

	changeColor() {
		if (this.dragObject != null) {
			// position 1
			if (this.trainBody1.status == true) {
				if (this.dragObject.x > 350 && this.dragObject.x <= 550 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.track3.setFrame(2);
				} 
				else {
					this.track3.setFrame(0);
				}
			}
			// position 2
			if (this.trainBody2.status == true) {
				if (this.dragObject.x > 550 && this.dragObject.x <= 725 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.track4.setFrame(2);
				}
				else {
					this.track4.setFrame(0);
				}				
			}
			// position 3
			if (this.trainBody3.status == true) {
				if (this.dragObject.x > 725 && this.dragObject.x <= 940 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.track5.setFrame(2);
				}
				else {
					this.track5.setFrame(0);
				}	
			}
			// position 4
			if (this.trainBody4.status == true) {
				if (this.dragObject.x > 940 && this.dragObject.x <= 1120 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.track6.setFrame(2);
				}
				else{
					this.track6.setFrame(0);
				}	
			}
			// position 5
			if (this.trainBody5.status == true) {
				if (this.dragObject.x > 1120 && this.dragObject.x <= 1320 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.track7.setFrame(2);
				}
				else {
					this.track7.setFrame(0);
				}
			}
			
		}
	}

	checkResult() {
		if (this.dragObject != null) {
			// position 1
			if (this.dragObject.x > 350 && this.dragObject.x <= 550 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3 && this.trainBody1.status == true) {
				
				this.checkTurn(1, this.trainBody1, this.trainBody2, this.track3, this.track4, this.greenBall4, this.greenBall3, this.greenBall2, this.greenBall1);
				
			}
			// position 2
			if (this.dragObject.x > 550 && this.dragObject.x <= 725 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3 && this.trainBody2.status == true) {
				
				this.checkTurn(2, this.trainBody2, this.trainBody3, this.track4, this.track5, this.greenBall4, this.greenBall3, this.greenBall2, this.greenBall1);

			}
			// position 3
			if (this.dragObject.x > 725 && this.dragObject.x <= 940 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3 && this.trainBody3.status == true) {
				
				this.checkTurn(3, this.trainBody3, this.trainBody4, this.track5, this.track6, this.greenBall4, this.greenBall3, this.greenBall2, this.greenBall1);

			}
			// position 4
			if (this.dragObject.x > 940 && this.dragObject.x <= 1120 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3 && this.trainBody4.status == true) {

				this.checkTurn(4, this.trainBody4, this.trainBody5, this.track6, this.track7, this.greenBall4, this.greenBall3, this.greenBall2, this.greenBall1);

			}
			// position 5
			if (this.dragObject.x > 1120 && this.dragObject.x <= 1320 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3 && this.trainBody5.status == true) {
				if (this.dragObject == this.trainBody5) {
					if (this.count > 0) this.count --;
					this.checkFalse = true;
					this.track7.setFrame(0);
					this.trainBody5.x = 1210;
					this.trainBody5.y = 495;
					this.trainBody5.disableInteractive();
					this.trainBody5.status = false;
					this.explosion = this.add.sprite(120, config.height*3/4-150,"explosion").setScale(2.5);
					this.explosion.play('explode');
					this.time.addEvent({
						delay: 1000,
						callback: () => {
							this.track3.setFrame(4);
							this.track4.setFrame(4);
							this.track5.setFrame(4);
							this.track6.setFrame(4);
							this.track7.setFrame(4);
							if (this.count == 0) {
								if (this.greenBall1.statusRight == true)  {
									this.greenBallMoveRight(this.greenBall1, 1);
									this.greenBall1.statusRight = false;
									this.end = true;
									this.time.addEvent({
										delay: 5000,
										callback: () => {
											this.finishScreen = this.add.image(0, 30, "khungfinish");
											this.finishScreen.setOrigin(0, 0);
											this.finishButton = this.add.image(770, 500, "finishbutton").setInteractive({cursor: 'pointer'});
											this.finishButton.on('pointerdown', () => this.scene.start("screenMain"));
										}
									});
									
								}	
								if (this.greenBall2.statusRight == true)  {
									this.greenBallMoveRight(this.greenBall2, 2);
									this.greenBall1.statusRight = true;
									this.greenBall1.statusLeft = false;
									this.greenBall2.statusRight = false;
									this.greenBall2.statusLeft = true;
									this.greenBall3.statusLeft = false;
								}	
								if (this.greenBall3.statusRight == true)  {
									this.greenBallMoveRight(this.greenBall3, 3);
									this.greenBall2.statusRight = true;
									this.greenBall2.statusLeft = false;
									this.greenBall3.statusRight = false;
									this.greenBall3.statusLeft = true;
									this.greenBall4.statusLeft = false;			
								}
								if (this.greenBall4.statusRight == true)  {
									this.greenBallMoveRight(this.greenBall4, 4);
									this.greenBall3.statusRight = true;
									this.greenBall3.statusLeft = false;
									this.greenBall4.statusRight = false;
									this.greenBall4.statusLeft = true;
									
								}

							}
							this.trainMove();
							
						},
						loop: false
					});					
				} else {
					this.track7.setFrame(1);
					this.dragObject.x = 1210;
					this.dragObject.y = 495;
					this.time.addEvent({
						delay: 1000,
						callback: () => {
							this.dragObject.y -= 100;
							this.track7.setFrame(0);
						},
						loop: false
					});
				}
			}

		}
	}

	checkTurn(numberOfTurn, trainBody, trainBody2, track, track2, greenBall4, greenBall3, greenBall2, greenBall1) {
		if (this.dragObject == trainBody) {
					track.setFrame(0);
					trainBody.x = 430 + 195*(numberOfTurn-1);
					trainBody.y = 495;
					trainBody.disableInteractive();
					track2.setFrame(0);
					trainBody.status = false;
					trainBody2.status = true;
		} else {
			this.imageWrong = this.add.image(430 + 195*(numberOfTurn-1), 700, "imagewrong");
			if (this.count == 0) this.count+=2;
			if (this.checkFalse == true) {
				if (greenBall4.statusLeft == true) {
					this.greenBallMoveLeft(greenBall4, 4);
					greenBall4.statusLeft = false;
					greenBall4.statusRight = true;
					greenBall3.statusRight = false;
				}
				if (greenBall3.statusLeft == true) {
					this.greenBallMoveLeft(greenBall3, 3);
					greenBall3.statusLeft = false;
					greenBall3.statusRight = true;
					greenBall2.statusRight = false;
				}
				if (greenBall2.statusLeft == true) {
					this.greenBallMoveLeft(greenBall2, 2);
					greenBall2.statusLeft = false;
					greenBall2.statusRight = true;
					greenBall1.statusRight = false;
				}
				if (greenBall1.statusLeft == true) {
					this.greenBallMoveLeft(greenBall1, 1);
					greenBall1.statusLeft = false;
					greenBall1.statusRight = true;
				}
				this.checkFalse = false;
			}
			track.setFrame(1);
			this.dragObject.x = 430 + 195*(numberOfTurn-1);
			this.dragObject.y = 495;
			this.time.addEvent({
				delay: 1000,
				callback: () => {
					this.dragObject.y -= 100;
					track.setFrame(0);
					this.imageWrong.destroy();
				},
				loop: false
			});
		}
	}

	trainMove() {
		var move = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (this.trainBody5.x < -100) {
					move.remove();
					this.stopTrain();
				}
				this.trainHead0.x -= 5;
				this.trainBody1.x -= 5;
				this.trainBody2.x -= 5;
				this.trainBody3.x -= 5;
				this.trainBody4.x -= 5;
				this.trainBody5.x -= 5;
			},
			loop: true
		});
	}

	stopTrain() {
		this.trainHead0.destroy();
		this.trainBody1.destroy();
		this.trainBody2.destroy();
		this.trainBody3.destroy();
		this.trainBody4.destroy();
		this.trainBody5.destroy();
		if(this.end == false) this.initial();
	}

	greenBallMoveRight(ball, i){
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
		});
	}

	greenBallMoveLeft(ball, i){
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
		});
	}

}