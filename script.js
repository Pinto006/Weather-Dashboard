const iconEl = document.querySelector('.icons');
const tempEl = document.querySelector('.temp');
const windEl = document.querySelector('.wind');
const humidEl = document.querySelector('.humidity');
const cityNameEl = document.querySelector('#cityName');
const currentDayEl = document.querySelector('#currentDay');
const weatherEl = document.querySelector('.weather');
const searchBtn = document.getElementById('searchBtn');
// const requestUrl = "https://api.openweathermap.org/data/2.5/forecast?${lat}&${long}&appid=6d6d6cc45adb90e005966b8864829171";
const requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=${city name}&appid=6d6d6cc45adb90e005966b8864829171";

const Kelvin = 273;

const weather = {
    temperature: {
        value: 65,
        unit: "fahrenheit"
    },
    date: "05/05/2023",
    wind: "20 MPH",
    humidity: '15%'
};

weather.temperature = {
    unit: "fehrenheit"
};

function setPosition(city) {
    const lat = city.coord.lat;
    const long = city.coord.long;

    getWeather(lat, long);
};

function displayWeather () {
    cityNameEl.innerHTML = `${weather.city}`;
    tempEl.innerHTML = `${weather.temperature.value}`;
    windEl.innerHTML = `${weather.wind.value}`;
    humidEl.innerHTML = `${weather.humidity.value}`;
};
//convert temp to F
function kelvIntoFahrenheit (temperature) {
  tempEl=((temperature-273.15) * 9/5 + 32)
};

function getWeather() {
    console.log(fetch(requestUrl))
    fetch(requestUrl) //promise
        .then(function(response) { // THEN run code 
            console.log(response)
        return response.json(); //returns another promise
    })
    .then(function(data){ // promise chain
        console.log(data);
            var long = response.coord.lon;
            var lat = response.coord.lat;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=imperial&appid=6d6d6cc45adb90e005966b8864829171`)
                // get response from one call api and turn it into objects
                .then(function(response) {
                    return response.json();
                })
    // for (var i = 0; i < data.list.length; i++) {
    //     console.log(data);
    //     var Temp = document.createElement('li');
    //     //     // windEl = document.append('p');
    //     // // humidEl = document.append('p');
     
    //     Temp.textContent = data.list[i].main.temp;
      
    //     currentDayEl.appendChild(Temp);
    })};  
       
    //     weather.wind.value=data.wind.speed;
    //     weather.humidity.value=data.main.humidity;
    //     weather.city= data.name;
    // })
    // .then(function(){
    //     displayWeather();
    // });
// })};

searchBtn.addEventListener('click', getWeather);
