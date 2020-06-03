/*jshint esversion: 6 */
class Scene3 extends Phaser.Scene {
	constructor(){
		super("screenPlay3");
	}

	preload() {
		// module 1 and module 3
		for (var i=1; i<=20; i++) {
			this.load.image("body-train"+i, "../assets/images/body-train"+i+".png");
		}

		this.load.image("head-train0", "../assets/images/head-train0.png");
		this.load.image("head-train20", "../assets/images/head-train20.png");

		for (var j=1; j<=20; j++) {
			this.load.image("body-train"+j, "../assets/images/body-train"+j+".png");
		}

		this.load.spritesheet("duong-ray", "../assets/images/duong-ray.png",{
			frameWidth: 570,
			frameHeight: 93
		});
		
		this.load.spritesheet("buttonback", "../assets/images/buttonback.png", {
			frameWidth: 60,
			frameHeight: 13
		});
		this.load.spritesheet("buttonstart", "../assets/images/buttonstart.png", {
			frameWidth: 74,
			frameHeight: 24
		});
	}

	create() {
		// background
        var grad = this.add.image(0, 0, 'grad').setOrigin(0, 0).setScale(3.0);

        for (let i=0; i<8; ++i) {
            for (let j=0; j<8; ++j) {
                var stuff = this.add.image(250*j, 150*i, 'stuff').setOrigin(0, 0);
            }
        }
        for (let i=0; i<30; ++i) {
            for (let j=0; j<16; ++j) {
                var cell = this.add.image(50*j, 50*i, 'cell').setOrigin(0, 0);
            }
        }
        for (let i=0; i<2; ++i) {
            for (let j=0; j<2; ++j) {
                var color = this.add.image(0+1000*j, 0+1000*i, 'color').setOrigin(0, 0);
            }
        }

		//box
		this.box = this.add.image(90, 30, "khungtrang");
		this.box.setOrigin(0, 0);
		//header
		this.add.text(284, 85, "Put the train cars from the greatest to the smallest", {
			color: '#000000',
			fontSize: '30px',
			stroke: '#000',
			strokeThickness: 3 
		});
		//back button
		this.backButton = this.add.sprite(140, 50, "buttonback").setInteractive({cursor: 'pointer'});
		this.backButton.on('pointerover', () => this.backButton.setFrame(1));
		this.backButton.on('pointerout', () => this.backButton.setFrame(0));
		this.backButton.on('pointerdown', () => this.scene.start("screenMain"));
		//bar
		this.bar = this.add.image(384, 33, "thanhbar").setScale(0.5);
		this.bar.setOrigin(0, 0);
		this.greenBall1 = this.add.image(386, 36, "greenball").setScale(0.5);
		this.greenBall1.setOrigin(0, 0);
		this.greenBall2 = this.add.image(430, 36, "greenball").setScale(0.5);
		this.greenBall2.setOrigin(0, 0);
		this.greenBall3 = this.add.image(474, 36, "greenball").setScale(0.5);
		this.greenBall3.setOrigin(0, 0);
		this.greenBall4 = this.add.image(518, 36, "greenball").setScale(0.5);
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
		this.track1 = this.add.sprite(250, DEFAULT_HEIGHT*3/4, "duong-ray").setFrame(4);
		this.track2 = this.add.sprite(450, DEFAULT_HEIGHT*3/4, "duong-ray").setFrame(4);
		this.track3 = this.add.sprite(650, DEFAULT_HEIGHT*3/4, "duong-ray").setFrame(4);
		this.track4 = this.add.sprite(850, DEFAULT_HEIGHT*3/4 , "duong-ray").setFrame(4);
		this.track5 = this.add.sprite(1050, DEFAULT_HEIGHT*3/4, "duong-ray").setFrame(4);
		this.track6 = this.add.sprite(1250, DEFAULT_HEIGHT*3/4, "duong-ray").setFrame(4);
		
		this.track1.setScale(0.4);
		this.track2.setScale(0.4);
		this.track3.setScale(0.4);
		this.track4.setScale(0.4);
		this.track5.setScale(0.4);
		this.track6.setScale(0.4);

		//init
		this.initial();

		//disable interactive object
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
				this.startBackground = this.add.image(90, 85, "start"); // 90 và 85 là vị trí của nút bắt đầu
				this.startBackground.setOrigin(0, 0);
				this.startButton = this.add.sprite(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, "startlabel").setInteractive({cursor: 'pointer'}).setFrame(1);
				this.startButton.on('pointerover', () => this.startButton.setFrame(0));
				this.startButton.on('pointerout', () => this.startButton.setFrame(1));
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
				this.track2.setFrame(0);
				this.track3.setFrame(3);
				this.track4.setFrame(3);
				this.track5.setFrame(3);
				this.track6.setFrame(3);
				// status track
				this.track2.status = true;
				this.track3.status = false;
				this.track4.status = false;
				this.track5.status = false;
				this.track6.status = false;

				// number of train body
				this.number1 = Phaser.Math.Between(16, 19);
				this.number2 = Phaser.Math.Between(12, 15);
				this.number3 = Phaser.Math.Between(8, 11);
				this.number4 = Phaser.Math.Between(4, 7);
				this.number5 = Phaser.Math.Between(1, 3);
				// train body
				this.trainBody5 = this.add.image(Phaser.Math.Between(414, 626), Phaser.Math.Between(200, 220), "body-train" + this.number5).setInteractive({cursor:'pointer'});
				this.trainBody4 = this.add.image(Phaser.Math.Between(626, 838), Phaser.Math.Between(400, DEFAULT_HEIGHT/2+30), "body-train" + this.number4).setInteractive({cursor:'pointer'});
				this.trainBody3 = this.add.image(Phaser.Math.Between(838, 1050), Phaser.Math.Between(200, 220), "body-train" + this.number3).setInteractive({cursor:'pointer'});
				this.trainBody2 = this.add.image(Phaser.Math.Between(1050, 1262), Phaser.Math.Between(400, DEFAULT_HEIGHT/2+30), "body-train" + this.number2).setInteractive({cursor:'pointer'});
				this.trainBody1 = this.add.image(Phaser.Math.Between(202, 414), Phaser.Math.Between(400, DEFAULT_HEIGHT/2+30), "body-train" + this.number1).setInteractive({cursor:'pointer'});
				this.trainBody1.setScale(0.8);
				this.trainBody2.setScale(0.8);
				this.trainBody3.setScale(0.8);
				this.trainBody4.setScale(0.8);
				this.trainBody5.setScale(0.8);
				
				// train head
				this.trainHead20 = this.add.image(237, DEFAULT_HEIGHT*3/4 - 95, "head-train20");
				this.trainHead20.setScale(0.8);
				//background bonus
				this.backgroundBonus = this.add.image(0, 360, "backgroundBonus").setOrigin(0, 0).setScale(0.78);
				
				this.end = false;
			},
			loop: false
		});
	}

	initSpeaker() {
		this.speaker = this.add.image(230, 85, "loa").setScale(0.1);
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
			if (this.track2.status == true) {
				if (this.dragObject.x > 350 && this.dragObject.x <= 550 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3) {
					this.track2.setFrame(2);
				} 
				else {
					this.track2.setFrame(0);
				}
			}
			// position 2
			if (this.track3.status == true) {
				if (this.dragObject.x > 550 && this.dragObject.x <= 725 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3) {
					this.track3.setFrame(2);
				}
				else {
					this.track3.setFrame(0);
				}				
			}
			// position 3
			if (this.track4.status == true) {
				if (this.dragObject.x > 725 && this.dragObject.x <= 940 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3) {
					this.track4.setFrame(2);
				}
				else {
					this.track4.setFrame(0);
				}	
			}
			// position 4
			if (this.track5.status == true) {
				if (this.dragObject.x > 940 && this.dragObject.x <= 1120 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3) {
					this.track5.setFrame(2);
				}
				else{
					this.track5.setFrame(0);
				}	
			}
			// position 5
			if (this.track6.status == true) {
				if (this.dragObject.x > 1120 && this.dragObject.x <= 1320 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3) {
					this.track6.setFrame(2);
				}
				else {
					this.track6.setFrame(0);
				}
			}
			
		}
	}

	checkResult() {
		if (this.dragObject != null) {
			// position 1
			if (this.dragObject.x > 350 && this.dragObject.x <= 550 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3 && this.track2.status == true) {
				this.checkTurn(1, this.trainBody1, this.trainBody2, this.track2, this.track3, this.greenBall4, this.greenBall3, this.greenBall2, this.greenBall1);
			}
			// position 2
			if (this.dragObject.x > 550 && this.dragObject.x <= 725 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3 && this.track3.status == true) {
				this.checkTurn(2, this.trainBody2, this.trainBody3, this.track3, this.track4, this.greenBall4, this.greenBall3, this.greenBall2, this.greenBall1);
			}
			// position 3
			if (this.dragObject.x > 725 && this.dragObject.x <= 940 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3 && this.track4.status == true) {
				this.checkTurn(3, this.trainBody3, this.trainBody4, this.track4, this.track5, this.greenBall4, this.greenBall3, this.greenBall2, this.greenBall1);
			}
			// position 4
			if (this.dragObject.x > 940 && this.dragObject.x <= 1120 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3 && this.track5.status == true) {
				this.checkTurn(4, this.trainBody4, this.trainBody5, this.track5, this.track6, this.greenBall4, this.greenBall3, this.greenBall2, this.greenBall1);
			}
			// position 5
			if (this.dragObject.x > 1120 && this.dragObject.x <= 1320 && this.dragObject.y > DEFAULT_HEIGHT/2+50 && this.dragObject.y < DEFAULT_HEIGHT/4*3 && this.track6.status == true) {
				if (this.dragObject == this.trainBody5) {
					if (this.count > 0) this.count --;
					this.checkFalse = true;
					this.track6.setFrame(0);
					this.trainBody5.x = 1210; // vị trí của toa tàu cuối cùng vào đúng vị trí
					this.trainBody5.y = 495;
					this.trainBody5.disableInteractive();
					this.track6.status = false;
					this.explosion = this.add.sprite(140, DEFAULT_HEIGHT*3/4-150,"explosion").setScale(2.5);
					this.explosion.play('explode');
					this.time.addEvent({
						delay: 1000,
						callback: () => {
							this.track3.setFrame(4);
							this.track4.setFrame(4);
							this.track5.setFrame(4);
							this.track6.setFrame(4);
							this.track2.setFrame(4);
							if (this.count == 0) {
								
								if (this.greenBall1.statusRight == true)  {

									this.greenBallMoveRight(this.greenBall1, 1);
									this.greenBall1.statusRight = false;
									this.end = true;
									this.time.addEvent({
										delay: 5000,
										callback: () => {
											this.scene.start("screenFinish");
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
				}
			}

		}
	}

	checkTurn(numberOfTurn, trainBody, trainBody2, track, track2, greenBall4, greenBall3, greenBall2, greenBall1) {
		if (this.dragObject == trainBody) {
			track.setFrame(0);
			trainBody.x = 430 + 195*(numberOfTurn-1); // vị trí của toa tàu khi vào đúng đường ray
			trainBody.y = 495;
			trainBody.disableInteractive();
			track2.setFrame(0);
			track.status = false;
			track2.status = true;
		} else {
			this.imageWrong = this.add.image(430 + 195*(numberOfTurn-1), 700, "imagewrong"); // vị trí của thông báo đặt toa tàu sai vị trí
			this.speaker = this.add.image(200 + 195*(numberOfTurn-1), 665, "loa").setScale(0.2); // hình ảnh của loa khi toa tàu đặt sai vị trí
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
			this.dragObject.x = 430 + 195*(numberOfTurn-1); // vị trí của toa tàu khi vào đúng khu vực của đường ray
			this.dragObject.y = 495;

			var objectTurnBack = this.time.addEvent({
				delay: 1000,
				callback: () => {
					this.dragObject.y -= 100; // toa tàu bị dịch chuyển lên khi sai vị trí đường ray
					
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
				this.trainHead20.x -= 5; // 5 la van toc di chuyen
				this.trainBody1.x -= 5; // 5 la van toc di chuyen
				this.trainBody2.x -= 5; // 5 la van toc di chuyen
				this.trainBody3.x -= 5; // 5 la van toc di chuyen
				this.trainBody4.x -= 5; // 5 la van toc di chuyen
				this.trainBody5.x -= 5; // 5 la van toc di chuyen
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
					if (ball.x > 976 - (4-i)*50) run.remove(); // giới hạn dừng lại của quả bóng xanh
				}
				else if (i == 2) {
					if (ball.x > 884) run.remove(); // giới hạn dừng lại của quả bóng xanh
				}
				else if (i == 1) {
					if (ball.x > 844) run.remove(); // giới hạn dừng lại của quả bóng xanh
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
					if (ball.x < 534) run.remove(); // giới hạn dừng lại của quả bóng xanh
				}
				else if (i == 3) {
					if (ball.x < 494) run.remove(); // giới hạn dừng lại của quả bóng xanh
				}
				else if (i == 2) {
					if (ball.x < 444) run.remove(); // giới hạn dừng lại của quả bóng xanh
				}
				
				ball.x -= 10;
			},
			loop: true
		});
	}

}