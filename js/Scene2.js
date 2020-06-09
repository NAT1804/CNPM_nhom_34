//jshint esversion: 6

var numberOfGreenBall = 4;
var container = new Array();
var numberInBall = new Array();
var ball = new Array('ball');
var line = new Array();

class Scene2 extends Phaser.Scene {
	constructor() {
		super("screenPlay2");
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
		var posXGreenBall1 =  DEFAULT_WIDTH/3+10;
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

		//disable interactive object
		this.time.addEvent({
			delay: 0,
			callback: () => {
				
				container[0].disableInteractive();
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
					container[0].setInteractive(new Phaser.Geom.Circle(50, 50, 60), Phaser.Geom.Circle.Contains);
					this.speaker.setInteractive({cursor: 'pointer'});
					this.music = this.sound.add('sound2');
					this.speaker.on('pointerover', () => this.speaker.setFrame(1));
					this.speaker.on('pointerout', () => this.speaker.setFrame(0));
					this.speaker.on('pointerdown', () => {
						this.music.play();
					});
				});
			}
		});

		// drag object
		this.input.on('pointerdown', this.startDrag, this);
	}

	initial() {
		this.time.addEvent({
		    delay: 0,
		    callback: ()=>{
		    	// number of correct sentences
		    	this.countCorrect = 0;
		    	// header
				var header = this.add.text(DEFAULT_WIDTH/25*8, 85, "Place the ball on the number line", {
					color: '#000000',
					fontSize: '45px',
					fontFamily: 'PT Sans' 
				});
		        // number line
				this.numberLine = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY-72, "numberline");

				//random number
				 this.randomNumber();
				//status
				// this.statusLabel = this.add.bitmapText(DEFAULT_WIDTH/2-100, DEFAULT_HEIGHT*3/4-25, "pixelFont", "STATUS: ", 30);
				
				this.end = false;
				
		    },
		    loop: false
		});
	}

	randomNumber() {
		var posY = 160;
		var posX  = Phaser.Math.Between(DEFAULT_WIDTH/5, DEFAULT_WIDTH/5*4);
		
		do {
			this.number = Phaser.Math.Between(1+6*this.countCorrect,6+5*this.countCorrect);
		} while (this.number % 5 == 0);
		if(this.number >= 10) {
			numberInBall[this.countCorrect] = this.add.text(-10, 0, this.number, {
				fontFamily: 'PT Sans',
				fontSize: '45px',
				color: '#000000'
			});
		} else {
			numberInBall[this.countCorrect] = this.add.text(0, 0, this.number, {
				fontFamily: 'PT Sans',
				fontSize: '45px',
				color: '#000000'
			});
		}
		
		ball[this.countCorrect] = this.add.sprite(13, 22, 'balloon').setFrame(1);
		container[this.countCorrect] = this.add.container(posX, posY, [ball[this.countCorrect], numberInBall[this.countCorrect]]);	
		container[this.countCorrect].setInteractive(new Phaser.Geom.Circle(0, 0, 60), Phaser.Geom.Circle.Contains); 
		this.input.setDraggable(container[this.countCorrect]);
		container[this.countCorrect].on('pointerover', () => {
			container[this.countCorrect].list[0].setFrame(2);
		});
		container[this.countCorrect].on('pointerout', () => {
			//container[this.countCorrect].list[0].setFrame(1);
			ball[this.countCorrect].setFrame(1);
		});
		
		
	}

	initSpeaker() {
		this.speaker = this.add.sprite(DEFAULT_WIDTH/25*7.3, 90, "speaker").setScale(0.35);
		this.speaker.setOrigin(0, 0);
		this.speaker.setInteractive({cursor: 'pointer'});
		this.music = this.sound.add('sound2');
		this.speaker.on('pointerover', () => this.speaker.setFrame(1));
		this.speaker.on('pointerout', () => this.speaker.setFrame(0));
		this.speaker.on('pointerdown', () => {
			this.music.play();
		});
	}

	startDrag(pointer, targets) {
		this.input.off('pointerdown', this.startDrag, this);
		this.dragObj = targets[0];
		this.input.on('pointermove', this.doDrag, this);
		this.input.on('pointerup', this.stopDrag, this);
	}

	doDrag(pointer) {
		if (this.dragObj != null) {
			//line[this.countCorrect] = this.add.sprite(12, 76, 'line');
			//container[this.countCorrect].add(line[this.countCorrect]);

			if (this.dragObj.x > 220 || this.dragObj.x < DEFAULT_WIDTH - 220) {
				this.dragObj.x = pointer.x;
				this.dragObj.y = 160;
			} else {
				this.dragObj.x = 220;
				this.dragObj.y = 160;
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
		
		if (this.dragObj != null && this.dragObj != this.speaker) {

			for (let i=0; i<=20; ++i) {
				if (this.dragObj.x > DEFAULT_WIDTH/25*5.65+39*i && this.dragObj.x < DEFAULT_WIDTH/25*5.65+39+39*i) {
					this.check(this.number, i);
				}
			}
		}
			
	}

	check(number, tmp) {
		if (number == tmp) {
			this.correctAnswer();
			console.log('correct');
			return;
		} else {
			this.wrongAnswer();
			console.log('wrong');
			return;
		}
	}

	wrongAnswer() { 

		container[this.countCorrect].list[0].setFrame(3);
		// container[this.countCorrect].list[2].setFrame(2);
		container[this.countCorrect].on('pointerover', () => {
			container[this.countCorrect].list[0].setFrame(3);
		});
		container[this.countCorrect].on('pointerout', () => {
			container[this.countCorrect].list[0].setFrame(3);
		});
		// ball[this.countCorrect].setFrame(3);
		//line[this.countCorrect].setFrame(1);
		
		for (let i = numberOfGreenBall-1; i>=1; --i) {
			if (this.arrayGreenBall[i].statusLeft) {
				this.greenBallMoveLeft(this.arrayGreenBall[i], i);
				this.arrayGreenBall[i].statusLeft = false;
				this.arrayGreenBall[i].statusRight = true;
				this.arrayGreenBall[i-1].statusRight = false;
				if(i != numberOfGreenBall-1) {
					this.arrayGreenBall[i+1].statusLeft = true;
				}
			}
		}
		
		//container[this.countCorrect].remove('line', true);
		
		//line[this.countCorrect].setVisible(flase);
		//console.log(container[this.countCorrect].list[2]);
		this.move = this.time.addEvent({
			delay: 0,
			callback: () => {
			
				// if (!line[this.countCorrect]) {
				// 	line[this.countCorrect].destroy();
				// }
				
				container[this.countCorrect].y -= 2;
				if (container[this.countCorrect].y < 55) {
					console.log('delete');
					this.move.remove();
					for(let i = this.countCorrect; i>=0; --i) {
						container[i].destroy();
					}
						
					this.initial();
				}
				
			},
			loop: true
		});
		
	}

	correctAnswer() {
		container[this.countCorrect].on('pointerover', () => {
			container[this.countCorrect].list[0].setFrame(0);
		});
		container[this.countCorrect].on('pointerout', () => {
			container[this.countCorrect].list[0].setFrame(0);
		});
		container[this.countCorrect].list[0].setFrame(0);
		//container[this.countCorrect].list[2].setFrame(2);

		this.move = this.time.addEvent({
			delay: 0,
			callback: () => {
				container[this.countCorrect].y += 4;
				if (container[this.countCorrect].y > DEFAULT_HEIGHT/2-63) {
					this.move.remove();
					container[this.countCorrect].setScale(0.5);
					//container[this.countCorrect].list[0].setColor('#e8e9bb');
					container[this.countCorrect].disableInteractive();
					container[this.countCorrect].y = DEFAULT_HEIGHT/2-63;
					container[this.countCorrect].x = DEFAULT_WIDTH/25*5.65 + 19 + 39*(this.number); // vị trí của của quả bóng vàng khi chọn đúng vị trí
					
					this.countCorrect++;
					// var graphics = this.add.graphics();
					// graphics.fillStyle('#e8e9bb',0.8);
					// graphics.fillCircle(298 + 39*(this.number), DEFAULT_HEIGHT/2, 50);

				}
				
			},
			loop: true
		});

		

		if (this.countCorrect == 2) {
			for (let i=0; i<numberOfGreenBall; ++i) {
				if (this.arrayGreenBall[i].statusRight) {
					console.log(i);
					if (i == 0) {
						this.greenBallMoveRight(this.arrayGreenBall[i], i);
						this.arrayGreenBall[i].statusRight = false;
						this.arrayGreenBall[i].statusLeft = true;
						this.end = true;
						this.time.addEvent({
							delay: 2000,
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


			if (!this.end) {

				this.time.addEvent({
					delay: 1500,
					callback: () => {
						for (let i=0; i<3; ++i) {
							container[i].destroy();
						}
						this.initial();
					},
					loop: false
				});
			}

		}
		else {
			this.time.addEvent({
				delay: 1500,
				callback: () => {
					this.randomNumber();
				},
				loop: false
			});	
		}

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