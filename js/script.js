// map dimensions
var ROWS = 12;
var COLS = 12;

var gameWidth = 64 * ROWS;
var gameHeight = 64 * COLS;

// the structure of the map

var map;

var keyA;
var keyS;
var keyD;
var keyW;

var config = {
  type: Phaser.CANVAS,
  parent: "game-container",
  width: gameWidth,
  height: gameHeight,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var knight;

function preload() {
  this.load.image("knight", "assets/knight.png?v=3");
  this.load.image("finish", "assets/finish.png");
}
function create() {
  knight = this.add.image(0, 0, "knight");
  knight.setOrigin(0, 0);
  knight.setDisplaySize(64, 64);
  let finish = this.add.image(gameWidth - 32, gameHeight - 32, "finish");
  finish.setDisplaySize(64, 64);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  //this.add.line(0, 0, 100, 100, 200, 200, 0xff0000);
}

var directions = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

var knightPosition = {
  x: 0,
  y: 0,
};

function update() {
  if (keyA.isDown) {
    knightPosition = moveTo(directions[0]);
    console.log("left");
  } else if (keyD.isDown) {
    knightPosition = moveTo(directions[1]);
    console.log("right");
  } else if (keyW.isDown) {
    knightPosition = moveTo(directions[2]);
    console.log("up");
  } else if (keyS.isDown) {
    knightPosition = moveTo(directions[3]);
    console.log("down");
  }
  knight.x = knightPosition.x * 64;
  knight.y = knightPosition.y * 64;
}

function moveTo(direction) {
  var currentknightPosition = {
    x: 0,
    y: 0,
  };
  currentknightPosition.x = knightPosition.x + direction.x;
  currentknightPosition.y = knightPosition.y + direction.y;
  if (
    currentknightPosition.x >= 0 &&
    currentknightPosition.x <= COLS - 1 &&
    currentknightPosition.y >= 0 &&
    currentknightPosition.y <= ROWS - 1
  ) {
    if (
      currentknightPosition.x === ROWS - 1 &&
      currentknightPosition.y === COLS - 1
    ) {
      console.log("koniec gry");
    }
  } else {
    currentknightPosition.x = knightPosition.x;
    currentknightPosition.y = knightPosition.y;
  }
  console.log(currentknightPosition);
  return currentknightPosition;
}
