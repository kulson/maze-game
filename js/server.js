const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let pairs = [];

function gameSummary() {
  pairs.sort((a, b) => a.date - b.date);
}

app.get("/", (req, res) => {
  const currentTime = new Date();
  let seconds = currentTime.getSeconds();
  let message;
  if (seconds < 45) {
    seconds = 45 - seconds;
    message = "Game is running: ";
  } else {
    seconds -= 45;
    seconds = 15 - seconds;
    message = "Break: ";
  }
  res.send(`${message}${seconds}`);
});

app.post("/api/nickname", (req, res) => {
  const { nickname } = req.body;
  console.log("Received nickname:", nickname);
  res.send({ status: "success", message: "Nickname received" });
});

function append_pair(user, date) {
  pairs.push({ user: user, date: date });
}

app.post("/api/end", (req, res) => {
  const { nickname } = req.body;
  console.log("Received user who end game:", nickname);
  append_pair(nickname, new Date());
  res.send({ status: "success", message: "Information received" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
