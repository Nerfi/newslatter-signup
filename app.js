const express = require("express");
const app = express();
//requesting bodyParser
const bodyParser = require("body-parser");
//adding port
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

// in order to render static files we need to use the
//static method of express by passing "public" we

app.use(express.static("public"));

app.listen(port, function(req,res){
  console.log("express working bitch");
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

//post request
app.post("/signup", function(req, res){
  res.send("working");
})
