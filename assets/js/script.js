//moment.js for today's date

//global variables
var cityNameEl = document.querySelector("#current-city-name");

var cityTempEl = document.querySelector("#current-city-temp");
var cityHumidityEl = document.querySelector("#current-city-hum");
var cityWindSpeedEl = document.querySelector("#current-city-wind");

//prevent enter from reloading page


// function to search for a city
function findCity() {
    
    var searchTerm = document.getElementById("cityName").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial" + "&appid=221098603a041dd7e688a833d2e946ac")
    .then(function(weatherResponse) {
        return weatherResponse.json();
    })
    .then(function(weatherResponse) {
        console.log(weatherResponse);
        var namedCity = weatherResponse.name;
        var weatherGraphic = weatherResponse.weather[0].id;
        var namedTemp = weatherResponse.main.temp;
        var namedHumidity = weatherResponse.main.humidity;
        var namedWindSpeed = weatherResponse.wind.speed;
        //display items for current city
        cityNameEl.innerHTML = "<h2>" + namedCity + weatherGraphic + "</h2>";
        cityTempEl.innerHTML = "<p>" + "Temperature: " + namedTemp + "&#176;F" + "</p>";
        cityHumidityEl.innerHTML = "<p>" + "Humidity: " + namedHumidity + "%" + "</p>";
        cityWindSpeedEl.innerHTML = "<p>" + "Wind Speed: " + namedWindSpeed + " MPH" + "</p>";
        

        var cityLat = weatherResponse.coord.lat;
        var cityLon = weatherResponse.coord.lon;
        return fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=221098603a041dd7e688a833d2e946ac");
        
    })
    .then(function(uvResponse) {
        return uvResponse.json();
    })
    .then (function(uvResponse) {
        var uvIndex = uvResponse.value;
        
    })
    
};

//appending data to Current Weather Card
//for symbol: weather.0.icon:
//for temp main.temp:
//for hum: main.humidity:
//for wind speed: main.wind: