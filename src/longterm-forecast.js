import getWeatherIcon from './weather-icons';
const API_BASE = 'https://api.openweathermap.org/data/2.5/forecast?q=Brno,cz&units=metric&lang=cz&appid=62c61d211434dcc26d714aa987bd7551';

export default class LongtermForecast {
    constructor() {

    }

    getLongtermForecastData() {
        fetch(API_BASE)
        .then(response => response.json())
        .then(data => {
            this.showLongtermForecastData(data);
        });
    }

    showLongtermForecastData(data) {
        let longtermForecast = document.querySelector('#predpoved');
        let html = '';
        
        // let pole=[ data['list'][8],data['list'][16],data['list'][24],data['list'][32] ];
        
        data['list']
        .reduce((accumulator, forecast, index) => {
            if (index != 0 && index % 8 == 0 && accumulator.length < 4) {
                accumulator.push(forecast);
            }
            
            return accumulator;
        }, [])
        .forEach(forecast => {
            let novaIkona = getWeatherIcon(forecast.weather[0].id, forecast.weather[0].icon);
            let weekdayDate = new Date(forecast.dt * 1000);
            let options = {weekday: 'long'};
            let weekdayFormat = new Intl.DateTimeFormat('cs', options).format(weekdayDate);
            let day = weekdayDate.getDate();
            let month = weekdayDate.getMonth();
            html += `
            <div class="forecast">
                <div class="forecast__day">
                ${weekdayFormat} ${day}. ${month}.
                     <!-- den v týdnu a datum, např.: Pondělí 22.4. -->
                </div>
                <div class="forecast__icon">${novaIkona}
                    <!-- HTML pro ikonu počasí, např.: <i class="wi wi-sunny-day"></i> -->
                </div>
                <div class="forecast__temp">${Math.round(forecast.main.temp)}°C</div>
            </div>
            `;
        });
        longtermForecast.innerHTML = html;
    }


}