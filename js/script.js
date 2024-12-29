// font size
var FONT = 32;

// map dimensions
var ROWS = 10;
var COLS = 15;

// the structure of the map
var map;

var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.AUTO, null, {
  create: create,
});

function create() {
  // init keyboard commands
  game.input.keyboard.addCallbacks(null, null, onKeyUp);
}

function onKeyUp(event) {
  switch (event.keyCode) {
    case Keyboard.A:
    case Keyboard.D:
    case Keyboard.W:
    case Keyboard.S:
  }
}
