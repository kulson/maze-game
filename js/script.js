// font size
var FONT = 32;

// map dimensions
var ROWS = 10;
var COLS = ROWS;

// the structure of the map
var map = [
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
];
var pacman;
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
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  this.load.setCORS("anonymous");
  this.add.image(32, 32, "pacman").setOrigin(0, 0);
  //wall = game.add.sprite(32, 32, "wall");
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
    moveTo(pacmanPosition, directions[0]);
  } else if (cursors.down.isRight) {
    moveTo(pacmanPosition, directions[1]);
  } else if (cursors.down.isUp) {
    moveTo(pacmanPosition, directions[2]);
  } else if (cursors.down.isDown) {
    moveTo(pacmanPosition, directions[3]);
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
    map[currentPacmanPosition.x][currentPacmanPosition.y] === 1
  )
    console.log(currentPacmanPosition);
  if (
    currentPacmanPosition.x === ROWS - 1 &&
    currentPacmanPosition.y === COLS - 1
  ) {
    console.log("koniec gry");
  }
}
