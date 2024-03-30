// require('dotenv').config()
import { Iweather } from "../Interfaces/Interfaces";
import { IForecast } from "../Interfaces/Interfaces";
const apiKey = process.env.REACT_APP_API_KEY; 

export const getWeather = async (location: string = 'stockton') => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`);
  const data: Iweather = await response.json();
  // console.log(`http://api.openweathermap.org/data/2.5/weather?q=${location}&id=${apiKey}`)
  // console.log(data)
  return data;
};

export const getForecast = async (location: string = 'stockton') => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`);
  const data: IForecast = await response.json();
  // console.log(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&id=${apiKey}`)
  // console.log(data)
  return data;
};