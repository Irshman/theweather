// c05f4ef647660e16f03781574660274c
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

let input = document.querySelector("#enterCity");
let btn = document.querySelector(".weather-page__btn");
let nameCity = document.querySelector(".weather-page__title");
let descriptionWether = document.querySelector(".weather-page__description");
let cityTemp = document.querySelector(".weather-page__deg");
let cityWindSpeed = document.querySelector(".weather-page__wind-speed");
let pressure = document.querySelector(".weather-page__pressure");

let city = 'London';

btn.addEventListener('click', () => {
    if (input.value === "") {
        alert("This city is not found!")
    } else {
        city = input.value;
    }
})

async function init() {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c05f4ef647660e16f03781574660274c`)
    .then(resp => { return resp.json()})
    .then(data => {
        nameCity.innerHTML = data.name;
        descriptionWether.innerHTML = data.weather[0].description;
        cityTemp.innerHTML = `${temperature()}°`;
        cityWindSpeed.innerHTML = `Wind speed: ${data.wind.speed} m/s`;
        pressure.innerHTML = `Pressure: ${data.main.pressure} hPa`;
        
        let getWether = data.weather[0].main;

        if(getWether === 'Rain') {
            document.body.style.background = 
        'url(../img/rain.jpg) center / cover no-repeat';
        } else if(getWether === 'Clear') {
            document.body.style.background = 
        'url(../img/sunny.jpg) center / cover no-repeat';
        } else if(getWether === 'Extreme') {
            document.body.style.background = 
        'url(../img/thand.jpg) center / cover no-repeat';
        } else if(getWether === 'Snow') {
            document.body.style.background = 
        'url(../img/snowy.jpg) center / cover no-repeat';
        } else {
            document.body.style.background = 
        'url(https://github.com/Irshman/theweather/blob/main/img/always.jpg) center / cover no-repeat';
        }

        function temperature() {
            let getTemp = data.main.temp;
            let tempC = Math.floor(getTemp) - 273;
            return tempC
        }
    })
};

init();

setInterval(() => {
    init()
}, 30000);
