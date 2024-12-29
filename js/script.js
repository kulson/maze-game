// font size
var FONT = 32;

// map dimensions
var ROWS = 10;
var COLS = 15;

// the structure of the map
var map;

var pacman;

var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.AUTO, null, {
  preload: preload,
  create: create,
  update: update,
});

function preload() {
  handleRemoteImagesOnJSFiddle();
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = "#eee";
  game.load.image("pacman", "assets/pacman-right.png");
}

function create() {
  // init keyboard commands
  game.input.keyboard.addCallbacks(null, null, onKeyUp);
  pacman = game.add.sprite(100, 100, "pacman");
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
