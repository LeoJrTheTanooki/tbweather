import { Iweather } from "../Interfaces/Interfaces";
import { IForecast } from "../Interfaces/Interfaces";

export const getWeather = async (location: string = 'stockton', apiKey: string = '524901&appid=acfbb5d1a1b814a2931225281e2d44da') => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&id=${apiKey}&units=imperial`);
  const data: Iweather = await response.json();
  // console.log(`http://api.openweathermap.org/data/2.5/weather?q=${location}&id=${apiKey}`)
  // console.log(data)
  return data;
};

export const getForecast = async (location: string = 'stockton', apiKey: string = '524901&appid=acfbb5d1a1b814a2931225281e2d44da') => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&id=${apiKey}&units=imperial`);
  const data: IForecast = await response.json();
  // console.log(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&id=${apiKey}`)
  // console.log(data)
  return data;
};