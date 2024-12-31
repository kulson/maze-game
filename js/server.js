const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const schedule = require("node-schedule");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

function generate(rows, cols) {
  let kol = [];
  let anc = new Array(rows * cols);
  let mass = new Array(rows * cols).fill(1);

  function find_ancestor(node, anc) {
    if (anc[node] !== node) anc[node] = find_ancestor(anc[node], anc);
    return anc[node];
  }

  function kruskal() {
    kol.sort((a, b) => a[0] - b[0]);

    let mst = Array.from({ length: 2 * rows - 1 }, () =>
      Array(2 * cols - 1).fill(0),
    );

    while (kol.length) {
      let [_, u, v, k] = kol.pop();

      let first_anc = find_ancestor(u, anc);
      let second_anc = find_ancestor(v, anc);

      if (first_anc !== second_anc) {
        if (mass[first_anc] < mass[second_anc]) {
          anc[first_anc] = second_anc;
          mass[second_anc] += mass[first_anc];
        } else {
          anc[second_anc] = first_anc;
          mass[first_anc] += mass[second_anc];
        }
        let uRow = Math.floor(u / cols);
        k == 0
          ? (mst[2 * uRow - 1][(u % cols) * 2] = 1)
          : (mst[2 * uRow][(u % cols) * 2 + 1] = 1);
      }
      for (let i = 0; i < 2 * rows; i += 2)
        for (let j = 0; j < 2 * cols; j += 2) mst[i][j] = 1;
    }

    return mst;
  }

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      anc[i * cols + j] = i * cols + j;
      if (i > 0) {
        let weight = Math.random() * (rows - Math.sqrt(rows));
        if (cols > Math.floor(Math.sqrt(rows) * rows)) {
          kol.push([weight + rows / 10, i * cols + j, (i - 1) * cols + j, 0]);
        } else {
          kol.push([weight, i * cols + j, (i - 1) * cols + j, 0]);
        }
      }
      if (j < cols - 1) {
        let weight = Math.random() * (rows - Math.sqrt(rows));
        if (rows > Math.floor(Math.sqrt(cols) * cols)) {
          kol.push([weight + rows / 10, i * cols + j, i * cols + j + 1, 1]);
        } else kol.push([weight, i * cols + j, i * cols + j + 1, 1]);
      }
    }
  }
  return kruskal();
}

function startowe(rows, cols, mst) {
  let vis = Array.from({ length: 2 * rows - 1 }, () =>
    Array(2 * cols - 1).fill(false),
  );
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(x, y, distance) {
    vis[x][y] = true;
    let farthest = { x, y, distance };

    for (let [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < 2 * rows - 1 &&
        ny < 2 * cols - 1 &&
        !vis[nx][ny] &&
        mst[nx][ny] === 1
      ) {
        let result = dfs(nx, ny, distance + 1);
        if (result.distance > farthest.distance) {
          farthest = result;
        }
      }
    }

    return farthest;
  }

  let startX = Math.floor(Math.random() * (2 * rows - 1));
  let startY = Math.floor(Math.random() * (2 * cols - 1));
  while (mst[startX][startY] !== 1) {
    startX = Math.floor(Math.random() * (2 * rows - 1));
    startY = Math.floor(Math.random() * (2 * cols - 1));
  }
  vis = Array.from({ length: 2 * rows - 1 }, () =>
    Array(2 * cols - 1).fill(false),
  );
  let farthest1 = dfs(startX, startY, 0);

  vis = Array.from({ length: 2 * rows - 1 }, () =>
    Array(2 * cols - 1).fill(false),
  );
  let farthest2 = dfs(farthest1.x, farthest1.y, 0);

  return {
    start: { x: farthest1.x, y: farthest1.y },
    end: { x: farthest2.x, y: farthest2.y },
  };
}

let pairs = [];

var ROWS = 7;
var COLS = 7;

var grid = generate(ROWS, COLS);
console.log(grid);
var points = startowe(ROWS, COLS, grid);
var startPoint = points.start;
var endPoint = points.end;

function gameSummary() {
  pairs.sort((a, b) => a.date - b.date);
  console.log(pairs);
}

const startBreak = schedule.scheduleJob("45 * * * * *", function () {
  gameSummary();
});

const startGame = schedule.scheduleJob("0 * * * * *", function () {
  pairs = [];
  grid = generate(ROWS, COLS);
  points = startowe(ROWS, COLS, grid);
  startPoint = points.start;
  endPoint = points.end;
});

app.get("/", (req, res) => {
  const currentTime = new Date();
  let seconds = currentTime.getSeconds();
  res.send(`${seconds}`);
});

app.get("/map", (req, res) => {
  res.send(grid);
});

app.get("/locations", (req, res) => {
  res.send(`${startPoint.x} ${startPoint.y} ${endPoint.x} ${endPoint.y}`);
});

app.post("/api/nickname", (req, res) => {
  const { nickname } = req.body;
  console.log("Received nickname:", nickname);
  res.send({ status: "success", message: "Nickname received" });
});

app.post("/api/end", (req, res) => {
  const { nickname } = req.body;
  console.log("Received user who end game:", nickname);
  pairs.push(nickname, new Date().getSeconds());
  res.send({ status: "success", message: "Information received" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
