const iconEl = document.querySelector('.icons');
const tempEl = document.querySelector('.temp');
const windEl = document.querySelector('.wind');
const humidEl = document.querySelector('.humidity');
const cityNameEl = document.querySelector('#cityName');
const weatherEl = document.querySelector('.weather');
const key = '6d6d6cc45adb90e005966b8864829171';
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

function setPosition(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    getWeather(longitude, latitude);
};

// dispalyWeather (){
//     cityNameEl.innerHTML = `${weather.city}`;
//     tempEl.innerHTML = `${weather.temperature.value}`;
//     windEl.innerHTML = `${weather.wind.value}`;
//     humidEl.innerHTML = `${weather.humidity.value}`;
// }

function kelvIntoFahrenheit (temperature) {
  tempEl=((temperature-273.15) * 9/5 + 32)
};

function getWeather(latitude, longitude) {
    let api = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=6d6d6cc45adb90e005966b8864829171`;
    console.log(api);
}

//     fetch(api).then( function(response) {
//         weather.temperature.value=Math.floor(data.main.temp - Kelvin);
//         weather.humidity.value=data.main.humidity;
//         weather.city= data.name;
//         let data = response.json();
//         return data;
//     })
//     .then(function(){
//         dispalyWeather();
//     });
// }