import getWeatherIcon from './weather-icons';

const API_KEY = '62c61d211434dcc26d714aa987bd7551';
const API_BASE = 'https://api.openweathermap.org/data/2.5/weather?q=Brno,cz&units=metric&lang=cz&appid=62c61d211434dcc26d714aa987bd7551';

export default class Weather {
    constructor() {

    }


    getWeatherData() {
        fetch(API_BASE)
        .then(response => response.json())
        .then(data => {
            this.showWeatherData(data);
        });
    }


    showWeatherData(data) {
        let sunriseDate = new Date(data.sys.sunrise * 1000);
        let sunriseHours = sunriseDate.getHours();
        let sunriseMinutes = sunriseDate.getHours();
        let sunsetDate = new Date(data.sys.sunset * 1000);
        let sunsetHours = sunsetDate.getHours();
        let sunsetMinutes = sunsetDate.getHours();
        let novaIkona = getWeatherIcon(data.weather[0].id, data.weather[0].icon);

        document.querySelector('#mesto').textContent = data.name;
        document.querySelector('#teplota').textContent = Math.round(data.main.temp);
        document.querySelector('#popis').textContent = data.weather[0].description;
        document.querySelector('#ikona').innerHTML = novaIkona;
        document.querySelector('#vitr').textContent = data.wind.speed.toFixed(1);
        document.querySelector('#vlhkost').textContent = data.main.humidity;
        document.querySelector('#vychod').textContent = sunriseHours + ':' + sunriseMinutes;
        document.querySelector('#zapad').textContent = sunsetHours + ':' + sunsetMinutes;
    }



}