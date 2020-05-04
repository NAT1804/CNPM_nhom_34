/*jshint esversion: 6 */
class Scene6 extends Phaser.Scene {
	constructor(){
		super("screenPlay3");
	}

	create() {
		//background
		this.background = this.add.image(106, 30, "khungtrang");
		this.background.setOrigin(0, 0);
		//header
		this.add.text(300, 85, "Put the train cars from the greatest to the smallest", {
			color: '#000000',
			fontSize: '30px',
			stroke: '#000',
			strokeThickness: 3 
		});
		//back button
		this.backButton = this.add.sprite(155, 50, "buttonback").setInteractive({cursor: 'pointer'});
		this.backButton.on('pointerover', () => this.backButton.setFrame(1));
		this.backButton.on('pointerout', () => this.backButton.setFrame(0));
		this.backButton.on('pointerdown', () => this.scene.start("screenMain"));
		//bar
		this.bar = this.add.image(400, 30, "thanhbar").setScale(0.5);
		this.bar.setOrigin(0, 0);
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
		this.initSpeaker();
		// track
		//this.track1 = this.add.sprite(50, config.height*3/4, "duong-ray").setFrame(4);
		this.track2 = this.add.sprite(250, config.height*3/4, "duong-ray").setFrame(4);
		this.track3 = this.add.sprite(450, config.height*3/4, "duong-ray").setFrame(4);
		this.track4 = this.add.sprite(650, config.height*3/4, "duong-ray").setFrame(4);
		this.track5 = this.add.sprite(850, config.height*3/4 , "duong-ray").setFrame(4);
		this.track6 = this.add.sprite(1050, config.height*3/4, "duong-ray").setFrame(4);
		this.track7 = this.add.sprite(1250, config.height*3/4, "duong-ray").setFrame(4);
		//this.track8 = this.add.sprite(1450, config.height*3/4, "duong-ray").setFrame(4);
		//this.track1.setScale(0.4);
		this.track2.setScale(0.4);
		this.track3.setScale(0.4);
		this.track4.setScale(0.4);
		this.track5.setScale(0.4);
		this.track6.setScale(0.4);
		this.track7.setScale(0.4);
		//this.track8.setScale(0.4);
		//init
		this.initial();

		//
		this.time.addEvent({
			delay: 0,
			callback: () => {
				this.trainBody1.disableInteractive();
				this.trainBody2.disableInteractive();
				this.trainBody3.disableInteractive();
				this.trainBody4.disableInteractive();
				this.trainBody5.disableInteractive();
				this.speaker.disableInteractive();
			}
		});
		
		// start button
		this.time.addEvent({
			delay: 0,
			callback: () => {
				this.startBackground = this.add.image(106, 85, "start");
				this.startBackground.setOrigin(0, 0);
				this.startButton = this.add.sprite(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, "buttonstart").setInteractive({cursor: 'pointer'});
				this.startButton.on('pointerover', () => this.startButton.setFrame(1));
				this.startButton.on('pointerout', () => this.startButton.setFrame(0));
				this.startButton.on('pointerdown', () => {
					this.startBackground.destroy();
					this.startButton.destroy();
					this.trainBody1.setInteractive({cursor: 'pointer'});
					this.trainBody2.setInteractive({cursor: 'pointer'});
					this.trainBody3.setInteractive({cursor: 'pointer'});
					this.trainBody4.setInteractive({cursor: 'pointer'});
					this.trainBody5.setInteractive({cursor: 'pointer'});
					this.speaker.setInteractive({cursor: 'pointer'});
				});
			}
		});

		//drag object
		this.input.on('pointerdown', this.startDrag, this);
	}

	initial() {
		this.time.addEvent({
			delay: 0,
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
				this.number1 = Phaser.Math.Between(16, 19);
				this.number2 = Phaser.Math.Between(12, 15);
				this.number3 = Phaser.Math.Between(8, 11);
				this.number4 = Phaser.Math.Between(4, 7);
				this.number5 = Phaser.Math.Between(1, 3);
				// train body
				this.trainBody5 = this.add.image(Phaser.Math.Between(200, config.width-200), Phaser.Math.Between(200, config.height/2), "body-train" + this.number5).setInteractive({cursor:'pointer'});
				this.trainBody4 = this.add.image(Phaser.Math.Between(200, config.width-200), Phaser.Math.Between(200, config.height/2), "body-train" + this.number4).setInteractive({cursor:'pointer'});
				this.trainBody3 = this.add.image(Phaser.Math.Between(200, config.width-200), Phaser.Math.Between(200, config.height/2), "body-train" + this.number3).setInteractive({cursor:'pointer'});
				this.trainBody2 = this.add.image(Phaser.Math.Between(200, config.width-200), Phaser.Math.Between(200, config.height/2), "body-train" + this.number2).setInteractive({cursor:'pointer'});
				this.trainBody1 = this.add.image(Phaser.Math.Between(200, config.width-200), Phaser.Math.Between(200, config.height/2), "body-train" + this.number1).setInteractive({cursor:'pointer'});
				this.trainBody1.setScale(0.8);
				this.trainBody2.setScale(0.8);
				this.trainBody3.setScale(0.8);
				this.trainBody4.setScale(0.8);
				this.trainBody5.setScale(0.8);
				// status train body
				this.trainBody1.status = true;
				this.trainBody2.status = false;
				this.trainBody3.status = false;
				this.trainBody4.status = false;
				this.trainBody5.status = false;
				// train head
				this.trainHead20 = this.add.image(237, config.height*3/4 - 95, "head-train20");
				this.trainHead20.setScale(0.8);
				
				this.end = false;
			},
			loop: false
		});
	}

	initSpeaker() {
		this.speaker = this.add.image(200, 60, "loa").setScale(0.2);
		this.speaker.setOrigin(0, 0);
		this.speaker.setInteractive({cursor: 'pointer'});
		this.music = this.sound.add('sound3');
		this.speaker.on('pointerdown', () => {
			this.music.play();
			this.speaker.destroy();
			this.time.addEvent({
				delay: 3600,
				callback: () => {
					this.initSpeaker();
				}
			});
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
		this.input.off('pointermove', this.doDrag, this);
		this.input.off('pointerup', this.stopDrag, this);

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
											this.finishButton = this.add.sprite(770, 500, "finishbutton").setInteractive({cursor: 'pointer'});
											this.finishButton.on('pointerover', () => this.finishButton.setFrame(1));
											this.finishButton.on('pointerout', () => this.finishButton.setFrame(0));
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
			this.speaker = this.add.image(200 + 195*(numberOfTurn-1), 665, "loa").setScale(0.2);
			this.speaker.setOrigin(0, 0);
			this.speaker.setInteractive({cursor: 'pointer'});
			this.soundWrong = this.sound.add('sound4');
			this.speaker.on('pointerdown', () => {
				this.soundWrong.play();
				this.speaker.destroy();
				this.imageWrong.destroy();
			});
			if (this.count < 1) this.count+=2;
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

			var objectTurnBack = this.time.addEvent({
				delay: 1000,
				callback: () => {
					this.dragObject.y -= 100;
					
				},
				loop: false
			});

			var deleteNotification = this.time.addEvent({
				delay: 2000,
				callback: () => {
					track.setFrame(0);
					this.imageWrong.destroy();
					this.speaker.destroy();
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
				this.trainHead20.x -= 5;
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
		this.trainHead20.destroy();
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
			callback: function () {
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