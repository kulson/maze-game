import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import schedule from "node-schedule";

import { generate, startowe } from "./generate-maze.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let pairs = [];

var ROWS = 8;
var COLS = 8;

var grid = generate(ROWS, COLS);
var points = startowe(ROWS, COLS, grid);
var startPoint = points.start;
var endPoint = points.end;

function gameSummary() {
  pairs.sort((a, b) => a.date - b.date);
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

app.get("/api", (req, res) => {
  const currentTime = new Date();
  let seconds = currentTime.getSeconds();
  res.send(`${seconds}`);
});

app.get("/api/map", (req, res) => {
  res.send(grid);
});

app.get("/api/locations", (req, res) => {
  res.send(`${startPoint.x} ${startPoint.y} ${endPoint.x} ${endPoint.y}`);
});

app.get("/api/scoreboard", (req, res) => {
  res.send(pairs);
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
