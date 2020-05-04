// jshint esversion: 6
const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = 780; 
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

var config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'phaser-example',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: DEFAULT_WIDTH,
		height: DEFAULT_HEIGHT
	},
	backgroundColor: '#182d3b',
	scene: [Scene0, Scene1, Scene2, Scene3],
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
};

var game = new Phaser.Game(config);