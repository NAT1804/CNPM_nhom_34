var config = {
	width: 1455,
	height: 780,
	backgroundColor: '#182d3b',
	scene: [Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6],
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
}

var game = new Phaser.Game(config);