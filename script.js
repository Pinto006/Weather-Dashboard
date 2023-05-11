//Save city to from user to local storage
//use city name to get Long and Lat 
//use long and lat for second API fetch to gather data
//display current weather. humid, wind, temp, city name, date
//add class/div
//display 5 day weather. humid, wind, temp, city name, date
//add class/div
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityName');
var forecastContainerEl = document.querySelector('#fiveDayForecast');
var forecastSearchTerm = document.querySelector('#forecast-container');
var submitBtn = document.querySelector('.btn');
var fiveDayEl = document.querySelector('.fiveDayPlaceHolder');
var fiveDayDateEl = document.querySelector('.fiveDayDate');
var fiveDayTempEl = document.querySelector('.fiveDaytTemp');
var fiveDayWindEl = document.querySelector('.fiveDayWind');
var fiveDayHumidEl = document.querySelector('.fiveDayHumidity');
// var cityName = $("#cityName").val()


//save city name to local storage
$(".btn").on("click", function () {

    console.log(this);
    var cityName = $(this).siblings(".card-header").val();

    //save city to the local storage.
    // localStorage.setItem(cityName);
});
// $('#search-history .card-body').val(localStorage.getItem(".card-body"));


var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityInfo(city);
    }
};

var getCityInfo = function (cityName) { //question cityName
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=6d6d6cc45adb90e005966b8864829171`

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response[0]);
            // get city's longitude and latitude
            var cityLon = response[0].lon;
            var cityLat = response[0].lat;

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=6d6d6cc45adb90e005966b8864829171`)
                .then(function (response) {
                    return response.json();
                })
        
            .then(function (response) {
                console.log(response)
            
                fiveDayForecast(response);
            })
        })
};

// var displayCurrentWeather = function (response) {
//     console.log(potato)
//     response.list[0].main.humidity
// }

var fiveDayForecast = function (response) {
    document.querySelector('div').classList.remove('fiveDayEl');
    document.querySelector('div').classList.remove('fiveDayDateEl');
    document.querySelector('div').classList.remove('fiveDayTempEl');
    document.querySelector('div').classList.remove('fiveDayWindEl');
    document.querySelector('div').classList.remove('fiveDayHumidEl');

    document.querySelector('.fiveDayDateEl').textContent = response.list[0].clouds.dt_txt;
    document.querySelector('.fiveDayTempEl').textContent = response.list[0].main.temp;
    document.querySelector('.fiveDayWindEl').textContent = response.list[0].wind.speed;
    document.querySelector('.fiveDayHumidEl').textContent = response.list[0].main.humidity;
};

userFormEl.addEventListener('click', formSubmitHandler);
