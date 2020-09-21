const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("common"));

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("error");
});

app.get("/movies", (req, res) => {
  res.json(top10);
});

app.get("/", (req, res) => {
  res.send("Welcome to my movie list");
});

app.listen(8080, () => console.log("app running on port 8080"));
