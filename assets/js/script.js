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
        fetch("https://api.openweathermap.org/data/2.5/onecall?" + "&lat=" + coordinates.latitude + "&lon=" + coordinates.longitude + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + appId)
        .then(function(response) {
            return response.json();
        })
        .then(function(responseJson) {
            var fiveDayForecast = responseJson.daily.slice(1,6); 
            for (var i = 0; i < fiveDayForecast.length; i++) {
                renderFutureForecast(fiveDayForecast[i]);
            }
            renderCurrentForecast(searchTerm, responseJson.current);
        })    
    
    })
   
    
}

function renderCurrentForecast(namedCity, currentForecast) {
    var weatherGraphic = currentForecast.weather[0].icon;
    var namedTemp = currentForecast.temp;
    var namedHumidity = currentForecast.humidity;
    var namedWindSpeed = currentForecast.wind_speed;
    var uvIndex = currentForecast.uvi;
        
    //display items for current city
    cityNameEl.innerHTML = "<h2>" + namedCity + getWeatherIconImg(weatherGraphic) + "</h2>";
    cityTempEl.innerHTML = "<p>" + "Temperature: " + namedTemp + "&#176;F" + "</p>";
    cityHumidityEl.innerHTML = "<p>" + "Humidity: " + namedHumidity + "%" + "</p>";
    cityWindSpeedEl.innerHTML = "<p>" + "Wind Speed: " + namedWindSpeed + " MPH" + "</p>";
    cityUvIndexEl.innerHTML = "<p>" + "UV Index: " + uvIndex + "</p>";
}

function renderFutureForecast(futureForecast) {
    var cardDivEl = document.createElement("div");
    cardDivEl.classList.add("card", "text-white", "bg-info");
    var divEl = document.createElement("div");
    divEl.classList.add("card-body");
    var dateDivEl = document.createElement("div");
    dateDivEl.classList.add("card-title");
    dateDivEl.innerText = convertUnixTime(futureForecast.dt);
    divEl.appendChild(dateDivEl);
    var paraEl1 = document.createElement("p");
    paraEl1.classList.add("card-text");
    paraEl1.innerHTML = getWeatherIconImg(futureForecast.weather[0].icon);
    divEl.appendChild(paraEl1);
    var paraEl2 = document.createElement("p");
    paraEl2.classList.add("card-text");
    paraEl2.innerHTML = "Temp: " + futureForecast.temp.day + "&#176;F";
    divEl.appendChild(paraEl2);
    var paraEl3 = document.createElement("p");
    paraEl3.classList.add("card-text");
    paraEl3.innerText = "Humidity: " + futureForecast.humidity + "%";
    divEl.appendChild(paraEl3);
    var dailyForecastEl = document.getElementById("daily-forecast");
    cardDivEl.appendChild(divEl);
    dailyForecastEl.appendChild(cardDivEl);
}

function getWeatherIconImg(name) {
    return "<img src= http://openweathermap.org/img/wn/" + name + ".png>"
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