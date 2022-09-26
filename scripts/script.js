// c05f4ef647660e16f03781574660274c
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

document.body.onload = () => {
    setTimeout(function(){
        let preloader = document.querySelector('.preloader-wrap');
        if(!preloader.classList.contains('.preloader-wrap--done')) {
            preloader.classList.add('preloader-wrap--done')
        }
    }, 1000)
}

const input = document.querySelector("#enterCity");
const btn = document.querySelector(".weather-page__btn");
const nameCity = document.querySelector(".weather-page__title");
const descriptionWether = document.querySelector(".weather-page__description");
const cityTemp = document.querySelector(".weather-page__deg");
const cityWindSpeed = document.querySelector(".weather-page__wind-speed");
const pressure = document.querySelector(".weather-page__pressure");
const speakerBtn = document.querySelector('.weather-page__speak');


let city = 'London';

async function init() {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ua&appid=c05f4ef647660e16f03781574660274c`)
    .then(resp => { return resp.json()})
    .then(data => {
        nameCity.innerHTML = data.name;
        descriptionWether.innerHTML = data.weather[0].description;
        cityTemp.innerHTML = `${temperature()}°`;
        cityWindSpeed.innerHTML = `Швидкість вітру: ${data.wind.speed} м/с`;
        pressure.innerHTML = `Тиск: ${data.main.pressure} гПа`;
        
        let getWether = data.weather[0].main;

        if(getWether === 'Rain') {
            document.body.style.background = 
        'url(./img/rain.jpg) center / cover no-repeat';
        } else if(getWether === 'Clear') {
            document.body.style.background = 
        'url(./img/sunny.jpg) center / cover no-repeat';
        } else if(getWether === 'Extreme') {
            document.body.style.background = 
        'url(./img/thand.jpg) center / cover no-repeat';
        } else if(getWether === 'Snow') {
            document.body.style.background = 
        'url(./img/snowy.jpg) center / cover no-repeat';
        } else {
            document.body.style.background = 
        'url(./img/always.jpg) center / cover no-repeat';
        }

        function temperature() {
            let getTemp = data.main.temp;
            let tempC = Math.floor(getTemp) - 273;
            return tempC
        }
    })
};

btn.addEventListener('click', () => {
    if (input.value === "") {
        alert("This city is not found!")
    } else {
        city = input.value;
    }
    init();
})

init()

setInterval(() => {
    init()
}, 30000);

//* SPEAKER ========================================================================================================================================================

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition();

speakerBtn.addEventListener('click', (event) => {
    recognition.start();
    if(recognition) speakerBtn.classList.add("weather-page__speak--active")
    recognition.addEventListener('result', (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join();
        city = transcript;
        input.value = transcript
        setTimeout(() => {
            speakerBtn.classList.remove(("weather-page__speak--active"))
            init()
        }, 100)
    })
    event.preventDefault();
})
