//moment.js for today's date

//global variables
var cityNameEl = document.querySelector("#current-city-name");
var cityTempEl = document.querySelector("#current-city-temp");
var cityHumidityEl = document.querySelector("#current-city-hum");
var cityWindSpeedEl = document.querySelector("#current-city-wind");
var cityUvIndexEl = document.querySelector("#current-city-uv");
var forecastDateEl = document.querySelector("#one-date");
var appId = "221098603a041dd7e688a833d2e946ac"

//get coordinates from city
function getCoord(cityName) {
    var coordinates = null;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + appId)
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        var cityLat = responseJson.coord.lat;
        var cityLon = responseJson.coord.lon;
        coordinates = {
            latitude: cityLat,
            longitude: cityLon
        };
        return coordinates;
    })
}


// function to search for a city
function findCity() {
    
    var searchTerm = document.getElementById("cityName").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial" + "&appid=221098603a041dd7e688a833d2e946ac")
    .then(function(weatherResponse) {
        return weatherResponse.json();
    })
    .then(function(weatherResponse) {
        var namedCity = weatherResponse.name;
        var weatherGraphic = weatherResponse.weather[0].icon;
        var namedTemp = weatherResponse.main.temp;
        var namedHumidity = weatherResponse.main.humidity;
        var namedWindSpeed = weatherResponse.wind.speed;
        //display items for current city
        cityNameEl.innerHTML = "<h2>" + namedCity + "<img src= http://openweathermap.org/img/wn/" + weatherGraphic + ".png>" + "</h2>";
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
    .then(function(uvResponse) {
        var uvIndex = uvResponse.value;
        cityUvIndexEl.innerHTML = "<p>" + "UV Index: " + uvIndex + "</p>"; 
    })
    
};

//setting searched cities to localstorage
var list = JSON.parse(localStorage.getItem("prevCities")) || [];

function renderCities(list) {
    $("#cityNames").empty();
    
    //iterate over list
    for (var i = 0; i < list.length; i++) {
        var previousItem = $("<p>");
        previousItem.text(list[i]);
        previousItem.addClass("list-group list-group flush bg-light border text-center")
        $("#cityNames").append(previousItem);
    }
}

$("#search-for").on("click", function(event) {
    event.preventDefault();
    var previousItem = $("#cityName").val().trim();
    list.push(previousItem);
    renderCities(list);
    localStorage.setItem("prevCities", JSON.stringify(list));
    $("#cityName").val("");
});
renderCities(list);
//changing color of UV based on number:

//fetch and push forecast data

function forecastData() {
    var searchTerm = document.getElementById("cityName").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial" + "&appid=" + appId)
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        var cityLat = responseJson.coord.lat;
        var cityLon = responseJson.coord.lon;
        coordinates = {
            latitude: cityLat,
            longitude: cityLon
        };
        return coordinates;
    })
    .then(function(coordinates) {
        fetch("https://api.openweathermap.org/data/2.5/onecall?" + "&lat=" + coordinates.latitude + "&lon=" + coordinates.longitude + "&exclude=minutely,hourly,alerts&appid=" + appId)
        .then(function(response) {
            return response.json();
        })
        .then(function(responseJson) {
            console.log(responseJson);
        })    
        
    })
   
    
}
//converting universal time into usable JavaScript time, multiply by 1000 to get miliseconds for needed date
function convertUnixTime(timestamp) {
    return new Date(timestamp*1000).toLocaleDateString();
}     
        //var date = forecastResponse.list[i].dt_txt;
        //var weatherGraphic = forecastResponse.weather[i].icon;
        //var namedTemp = forecastResponse.main.temp;
        //var namedHumidity = forecastResponse.main.humidity;

        //dateEl.innerHTML = "<h2>" + date + "<img src= http://openweathermap.org/img/wn/" + weatherGraphic + ".png>" + "</h2>";
        //weatherGraphic.innerHTML = "<p>" + "Temperature: " + namedTemp + "&#176;F" + "</p>";
        //namedTemp.innerHTML = "<p>" + "Humidity: " + namedHumidity + "%" + "</p>";
        //namedHumidity.innerHTML = "<p>" + "Wind Speed: " + namedWindSpeed + " MPH" + "</p>";
        
        //iterate over each day
       /* for (var i = 0; i < list.length; i++) {
            var previousItem = $("<p>");
            previousItem.text(list[i]);
            previousItem.addClass("list-group list-group flush bg-light border text-center")
            $("#cityNames").append(previousItem);
        }
    
//appending data to Current Weather Card
//for symbol: weather.0.icon:
//for temp main.temp:
//for hum: main.humidity:
//for wind speed: main.wind*/