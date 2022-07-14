const express = require("express");
const app = express();
const port = 4000;

// Run the server.js (or index.js if the name is diferent) with "npx nodemon"
// If we write "http GET :4000/" we trigger this middleware
function loggingMiddleware(req, res, next) {
  const currentTime = new Date();
  // This message appear in the terminal where the server is running
  console.log(`Request recieved at: ${currentTime}`);
  // This message appear in the terminal where we write the request
  res.setHeader("X-Codaisseur-Time", currentTime);
  next();
}

function failRandomlyMiddleware(req, res, next) {
  if (Math.random() * 2 >= 1) {
    next();
  } else {
    res.status(500).end();
  }
}

app.use(loggingMiddleware);

app.get("/", failRandomlyMiddleware, (req, res) =>
  res.send("Hello via middleware")
);
app.get("/foo", (req, res) => res.send("Hello"));

app.listen(port, () => console.log(`Hello Gonzalo from port ${port}!`));
