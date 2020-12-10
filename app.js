const express = require("express");
const https = require("https");
//For getting data from index.html
const bodyParser = require("body-parser");

const app = express();

//To use body parser in app
app.use(bodyParser.urlencoded({extended:true}));

//To present the index.html
app.get("/",function (req, res) {
     res.sendFile(__dirname + "/index.html")    
})

//To post back to the site
app.post("/",function (req,res) {
    
    //Input data from index.html 
    console.log(req.body.cityName);
    // To request data from server using API in this case Weathermap
    const city = req.body.cityName;
    const apiKey = "1bb17f90bcd5f331b1aa3937d4245768";
    const unit = "metric";

    //To create the URL
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey+"&units="+ unit;
    
    //HTTPS request to get the Data
    https.get(url, function (response) {
        
        //To get status code
        console.log(response.statusCode);

        //To get only the data
        response.on("data",function (data) {

        //To convert hexadecimal data into JSON format
        const weatherData = JSON.parse(data);
        console.log(weatherData);
            
        //To get specific data
        const temp = weatherData.main.temp;
        const feelsLike = weatherData.main.feels_like;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

        //For img url we just have to get icon code in the below url which is provided in the documentation
        const iconurl = "http://openweathermap.org/img/wn/" +icon+"@2x.png";
        console.log(temp);      
        console.log(feelsLike);    
        console.log(description);

        //If we want to send multiple lines we use res.write
        res.write("<h1>The Temperature in "+ city + " is " + temp + " degree Celsius</h1>");
        res.write("<p>The Weather condition is " + description + ".</p>");
        res.write("<img src=" +iconurl+ ">");
        res.send();

        })
    })

})


//Is to bind the connections and to specify the PORT    
app.listen(3500)