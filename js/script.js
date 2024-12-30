var ROWS = 12;
var COLS = 12;

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

var game = new Phaser.Game(config);

var knight;

function preload() {
  this.load.image("knight", "assets/knight.png?v=3");
  this.load.image("finish", "assets/finish.png");
  this.load.image("block", "assets/block.png");
}

function initMap() {
  console.log(map);
  let arr = [];
  for (const x of map) {
    if (x === "1") {
      arr.push(1);
    }
    if (x === "0") {
      arr.push(0);
    }
  }
  let nArr = [];
  while (arr.length > 0) {
    nArr.push(arr.splice(0, 11));
  }
  for (let i = 0; i < nArr.length; i++) {
    for (let j = 0; j < nArr[i].length; j++) {
      console.log(nArr[i][j]);
      if (nArr[i][j] === 0) {
        let block = this.add.image(i * 32, j * 32, "block");
        block.setDisplaySize(64, 64);
      }
    }
  }
}

function getMap() {
  axios
    .get("http://localhost:3000/map")
    .then((response) => {
      console.log("Map received successfully:", response.data);
      map = response.data;
      initMap();
    })
    .catch((error) => {
      console.error("Error received map:", error);
    });
}

function create() {
  getMap();
  knight = this.add.image(0, 0, "knight");
  knight.setOrigin(0, 0);
  knight.setDisplaySize(64, 64);
  let finish = this.add.image(gameWidth - 32, gameHeight - 32, "finish");
  finish.setDisplaySize(64, 64);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
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

function endGame() {
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
    if (
      currentknightPosition.x === ROWS - 1 &&
      currentknightPosition.y === COLS - 1
    ) {
      endGame();
    }
  } else {
    currentknightPosition.x = knightPosition.x;
    currentknightPosition.y = knightPosition.y;
  }
  return currentknightPosition;
}
