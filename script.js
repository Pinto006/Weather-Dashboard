//Save city to from user to local storage
//use city name to get Long and Lat - done
//use long and lat for second API fetch to gather data - done
//display current weather. humid, wind, temp, city name, date
//add class/div
//display only 5 day weather. humid, wind, temp, city name, date
//add class/div
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityName');
var forecastContainerEl = document.querySelector('#fiveDayForecast');
var currentContainerEl = document.querySelector('.currentWeather');
var forecastSearchTerm = document.querySelector('#forecast-container');
var submitBtn = document.querySelector('.btn');
var fiveDayEl = document.querySelector('.fiveDayPlaceHolder');
var fiveDayDateEl = document.querySelector('.fiveDayDate');
var fiveDayTempEl = document.querySelector('.fiveDaytTemp');
var fiveDayWindEl = document.querySelector('.fiveDayWind');
var fiveDayHumidEl = document.querySelector('.fiveDayHumidity');
var searchHistoryEl = document.querySelector('#search-history');
var cityArray = [];
var city = cityInputEl.value;



//save city name to local storage
// $(".btn").on("click", function () {

//     console.log(this);
//     var cityName = $(this).siblings(".card-header").val();

// });



var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityInfo(city);
    }
};

var getCityInfo = function (cityName) { 
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=6d6d6cc45adb90e005966b8864829171`

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response[0]);
           
            var city = cityInputEl.value;
            // console.log(city);  working
            cityArray.push(city);
            localStorage.setItem('cities', JSON.stringify(cityArray)); // I see city name saved in LS
            // get city's longitude and latitude
            var cityLon = response[0].lon;
            var cityLat = response[0].lat;

            fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${cityLat}&lon=${cityLon}&appid=6d6d6cc45adb90e005966b8864829171`)
                .then(function (response) {
                    return response.json();
                })
        
            .then(function (response) {
                console.log("response",response)
            
                fiveDayForecast(response);
                displayCities();
                displayCurrentWeather(response);
            })
        })
};

var fiveDayForecast = function (data) {
    var fiveDayArray = data.list.filter(forecast => {
        var timeArray = forecast.dt_txt.split(" ")
        var time = timeArray[1]
        console.log("time", forecast.dt_txt.split(" ")[1].slice(0,2));


        return forecast.dt_txt.split(" ")[1].slice(0,2) === "12";})
    forecastContainerEl.innerHTML = "";
    fiveDayArray.forEach(data => {
        const div = document.createElement('div');
        const date = document.createElement('h2');
        const temp = document.createElement('h3');
        const wind = document.createElement('h3');
        const humidity = document.createElement('h3');

        div.classList = 'card'
        date.innerText = `${data.dt_txt}`
        temp.innerText = `Temp: ${data.main.temp}\u00B0 F`
        wind.innerText = `Wind: ${data.wind.speed}MPH`
        humidity.innerText = `Humidity: ${data.main.humidity}%`

        div.appendChild(date);
        div.appendChild(temp);
        div.appendChild(wind);
        div.appendChild(humidity);
        
        forecastContainerEl.appendChild(div);
    })
};
//function to display saved city name
function displayCities() {
    //Clear previous 
    searchHistoryEl.innerHTML = '';
    cityArray = JSON.parse(localStorage.getItem('cities'));
    // console.log(cityArray); working
    for (var i = 0; i < cityArray.length; i++) {
        console.log(cityArray[i]);
        // Create element and append
        var cityCell = document.createElement('button');
        cityCell.setAttribute("value",cityArray[i])
        // cityCell.innerText = cityInputEl.value;
        cityCell.textContent = cityArray[i];

        searchHistoryEl.appendChild(cityCell);
}};

//Attempting to add current weather//
var displayCurrentWeather = function (data) {
    var oneDayArray = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));
    currentContainerEl.innerHTML = "";
        console.log("data",data);
        const div = document.createElement('div');
         const cityName = document.createElement('h1');
        const date = document.createElement('h2');
        const temp = document.createElement('h3');
        const wind = document.createElement('h3');
        const humidity = document.createElement('h3');

        div.classList = 'card'
        cityName.innerText = data.city.name
        date.innerText = `${data.list[0].dt_txt}`
        temp.innerText = `Temp: ${data.list[0].main.temp}\u00B0 F`
        wind.innerText = `Temp: ${data.list[0].wind.speed}MPH`
        humidity.innerText = `Temp: ${data.list[0].main.humidity}%`

        div.appendChild(date);
        div.appendChild(cityName);
        div.appendChild(temp);
        div.appendChild(wind);
        div.appendChild(humidity);
        
        currentContainerEl.appendChild(div);
};

userFormEl.addEventListener('click', formSubmitHandler);
searchHistoryEl.addEventListener('click', function handleSearchHistory(event) {
    searchHistoryButton = event.target.value;
    if (searchHistoryButton) {
        getCityInfo(searchHistoryButton); 
        console.log("button",searchHistoryButton);
    } else {
        return
    };
   });
displayCities();
