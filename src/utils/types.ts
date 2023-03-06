export interface IUser {
  name: string;
  nickname: string;
  picture: string;
}

export interface ICity {
  name: string;
  lat: number;
  lon: number;
  country: string,
  state: string;
}

export interface IWeather {
  id?: number;
  main: string;
  description: string;
  icon: string;
}

interface IMainDetails {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface IWeatherApiResponse {
  weather: IWeather[];
  main: IMainDetails;
  dt: number;
}
