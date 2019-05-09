import Weather from './weather';
import LongtermForecast from './longterm-forecast';

let weather = new Weather();

weather.getWeatherData();

let longtermForecast = new LongtermForecast();

longtermForecast.getLongtermForecastData();
