const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
  response.sendFile(__dirname + "/index.html");
});
app.post("/", function(request, response){
  console.log(request.body.cityName);

  const query = request.body.cityName;
  const apiKey = "ad44800cd16f1c17f665d0a98d8ccacf";
  const units = "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url, function(res){
    console.log(res.statusCode);

    res.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

      console.log(weatherDescription);
      console.log(temp);
      response.write("<p>weather is currently "+ weatherDescription +" .<p>");

      response.write("<h1>The temp in "+query+" is "+ temp +" Degree celcius</h1>");
      response.write("<img src="+imageURL+">");
      response.send();
    });
  });

});






app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
