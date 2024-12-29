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
  game.load.image("pacman", "../../assets/pacman-right.png");
  game.load.image("wall", "../assets/wall.png");
}

function create() {
  // init keyboard commands
  game.input.keyboard.addCallbacks(null, null, onKeyUp);
  pacman = game.add.sprite(32, 32, "pacman");
  wall = game.add.sprite(32, 32, "wall");
}

function update() {}

function onKeyUp(event) {
  switch (event.keyCode) {
    case Keyboard.A:
    case Keyboard.D:
    case Keyboard.W:
    case Keyboard.S:
  }
}
