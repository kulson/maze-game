// font size
var FONT = 32;

// map dimensions
var ROWS = 10;
var COLS = 10;

var gameWidth = 64 * ROWS;
var gameHeight = 64 * COLS;

// the structure of the map
var knightRight;
var knightLeft;
var knightUp;
var knightDown;
var finish;

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

function preload() {
  this.load.image("knight", "assets/knight.png");
  this.load.image("finish", "assets/finish.png");
}

function create() {
  this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0)");
  let knight = this.add.image(32, 32, "knight");
  knight.setDisplaySize(64, 64);
  let finish = this.add.image(gameWidth - 32, gameHeight - 32, "finish");
  finish.setDisplaySize(64, 64);
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
  /*
  if (cursors.up.isLeft) {
    console.log("left");
    //moveTo(knightPosition, directions[0]);
  } else if (cursors.down.isRight) {
    console.log("right");
    //moveTo(knightPosition, directions[1]);
  } else if (cursors.down.isUp) {
    console.log("up");
    //moveTo(knightPosition, directions[2]);
  } else if (cursors.down.isDown) {
    console.log("down");
    //moveTo(knightPosition, directions[3]);
  }
  */
}

function moveTo(knightPosition, direction) {
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
  )
    if (
      currentknightPosition.x === ROWS - 1 &&
      currentknightPosition.y === COLS - 1
    ) {
      console.log("koniec gry");
    }
}
