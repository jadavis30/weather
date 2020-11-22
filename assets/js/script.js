// function to search for a city
function findCity() {
    var searchTerm = document.getElementById("cityName").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm +"&appid=221098603a041dd7e688a833d2e946ac")
    .then(function(weatherResponse) {
        return weatherResponse.json();
    })
    .then(function(weatherResponse) {
        console.log(weatherResponse);
        var searchedCity = weatherResponse.name;
        //display at top of current city card
        var cityWeatherEl = document.querySelector("#searched-city");
        cityWeatherEl.innerHTML = "<h2>" + searchedCity + "</h2>";
         
    });
}

//appending data to Current Weather Card
//for symbol: weather.0.icon:
//for temp main.temp:
//for hum: main.humidity:
//for wind speed: main.wind: