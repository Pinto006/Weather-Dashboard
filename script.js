var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityName');
var forecastContainerEl = document.querySelector('#5DayForecast');
var forecastSearchTerm = document.querySelector('#forecast-container');

var getCityInfo = function (cityName) {
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=6d6d6cc45adb90e005966b8864829171'

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // get city's longitude and latitude
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

        fetch('https://api.openweathermap.org/geo/1.0/reverse?lat={cityLat}&lon={cityLon}&limit={limit}&appid=6d6d6cc45adb90e005966b8864829171')
            .then(function (response) {
                return response.json();
            })    
                .then(function(response){
                    displayWeather(cityName);
        });