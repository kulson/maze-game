const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/api/nickname", (req, res) => {
  const { nickname } = req.body;
  console.log("Received nickname:", nickname);
  res.send({ status: "success", message: "Nickname received" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
