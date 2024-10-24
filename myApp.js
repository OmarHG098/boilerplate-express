require("dotenv").config();
require("body-parser");
let express = require("express");
let app = express();
app.use("/public", express.static(__dirname + "/public"));
absolutePath = __dirname + "/views/index.html";
console.log("Hello World");
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});
app.get("/now", (req, res, next) =>{
    req.time = new Date().toString();
    next();
}, 
(req, res) =>{
    res.send({
        time: req.time
    });
});
app.get("/:word/echo", (req, res) => {
  let word = req.params.word;
  res.json({echo: word});
});
app.get("/name", (req, res)=>{
  let firstname = req.query.first;
  let lastname = req.query.last;
  res.json({name: `${firstname} ${lastname}`});
});
app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});


module.exports = app;
