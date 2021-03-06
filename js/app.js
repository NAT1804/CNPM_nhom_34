const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = 774.4;
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

var config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'game',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: DEFAULT_WIDTH,
		height: DEFAULT_HEIGHT
	},
	backgroundColor: '#ffffff',
	scene: [Scene0, Scene1, Scene2, Scene3, Scene4],
	//pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
};

var game = new Phaser.Game(config);

function checkInit (game) {
	if (game !== null) return true;
	return false;
}

