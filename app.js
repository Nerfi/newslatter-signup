
const express = require("express");
const app = express();
//requesting bodyParser
const bodyParser = require("body-parser");

//adding request
const request = require('request');
//adding port
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
  const config = require("./config.js");
const myKey = config.MY_KEY;


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

  const first = req.body.First;
  const last = req.body.Last;
  const email = req.body.email;

// this piece of code comes from the DOCS of mailchip
  const data = {
      members: [
        {
          email_address: email ,
         status: "subscribed",
         merge_fields: {
          FNAME: first,
          LNAME: last
         }
       }
      ]
  };

    //turning the JS object into JSON
      const dataJson = JSON.stringify(data);

    //making API request usign request module
    const options = {
      url: 'https://us4.api.mailchimp.com/3.0/lists/5047c3168f',
      method: "POST",
      headers: {
        "Authorization": "juan " + myKey
      },
      body: dataJson

// line38 headers is the easiest way to authorize myself for any API using http and request module
    }

    request(options, function(error, response, body) {
         if(error){
          res.sendFile(__dirname + "/failure.html");
          res.send("there was an error")
         }else {
          res.sendFile(__dirname + "/succes.html");
         }
    })
})

//creatying our failure route

app.post("/failure", function(req,res) {

  //when we get to the failure page we redirect the user to the home page
  res.redirect("/");
});
