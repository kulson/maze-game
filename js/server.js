const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  const currentTime = new Date();
  let seconds = currentTime.getSeconds();
  let message;
  if (seconds < 45) {
    message = "Game is running: ";
  } else {
    seconds -= 45;
    message = "Break: ";
  }
  res.send(`${message}${seconds}`);
});

app.post("/api/nickname", (req, res) => {
  const { nickname } = req.body;
  console.log("Received nickname:", nickname);
  res.send({ status: "success", message: "Nickname received" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
