var ROWS = 15;
var COLS = 15;

var gameWidth = 64 * ROWS;
var gameHeight = 64 * COLS;

var map = null;

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

var game = null;

var knightPosition = {
  x: 0,
  y: 0,
};

var knight;

var finishPosition = {
  x: 0,
  y: 0,
};

var gamePaused = false;

export function newGame() {
  if (game != null) {
    game.destroy(true);
  }
  game = null;
  game = new Phaser.Game(config);
}

export function endGame() {
  if (game != null) {
    game.destroy(true);
  }
  game = null;
}

function preload() {
  this.load.image("knight", "assets/knight.png?v=3");
  this.load.image("finish", "assets/finish.png");
  this.load.image("block", "assets/block.png");
}

function initMap(scene) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        let block = scene.add.image(i * 64, j * 64, "block");
        block.setOrigin(0, 0);
        block.setDisplaySize(64, 64);
      }
    }
  }
}

function initCharacters(scene) {
  knight = scene.add.image(
    knightPosition.x * 64,
    knightPosition.y * 64,
    "knight",
  );
  knight.setOrigin(0, 0);
  knight.setDisplaySize(64, 64);
  let finish = scene.add.image(
    finishPosition.x * 64,
    finishPosition.y * 64,
    "finish",
  );
  finish.setDisplaySize(64, 64);
  finish.setOrigin(0, 0);
}

function getMap(scene) {
  axios
    .get("http://localhost:3000/map")
    .then((response) => {
      console.log("Map received successfully:", response.data);
      map = response.data;
      initMap(scene);
    })
    .catch((error) => {
      console.error("Error receiving map:", error);
    });
}

function getPoints(scene) {
  axios
    .get("http://localhost:3000/locations")
    .then((response) => {
      console.log("Locations received successfully:", response.data);
      let str = response.data;
      const numbers = str.match(/\d+/g).map(Number);
      knightPosition.x = numbers[0];
      knightPosition.y = numbers[1];
      finishPosition.x = numbers[2];
      finishPosition.y = numbers[3];
      initCharacters(scene);
    })
    .catch((error) => {
      console.error("Error receiving locations :", error);
    });
}

function create() {
  gamePaused = false;
  getMap(this);
  getPoints(this);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  knight = this.add.image(
    knightPosition.x * 64,
    knightPosition.y * 64,
    "knight",
  );
  knight.setOrigin(0, 0);
  knight.setDisplaySize(0, 0);
}

var directions = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

function update() {
  if (gamePaused) {
    this.scene.pause();
  }
  if (keyA.isDown) {
    knightPosition = moveTo(directions[0]);
  } else if (keyD.isDown) {
    knightPosition = moveTo(directions[1]);
  } else if (keyW.isDown) {
    knightPosition = moveTo(directions[2]);
  } else if (keyS.isDown) {
    knightPosition = moveTo(directions[3]);
  }
  knight.x = knightPosition.x * 64;
  knight.y = knightPosition.y * 64;
}

function winGame() {
  gamePaused = true;
  axios
    .post("http://localhost:3000/api/end", { nickname })
    .then((response) => {
      console.log("Information about game finish send: ", response.data);
    })
    .catch((error) => {
      console.error("Error sending information about game: ", error);
    });
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
    if (map != null) {
      if (map[currentknightPosition.x][currentknightPosition.y] === 1) {
        if (
          currentknightPosition.x === finishPosition.x &&
          currentknightPosition.y === finishPosition.y
        ) {
          winGame();
        }
      } else {
        currentknightPosition.x = knightPosition.x;
        currentknightPosition.y = knightPosition.y;
      }
    }
  } else {
    currentknightPosition.x = knightPosition.x;
    currentknightPosition.y = knightPosition.y;
  }
  return currentknightPosition;
}
