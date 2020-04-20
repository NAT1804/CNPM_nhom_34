class Scene4 extends Phaser.Scene {
	constructor(){
		super("screenPlay2");
	}

	create() {
		//background
		this.khungtrang = this.add.image(0, 30, "khungtrang");
		this.khungtrang.setOrigin(0, 0);

		this.add.text(300, 85, "Order the train cars from the smaller to the greater", {
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
		this.loa = this.add.image(200, 60, "loa").setScale(0.2);
		this.loa.setOrigin(0, 0);
		this.loa.setInteractive({cursor: 'pointer'});
		this.music = this.sound.add('sound');
		this.loa.on('pointerdown', () => this.music.play());

		// duong ray
		this.duongray1 = this.add.sprite(50, config.height*3/4, "duong-ray").setFrame(4);
		this.duongray2 = this.add.sprite(250, config.height*3/4, "duong-ray").setFrame(4);
		this.duongray3 = this.add.sprite(450, config.height*3/4, "duong-ray").setFrame(4);
		this.duongray4 = this.add.sprite(650, config.height*3/4, "duong-ray").setFrame(4);
		this.duongray5 = this.add.sprite(850, config.height*3/4 , "duong-ray").setFrame(4);
		this.duongray6 = this.add.sprite(1050, config.height*3/4, "duong-ray").setFrame(4);
		this.duongray7 = this.add.sprite(1250, config.height*3/4, "duong-ray").setFrame(4);
		this.duongray8 = this.add.sprite(1450, config.height*3/4, "duong-ray").setFrame(4);

		this.khoitao();
		
		this.duongray1.setScale(.4);
		this.duongray2.setScale(.4);
		this.duongray3.setScale(.4);
		this.duongray4.setScale(.4);
		this.duongray5.setScale(.4);
		this.duongray6.setScale(.4);
		this.duongray7.setScale(.4);
		this.duongray8.setScale(.4);

		this.input.on('pointerdown', this.startDrag, this);
	}

	khoitao() {
		this.time.addEvent({
			delay: 1000,
			callback: () => {
				this.count = 0;
				this.checkfalse = true;
				this.duongray3.setFrame(0);
				this.duongray4.setFrame(3);
				this.duongray5.setFrame(3);
				this.duongray6.setFrame(3);
				this.duongray7.setFrame(3);
				this.number1 = Phaser.Math.Between(1, 4);
				this.number2 = Phaser.Math.Between(5, 8);
				this.number3 = Phaser.Math.Between(9, 12);
				this.number4 = Phaser.Math.Between(13, 16);
				this.number5 = Phaser.Math.Between(17, 20);
				this.bodytrain5 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number5).setInteractive({cursor:'pointer'});
				this.bodytrain4 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number4).setInteractive({cursor:'pointer'});
				this.bodytrain3 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number3).setInteractive({cursor:'pointer'});
				this.bodytrain2 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number2).setInteractive({cursor:'pointer'});
				this.bodytrain1 = this.add.image(Phaser.Math.Between(100, config.width-100), Phaser.Math.Between(200, config.height/2), "body-train" + this.number1).setInteractive({cursor:'pointer'});
				this.bodytrain1.status = true;
				this.bodytrain2.status = false;
				this.bodytrain3.status = false;
				this.bodytrain4.status = false;
				this.bodytrain5.status = false;
				this.headtrain0 = this.add.image(210, config.height*3/4 - 95, "head-train0");
				this.headtrain0.setScale(.8);
				this.bodytrain1.setScale(.8);
				this.bodytrain2.setScale(.8);
				this.bodytrain3.setScale(.8);
				this.bodytrain4.setScale(.8);
				this.bodytrain5.setScale(.8);
				this.end = false;
			},
			loop: false
		})
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
			// vi tri 1
			if (this.bodytrain1.status == true) {
				if (this.dragObject.x > 350 && this.dragObject.x <= 550 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.duongray3.setFrame(2);
				} 
				else {
					this.duongray3.setFrame(0);
				}
			}

			// vi tri 2
			if (this.bodytrain2.status == true) {
				if (this.dragObject.x > 550 && this.dragObject.x <= 725 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.duongray4.setFrame(2);
				}
				else {
					this.duongray4.setFrame(0);
				}				
			}
			
			// vi tri 3
			if (this.bodytrain3.status == true) {
				if (this.dragObject.x > 725 && this.dragObject.x <= 940 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.duongray5.setFrame(2);
				}
				else {
					this.duongray5.setFrame(0);
				}	
			}
			
			// vi tri 4
			if (this.bodytrain4.status == true) {
				if (this.dragObject.x > 940 && this.dragObject.x <= 1120 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.duongray6.setFrame(2);
				}
				else{
					this.duongray6.setFrame(0);
				}	
			}
	
			// vi tri 5
			if (this.bodytrain5.status == true) {
				if (this.dragObject.x > 1120 && this.dragObject.x <= 1320 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3) {
					this.duongray7.setFrame(2);
				}
				else {
					this.duongray7.setFrame(0);
				}
			}
			
		}
	}


	checkResult() {
		if (this.dragObject != null) {
			// vi tri so thu nhat
			if (this.dragObject.x > 350 && this.dragObject.x <= 550 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3 && this.bodytrain1.status == true) {
				
				this.checkTurn(1, this.bodytrain1, this.bodytrain2, this.duongray3, this.duongray4, this.greenball4, this.greenball3, this.greenball2, this.greenball1);
				
			}
			//vi tri thu hai
			if (this.dragObject.x > 550 && this.dragObject.x <= 725 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3 && this.bodytrain2.status == true) {
				
				this.checkTurn(2, this.bodytrain2, this.bodytrain3, this.duongray4, this.duongray5, this.greenball4, this.greenball3, this.greenball2, this.greenball1);

			}
			// vi tri thu ba
			if (this.dragObject.x > 725 && this.dragObject.x <= 940 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3 && this.bodytrain3.status == true) {
				
				this.checkTurn(3, this.bodytrain3, this.bodytrain4, this.duongray5, this.duongray6, this.greenball4, this.greenball3, this.greenball2, this.greenball1);

			}
			// vi tri thu tu
			if (this.dragObject.x > 940 && this.dragObject.x <= 1120 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3 && this.bodytrain4.status == true) {

				this.checkTurn(4, this.bodytrain4, this.bodytrain5, this.duongray6, this.duongray7, this.greenball4, this.greenball3, this.greenball2, this.greenball1);

			}
			// vi tri thu nam
			if (this.dragObject.x > 1120 && this.dragObject.x <= 1320 && this.dragObject.y > config.height/2+50 && this.dragObject.y < config.height/4*3
				&& this.bodytrain5.status == true) {
				if (this.dragObject == this.bodytrain5) {
					if (this.count > 0) this.count --;
					this.checkfalse = true;
					this.duongray7.setFrame(0);
					this.bodytrain5.x = 1210;
					this.bodytrain5.y = 495;
					this.bodytrain5.disableInteractive();
					this.bodytrain5.status = false;
					this.explosion = this.add.sprite(120, config.height*3/4-150,"explosion");
					this.explosion.play('explode');
					this.time.addEvent({
						delay: 1000,
						callback: () => {
							this.duongray3.setFrame(4);
							this.duongray4.setFrame(4);
							this.duongray5.setFrame(4);
							this.duongray6.setFrame(4);
							this.duongray7.setFrame(4);
							if (this.count == 0) {
								
								if (this.greenball1.statusRight == true)  {
									this.greenballMoveRight(this.greenball1, 1);
									this.greenball1.statusRight = false;
									this.end = true;
									this.time.addEvent({
										delay: 5000,
										callback: () => {
											this.finishScreen = this.add.image(0, 30, "khungfinish");
											this.finishScreen.setOrigin(0, 0);
											this.buttonfinish = this.add.image(770, 500, "finishbutton").setInteractive({cursor: 'pointer'});
											this.buttonfinish.on('pointerdown', () => this.scene.start("screenMain"));
										}
									})
									
								}	
								if (this.greenball2.statusRight == true)  {
									this.greenballMoveRight(this.greenball2, 2);
									this.greenball1.statusRight = true;
									this.greenball1.statusLeft = false;
									this.greenball2.statusRight = false;
									this.greenball2.statusLeft = true;
									this.greenball3.statusLeft = false;
								}	
								if (this.greenball3.statusRight == true)  {
									this.greenballMoveRight(this.greenball3, 3);
									this.greenball2.statusRight = true;
									this.greenball2.statusLeft = false;
									this.greenball3.statusRight = false;
									this.greenball3.statusLeft = true;
									this.greenball4.statusLeft = false;			
								}
								if (this.greenball4.statusRight == true)  {
									this.greenballMoveRight(this.greenball4, 4);
									this.greenball3.statusRight = true;
									this.greenball3.statusLeft = false;
									this.greenball4.statusRight = false;
									this.greenball4.statusLeft = true;
									
								}

							}
							this.trainMove();
							
						},
						loop: false
					})

					
				} else {
					this.duongray7.setFrame(1);
					this.dragObject.x = 1210;
					this.dragObject.y = 495;
					this.time.addEvent({
						delay: 1000,
						callback: () => {
							this.dragObject.y -= 100;
							this.duongray7.setFrame(0);
						},
						loop: false
					})
				}
			}

		}
	}

	checkTurn(numberOfTurn, bodytrain, bodytrain2, duongray, duongray2, greenball4, greenball3, greenball2, greenball1) {
		if (this.dragObject == bodytrain) {
					duongray.setFrame(0);
					bodytrain.x = 430 + 195*(numberOfTurn-1);
					bodytrain.y = 495;
					bodytrain.disableInteractive();
					duongray2.setFrame(0);
					bodytrain.status = false;
					bodytrain2.status = true;
		} else {
			this.imagewrong = this.add.image(430, 700, "imagewrong");
			if (this.count < 1) this.count+=2;
			if (this.checkfalse == true) {
				if (greenball4.statusLeft == true) {
					this.greenballMoveLeft(greenball4, 4);
					greenball4.statusLeft = false;
					greenball4.statusRight = true;
					greenball3.statusRight = false;
				}
				if (greenball3.statusLeft == true) {
					this.greenballMoveLeft(greenball3, 3);
					greenball3.statusLeft = false;
					greenball3.statusRight = true;
					greenball2.statusRight = false;
				}
				if (greenball2.statusLeft == true) {
					this.greenballMoveLeft(greenball2, 2);
					greenball2.statusLeft = false;
					greenball2.statusRight = true;
					greenball1.statusRight = false;
				}
				if (greenball1.statusLeft == true) {
					this.greenballMoveLeft(greenball1, 1);
					greenball1.statusLeft = false;
					greenball1.statusRight = true;
				}
				this.checkfalse = false;
			}
			duongray.setFrame(1);
			this.dragObject.x = 430 + 195*(numberOfTurn-1);
			this.dragObject.y = 495;
			this.time.addEvent({
				delay: 1000,
				callback: () => {
					this.dragObject.y -= 100;
					duongray.setFrame(0);
					this.imagewrong.destroy();
				},
				loop: false
			})
		}
	}

	trainMove() {
		var move = this.time.addEvent({
			delay: 0,
			callback: () => {
				if (this.bodytrain5.x < -100) {
					move.remove();
					this.stopTrain();
				}
				this.headtrain0.x -= 5;
				this.bodytrain1.x -= 5;
				this.bodytrain2.x -= 5;
				this.bodytrain3.x -= 5;
				this.bodytrain4.x -= 5;
				this.bodytrain5.x -= 5;
			},
			loop: true
		})
	}

	stopTrain() {
		this.headtrain0.destroy();
		this.bodytrain1.destroy();
		this.bodytrain2.destroy();
		this.bodytrain3.destroy();
		this.bodytrain4.destroy();
		this.bodytrain5.destroy();
		if(this.end == false) this.khoitao();
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