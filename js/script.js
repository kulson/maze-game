// font size
var FONT = 32;

// map dimensions
var ROWS = 10;
var COLS = 10;

// the structure of the map
var pacmanRight;
var pacmanLeft;
var pacmanUp;
var pacmanDown;
var wall;
var finish;

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

function preload() {
  console.log("haah");
  this.load.image("pacman", "assets/pacman-right.png");
  this.load.image("wall", "assets/wall.png");
}

function create() {
  // init keyboard commands
  cursors = this.input.keyboard.addKeys({
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
  });

  this.add.image(0, 0, "pacman");
  this.add.image(50, 50, "wall");
}

var directions = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

var pacmanPosition = {
  x: 0,
  y: 0,
};

function update() {
  if (cursors.up.isLeft) {
    console.log("left");
    //moveTo(pacmanPosition, directions[0]);
  } else if (cursors.down.isRight) {
    console.log("right");
    //moveTo(pacmanPosition, directions[1]);
  } else if (cursors.down.isUp) {
    console.log("up");
    //moveTo(pacmanPosition, directions[2]);
  } else if (cursors.down.isDown) {
    console.log("down");
    //moveTo(pacmanPosition, directions[3]);
  }
}

function moveTo(pacmanPosition, direction) {
  var currentPacmanPosition = {
    x: 0,
    y: 0,
  };
  currentPacmanPosition.x = pacmanPosition.x + direction.x;
  currentPacmanPosition.y = pacmanPosition.y + direction.y;
  if (
    currentPacmanPosition.x >= 0 &&
    currentPacmanPosition.x <= COLS - 1 &&
    currentPacmanPosition.y >= 0 &&
    currentPacmanPosition.y <= ROWS - 1 &&
  ) {
    console.log("haava");
  }
  if (
    currentPacmanPosition.x === ROWS - 1 &&
    currentPacmanPosition.y === COLS - 1
  ) {
    console.log("koniec gry");
  }
}
