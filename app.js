const express = require ("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");

    app.post("/", function(req,res){
        console.log(req.body.cityName)

        const city = req.body.cityName;
        const apiKey = "2840bde18503b7e703b39e3c92a64138";
        const unit = "metric"

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey +"&units=" + unit ;
        https.get(url, function(response){
        console.log(response);

        response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        res.write("<h1>Temperature in "+ req.body.cityName + " = " + temp + " degree Celsius</h1>");
                
        const description = weatherData.weather[0].description;
        res.write("<p>The Weather Descrpition is " + description + "</p>");

                
        console.log(weatherData);
        })
    })
    })


    
})






app.listen(3000, function(){
    console.log("Server is running on port 3000");
})