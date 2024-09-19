const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Namaste Node Js");
});

app.use("/home", (req, res) => {
  res.send("Home Page");
});

app.listen(1800, () => {
  console.log("Server listening successfully !!! ");
});
