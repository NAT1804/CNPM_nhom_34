// jshint esversion: 6

var arrayBody;
var arrayCircle;
var arrayNumber;
var arrContainer;
var containerHead;
var posXContainer;
var posYContainer;
var numberOfContainer = 5;
var numberOfGreenBall = 5;

class Scene1 extends Phaser.Scene {
	constructor(){
		super('screenPlay1');
	}

	create() {
		// background
		var grad = this.add.image(0, 0, 'grad').setOrigin(0, 0).setScale(3.5);

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
		this.box = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY-75, "mainBox");
		
		// back button
		this.backButton = this.add.text(DEFAULT_WIDTH/4-50, 23, '< Back', {
			fontFamily: 'Noto Sans',
			color: '#5280b7',
			fontSize: '18px'
		}).setInteractive({cursor: 'pointer'});
		var color1 = '#83d5d4';
		var color2 = '#5280b7';
		this.backButton.on('pointerover', () => { this.backButton.setColor(color1); });
		this.backButton.on('pointerout', () => { this.backButton.setColor(color2); });
		this.backButton.on('pointerdown', () => { 
			this.scene.start('screenMain');
		});

		// bar
		this.bar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY-356, 'bar');

		// green ball
		var posXGreenBall1 = DEFAULT_WIDTH/3+10;
		var posYGreenBall = 21;
		this.arrayGreenBall = new Array('greenBall');
		for (let i=0; i<numberOfGreenBall; ++i) {
			this.arrayGreenBall[i] = this.add.image(posXGreenBall1 += 23, posYGreenBall, 'greenBall').setOrigin(0, 0);
		}

		// status green ball
		for (let i=0; i<numberOfGreenBall; ++i) {
			this.arrayGreenBall[i].statusRight = false;
			this.arrayGreenBall[i].statusLeft = false;
			if (i == numberOfContainer-1) this.arrayGreenBall[i].statusRight = true;
		}

		// language
		this.language = this.add.text(DEFAULT_WIDTH*3/4, 23, 'English', {
			fontFamily: 'Noto Sans',
			color: '#5280b7',
			fontSize: '18px'
		});
		this.language.on('pointerover', () => { this.language.setColor(color1); }).setInteractive({cursor: 'pointer'});
		this.language.on('pointerout', () => { this.language.setColor(color2); }).setInteractive({cursor: 'pointer'});
		
		// sound
		this.initSpeaker();

		// init
		this.initial();

		// drag object
		this.input.on('pointerdown', this.startDrag, this);

		// explosion animation 
		this.anims.create({
			key: "explode",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 5, // 5 frames per second
			repeat: 0,
			hideOnComplete: true
		});
		
		//disable interactive object
		this.time.addEvent({
			delay: 0,
			callback: () => {
				for (let i=0; i<numberOfContainer; ++i) {
					arrContainer[i].disableInteractive();
				}
				this.speaker.disableInteractive();
			}
		});

		// start button
		this.time.addEvent({
			delay: 0,
			
			callback: () => {
				var graphics = this.add.graphics();
				graphics.fillStyle(0xfdf8fc, 0.7);
				graphics.fillCircle(this.cameras.main.centerX, this.cameras.main.centerY-90, 160);
				graphics.fillStyle(0xf8e5f5, 0.7);
				graphics.fillCircle(this.cameras.main.centerX, this.cameras.main.centerY-90, 120);

				this.startButton = this.add.sprite(this.cameras.main.centerX+20, this.cameras.main.centerY-90, 'start').setInteractive({
					cursor: 'pointer',
					hitArea: new Phaser.Geom.Circle(0, 0, 160),
					hitAreaCallback: Phaser.Geom.Circle.Contains
				});
				this.textStart = this.add.text(this.cameras.main.centerX-20, this.cameras.main.centerY-100, 'start', {
					fontFamily: 'PT Sans',
					color: '#ffffff',
					fontSize: '20px'
				});
				
		
				this.startButton.on('pointerover', () => {
					graphics.clear();
					this.startButton.setFrame(1);
					graphics.fillStyle(0xfdf8fc, 0.7);
					graphics.fillCircle(this.cameras.main.centerX, this.cameras.main.centerY-90, 170);
					graphics.fillStyle(0xf8e5f5, 0.7);
					graphics.fillCircle(this.cameras.main.centerX, this.cameras.main.centerY-90, 130);
				});
				this.startButton.on('pointerout', () => {
					graphics.clear();
					this.startButton.setFrame(0);
					graphics.fillStyle(0xfdf8fc, 0.7);
					graphics.fillCircle(this.cameras.main.centerX, this.cameras.main.centerY-90, 160);
					graphics.fillStyle(0xf8e5f5, 0.7);
					graphics.fillCircle(this.cameras.main.centerX, this.cameras.main.centerY-90, 120);
				});
				this.startButton.on('pointerdown', () => {
					graphics.clear();
					this.textStart.destroy();
					this.startButton.destroy();
					for (let i=0; i<5; ++i) {
						arrContainer[i].setInteractive(new Phaser.Geom.Circle(30, 50, 60), Phaser.Geom.Circle.Contains);
					}
					this.speaker.setInteractive({cursor: 'pointer'});
					this.music = this.sound.add('sound1');
					this.speaker.on('pointerover', () => this.speaker.setFrame(1));
					this.speaker.on('pointerout', () => this.speaker.setFrame(0));
					this.speaker.on('pointerdown', () => {
						this.music.play();
					});
				});
			}
		});
		
	}

	initial() {
		this.time.addEvent({
			delay: 0,
			callback: () => {
				//header
				this.header = this.add.text( DEFAULT_WIDTH/3+10, 72, "Order the train cars from the smaller", { 
					color: '#000000',
					fontSize: '32px',
					fontFamily: 'PT Sans'
				});
				this.header2 = this.add.text( DEFAULT_WIDTH/2.5+50, 120, "to the greater", {
					color: '#000000',
					fontSize: '32px',
					fontFamily: 'PT Sans'
				});
				// The number of turns it takes for a green ball to run to the right
				this.count = 0;
				// if checkFalse = true green ball can run to the left else green ball can't run to the left
				this.checkFalse = true;
				
				//track
				this.track1 = this.add.image(this.cameras.main.centerX-180, this.cameras.main.centerY+120, 'track');
				this.track2 = this.add.image(this.cameras.main.centerX+180, this.cameras.main.centerY+120, 'track');

				// color track 
				var posXColorTrack = DEFAULT_WIDTH/40*11;
				var posYColorTrack = 488;
				this.arrayColorTrack = new Array('colortrack');
				for (let i=0; i<numberOfContainer; ++i) {
					this.arrayColorTrack[i] = this.add.sprite(posXColorTrack += 127, posYColorTrack, 'colortrack').setOrigin(0, 0);
				}
				this.arrayColorTrack[0].setFrame(0);
				for (let i=1; i<numberOfContainer; ++i) {
					this.arrayColorTrack[i].setFrame(2);
				}

				//status color track
				/*
				trạng thái của các đường ray
				nếu là true thì đường ray hiện tại cần được thêm toa tàu 
				false thì ngược lại
				*/
				this.arrayColorTrack[0].status = true;
				for (let i=1; i<numberOfContainer; ++i) {
					this.arrayColorTrack[i].status = false;
				}

				// train body
				/*
				phan hard code bên dưới là khoảng vị trí ngẫu nhiên mà các toa tàu sẽ xuất hiện
				*/
				arrayBody = new Array('body');
				for (let i=0; i<numberOfContainer; ++i) {
					arrayBody[i] = this.add.image(20, 82, 'body');
				}

				// elip of train body
				arrayCircle = new Array('circle');
				for (let i=0; i<numberOfContainer; ++i) {
					arrayCircle[i] = this.add.image(20, 22, 'circle');
				}
			
				// number of train body
				arrayNumber = [];
				
				for (let i=0; i<numberOfContainer; ++i) {
					this.number = Phaser.Math.Between(1+4*i, 4+4*i);
					if (this.number >= 10) {
						arrayNumber[i] = this.add.text(0, 0, this.number, {
							color: '#000000',
							fontSize: '39px',
							fontFamily: 'PT Sans'
						});
					} else {
						arrayNumber[i] = this.add.text(10, 0, this.number, {
							color: '#000000',
							fontSize: '39px',
							fontFamily: 'PT Sans'
						});
					}
					
				}

				// container
				//posXContainer = [330, 510, 690, 870, 1050];
				posXContainer = [DEFAULT_WIDTH/4 + 180*3, DEFAULT_WIDTH/4 + 180, DEFAULT_WIDTH/4, DEFAULT_WIDTH/4 + 180*2, DEFAULT_WIDTH/4 + 180*4];
				posYContainer = [275, 275, 162, 162, 162];
				arrContainer = new Array();
				for (let i=numberOfContainer-1; i>=0; --i) {
					arrContainer[i] = this.add.container(posXContainer[i], posYContainer[i], [arrayBody[i], arrayCircle[i], arrayNumber[i]] );
					arrContainer[i].setInteractive(new Phaser.Geom.Circle(30, 50, 60), Phaser.Geom.Circle.Contains); 
					this.input.setDraggable(arrContainer[i]);
				}
				
				//train head
				var head = this.add.image(-8, 85, 'head');
				var circle1 = this.add.image(10, 22, 'circle1');
				var headNumber = this.add.text(0, 0, '0', {
					color: '#000000',
					fontSize: '45px',
					fontFamily: 'PT Sans'
				});
				containerHead = this.add.container(DEFAULT_WIDTH/40*13, 387, [head, circle1, headNumber]);

				this.end = false;
			},
			loop: false
		});
	}

	initSpeaker() {
		this.speaker = this.add.sprite(DEFAULT_WIDTH/3-40, 67, "speaker").setScale(0.35);
		this.speaker.setOrigin(0, 0);
		this.speaker.setInteractive({cursor: 'pointer'});
		this.music = this.sound.add('sound1');
		this.speaker.on('pointerover', () => this.speaker.setFrame(1));
		this.speaker.on('pointerout', () => this.speaker.setFrame(0));
		this.speaker.on('pointerdown', () => {
			this.music.play();
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
			this.dragObject.x = pointer.x-30;
			this.dragObject.y = pointer.y-50;
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
			for (let i=0; i<numberOfContainer; ++i) {
				if (this.arrayColorTrack[i].status == true) {
					if (this.dragObject.x >= DEFAULT_WIDTH/40*13.5+135*i && this.dragObject.x <= DEFAULT_WIDTH/40*16.5+135*i && this.dragObject.y > 350 && this.dragObject.y < 520) {
						this.arrayColorTrack[i].setFrame(1);
					} 
					else {
						this.arrayColorTrack[i].setFrame(0);    
					}
				}
			}
		}
	}

	checkResult() {
		if (this.dragObject != null) {
			for (let i=0; i<numberOfContainer; ++i) {
				
				if (this.dragObject.x >= DEFAULT_WIDTH/40*13.5+135*i && this.dragObject.x <= DEFAULT_WIDTH/40*16.5+135*i && this.dragObject.y > 350 && this.dragObject.y < 520 && this.arrayColorTrack[i].status == true) {
					if (i != numberOfContainer-1) {
						this.checkTurn(i+1, arrContainer[i], this.arrayColorTrack[i], this.arrayColorTrack[i+1]);
					}
					else {
						if (this.count > 0) this.count--;
						this.checkFalse = true;
						this.arrayColorTrack[i].setFrame(0);
						arrContainer[i].x = DEFAULT_WIDTH/40*15.4+125*4; 
						arrContainer[i].y = 390;
						
						arrContainer[i].disableInteractive();
						this.arrayColorTrack[i].status = false;
						this.explosion = this.add.sprite(DEFAULT_WIDTH/40*11.7, 400,"explosion").setScale(2.0);
						this.explosion.play('explode');
						for (let i=0; i<numberOfContainer; ++i) {
							this.arrayColorTrack[i].destroy();
						}
						this.time.addEvent({
							delay: 1000,
							callback: () => {				
								if (this.count == 0) {
									for (let i=0; i<numberOfGreenBall; ++i) {
										if (this.arrayGreenBall[i].statusRight) {
											//console.log(i);
											if (i == 0) {
												this.greenBallMoveRight(this.arrayGreenBall[i], i);
												this.arrayGreenBall[i].statusRight = false;
												this.arrayGreenBall[i].statusLeft = true;
												this.end = true;
												this.time.addEvent({
													delay: 5000,
													callback: () => {
														this.scene.start('screenFinish');
													}
												});
											} else if (i == numberOfGreenBall-1) {
												this.greenBallMoveRight(this.arrayGreenBall[i], i);
												this.arrayGreenBall[i].statusRight = false;
												this.arrayGreenBall[i].statusLeft = true;
												this.arrayGreenBall[i-1].statusRight = true;
												this.arrayGreenBall[i-1].statusLeft = false;
											} else {
												this.greenBallMoveRight(this.arrayGreenBall[i], i);
												this.arrayGreenBall[i].statusRight = false;
												this.arrayGreenBall[i].statusLeft = true;
												this.arrayGreenBall[i+1].statusLeft = false;
												this.arrayGreenBall[i-1].statusRight = true;
											}
										}
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
	}

	checkTurn(numberOfTurn, container, colorTrack, colorTrack2/*greenBall4, greenBall3, greenBall2, greenBall1*/) {
		if (this.dragObject == container) {
			colorTrack.setFrame(0);
			container.x = DEFAULT_WIDTH/40*15.4 + 125*(numberOfTurn-1); // vị trí của toa tàu được đạt vào đường ray khi chọn đúng toa tàu
			container.y = 390;
			container.disableInteractive();
			colorTrack2.setFrame(0);
			colorTrack.status = false;
			colorTrack2.status = true;
		} else {
			this.imageWrong = this.add.image(DEFAULT_WIDTH/40*16 + 120*(numberOfTurn-1), 570, "imagewrong").setScale(0.6); // vị trí của thông báo đặt toa tàu sai vị trí
			this.speaker = this.add.sprite(DEFAULT_WIDTH/40*12.7 + 120*(numberOfTurn-1), 555, "speaker").setScale(0.35); // hình ảnh của loa khi toa tàu đặt sai vị trí
			this.speaker.setOrigin(0, 0);
			this.speaker.setInteractive({cursor: 'pointer'});
			this.speaker.on('pointerover', () => this.speaker.setFrame(1));
			this.speaker.on('pointerout', () => this.speaker.setFrame(0));
			this.soundWrong = this.sound.add('sound4');
			this.speaker.on('pointerdown', () => {
				this.soundWrong.play();
			});
			this.deleteSpeaker = this.time.addEvent({
				delay: 2000,
				callback: () => {
					this.speaker.destroy();
					this.imageWrong.destroy();
				},
				loop: false
			});
			if (this.count == 0) this.count+=2;
			if (this.checkFalse == true) {
				for (let i = numberOfGreenBall-1; i>=1; --i) {
					if (this.arrayGreenBall[i].statusLeft) {
						this.greenBallMoveLeft(this.arrayGreenBall[i], i);
						this.arrayGreenBall[i].statusLeft = false;
						this.arrayGreenBall[i].statusRight = true;
						this.arrayGreenBall[i-1].statusRight = false;
					}
				}
				
				this.checkFalse = false; // sai nhieu lan trong 1 luot nhung chi co 1 qua bong xanh bi di chuyen tu trai sang phai
			}
			colorTrack.setFrame(3);
			this.dragObject.x = DEFAULT_WIDTH/40*15.4 + 125*(numberOfTurn-1);
			this.dragObject.y = 390;

			var posX = DEFAULT_WIDTH/40*15.4 + 125*(numberOfTurn-1);
			var posY = 390;

			var objectTurnBack = this.time.addEvent({
				delay: 1000,
				callback: () => {
					for (let i=0; i<numberOfContainer; ++i) {
						if (this.dragObject === arrContainer[i]) { // tro ve vi tri ban dau
							this.dragObject.x += (posXContainer[i]-posX);
							this.dragObject.y += (posYContainer[i]-posY);
							//colorTrack.setFrame(0);
						}
					}
				},
				loop: false
			});

			var colorTrackTurnBack = this.time.addEvent({
				delay: 2000,
				callback: () => {
					colorTrack.setFrame(0);
				},
				loop: false
			});

		}
	}

	trainMove() {
		var move = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (arrContainer[numberOfContainer-1].x < -100) {
					move.remove();
					this.stopTrain();
				}
				containerHead.x -= 5;   // 5 la van toc di chuyen 
				for (let i=0; i<numberOfContainer; ++i) {
					arrContainer[i].x -= 5; // 5 la van toc di chuyen
				}
			},
			loop: true
		});
	}

	stopTrain() {
		containerHead.destroy();
		for (let i=0; i<numberOfContainer; ++i) {
			arrContainer[i].destroy();
		}
		if(this.end == false) this.initial();
	}

	greenBallMoveRight(ball, i){
		var run = this.time.addEvent({
			delay: 0,
			callback: () => { 
				if (ball.x > DEFAULT_WIDTH/10*6.2175 - (numberOfGreenBall-1-i)*23) run.remove(); // giới hạn dừng lại của quả bóng xanh
				ball.x += 9;
			},
			loop: true
		});
	}

	greenBallMoveLeft(ball, i){
		var run = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (ball.x < DEFAULT_WIDTH/3*1.27 - (numberOfGreenBall-1-i)*23) run.remove(); // giới hạn dừng lại của quả bóng xanh
				ball.x -= 9;
			},
			loop: true
		});
	}

}