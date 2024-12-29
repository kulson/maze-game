// font size
var FONT = 32;

// map dimensions
var ROWS = 10;
var COLS = 15;

// the structure of the map
var map;

var pacman;
var wall;
var finish;

console.log("haah");
var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload,
  create: create,
  update: update,
});

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = "#fff";
  game.load.image("pacman", "assets/pacman-right.png");
  game.load.image("wall", "assets/wall.png");
}

function create() {
  // init keyboard commands
  game.input.keyboard.addCallbacks(null, null, onKeyUp);
  pacman = game.add.sprite(32, 32, "pacman");
  wall = game.add.sprite(32, 32, "wall");
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

function update() {}

function onKeyUp(event) {
  switch (event.keyCode) {
    case Keyboard.A:
      console.log("lewo");
      moveTo(pacmanPosition, directions[0]);
      break;
    case Keyboard.D:
      console.log("prawo");
      moveTo(pacmanPosition, directions[1]);
      break;
    case Keyboard.W:
      console.log("gora");
      moveTo(pacmanPosition, directions[2]);
      break;
    case Keyboard.S:
      console.log("dol");
      moveTo(pacmanPosition, directions[3]);
      break;
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
