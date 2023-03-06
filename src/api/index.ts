import axios from 'axios';

const apiKey = process.env.OPENWEATHER_API_KEY;

export const geoCodeApi = async (cityName: string) => axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const getCurrentWeatherApi = async (lat: number, lon: number) => axios.get(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));
