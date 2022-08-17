const express = require("express");
const https=require("https");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

// const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apiid+"&units="+units;
    
app.get('/', function(req, res)
{
    res.sendFile(__dirname+"/index.html");

    
} );

app.post("/",function(req, res)
{
    const cityname=req.body.cityName;
    const apiid="6b01e3032d78cb9c4d9e29986bc5ab14";
    const units=req.body.units;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apiid+"&units="+units;

    https.get(url, function(response){ 
            console.log(response.statusCode);
        
            response.on("data",function(data)
            {
                const whetherData=JSON.parse(data);
                const humidity=whetherData.main.humidity;
                const temp=whetherData.main.temp;
                // console.log(humidity);
                const icon=whetherData.weather[0].icon;
                const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
             
                res.write("<p>The current weather is "+whetherData.weather[0].description+"</p>");
                res.write("<h1>The humidity in "+cityname+" is "+humidity+"</h1>"); 
                res.write("the temparature is "+temp);
                res.write("<img src="+ imgurl +">");
                res.send() ;
            })
        
        
        
        });
        
    
    console.log(cityname);
});


// https.get(url, function(response){ 
//     console.log(response.statusCode);

//     response.on("data",function(data)
//     {
//         const whetherData=JSON.parse(data);
//         const humidity=whetherData.main.humidity;
//         console.log(humidity);
//         const icon=whetherData.weather[0].icon;
//         const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
     
//         res.write("<p>The current weather is "+whetherData.weather[0].description+"</p>");
//         res.write("<h1>The humidity in Madurai is "+humidity+"</h1>"); 
//         res.write("<img src="+ imgurl +">");
//         res.send() ;
//     })



// }


// )





app.listen(3000,function()
{
    console.log("app is listening at port 3000.");
});