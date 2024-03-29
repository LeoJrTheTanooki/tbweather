import {
  Badge,
  Button,
  Container,
  Heading,
  Input,
  Text,
  setDarkModeActivation,
} from "nes-ui-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import images from "../images";
import { getWeather, getForecast } from "../../DataServices/DataService";
import { IForecast, Iweather } from "../../Interfaces/Interfaces";
import WeatherInfoComponent from "../WeatherInfoComponent";

// Call a local storage item called dark-mode
// If dark-mode is nonexistent, create the item and set its key to false
// Make darkMode useState equal to whatever dark-mode item is
// If dark-mode item cannot be used, declare variable before it and make that equal to a boolean

const HomePageComponent = () => {
  // Variable data generated using LLM
  const weatherDefault: Iweather = {
    // Manually changed weather
    weather: [
      {
        id: 0,
        main: "???",
        description: "???",
        icon: "???",
      },
    ],
    base: "???",
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
    },
    clouds: {
      all: 0,
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      country: "???",
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: "???",
    cod: 0,
  };

  const forecastDefault: IForecast = {
    cod: 0,
    list: [
      {
        dt: 0,
        main: {
          temp: 0,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          sea_level: 0,
          grnd_level: 0,
          humidity: 0,
          temp_kf: 0,
        },
        weather: [],
        clouds: {
          all: 0,
        },
        wind: {
          speed: 0,
          deg: 0,
          gust: 0,
        },
        visibility: 0,
        pop: 0,
        sys: {
          pod: "???",
        },
        dt_txt: "???",
      },
    ],
    city: {
      timezone: 0,
    },
  };

  const [weather, setWeather] = useState<Iweather>(weatherDefault);

  const [forecast, setForecast] = useState<IForecast>(forecastDefault);

  const [iconDay2, setIconDay2] = useState<string>("");
  const [iconDay3, setIconDay3] = useState<string>("");
  const [iconDay4, setIconDay4] = useState<string>("");
  const [iconDay5, setIconDay5] = useState<string>("");

  const [tempDay2, setTempDay2] = useState<number>(0);
  const [tempDay3, setTempDay3] = useState<number>(0);
  const [tempDay4, setTempDay4] = useState<number>(0);
  const [tempDay5, setTempDay5] = useState<number>(0);

  const [humDay2, setHumDay2] = useState<number>(0);
  const [humDay3, setHumDay3] = useState<number>(0);
  const [humDay4, setHumDay4] = useState<number>(0);
  const [humDay5, setHumDay5] = useState<number>(0);

  const [dtDay2, setDtDay2] = useState<string>("");
  const [dtDay3, setDtDay3] = useState<string>("");
  const [dtDay4, setDtDay4] = useState<string>("");
  const [dtDay5, setDtDay5] = useState<string>("");

  // The new document.getElementbyId
  const searchValue = document.getElementById(
    "searchValue"
  ) as HTMLInputElement;

  const navSearchValue = document.getElementById(
    "navSearchValue"
  ) as HTMLInputElement;

  const testId = document.getElementById("testId") as HTMLInputElement;

  // console.log(testId)

  const currentIcon = (iconCodeLocation: string) => {
    switch (iconCodeLocation) {
      case "01d":
        return images.clear;
      case "01n":
        return images.clearNight;
      case "02d":
        return images.fewClouds;
      case "02n":
        return images.fewCloudsNight;
      case "03d":
        return images.partCloudy;
      case "03n":
        return images.partCloudyNight;
      case "04d":
        return images.cloudy;
      case "04n":
        return images.cloudyNight;
      case "09d":
        return images.rain;
      case "09n":
        return images.rainNight;
      case "10d":
        return images.lightRain;
      case "10n":
        return images.lightRainNight;
      case "11d":
        return images.storm;
      case "11n":
        return images.stormNight;
      case "13d":
        return images.snow;
      case "13n":
        return images.snowNight;
      case "50d":
        return images.fog;
      case "50n":
        return images.fogNight;
      default:
        return images.unknown;
    }
  };

  const currentDay = (dtNum: number) => {
    switch (dtNum) {
      case 0:
        return "Sun.";
      case 1:
        return "Mon.";
      case 2:
        return "Tue.";
      case 3:
        return "Wed.";
      case 4:
        return "Thu.";
      case 5:
        return "Fri.";
      case 6:
        return "Sat.";
    }
  };

  const getData = async (search: string = "Stockton") => {
    const weatherData = await getWeather(search);
    const forecastData = await getForecast(search);
    if (weatherData.cod != 404) {
      setWeather(weatherData);
      setForecast(forecastData);

      // console.log(weatherData);
      // console.log(forecastData);

      // Assigning to variables for readability
      let dayTestData = forecastData.list.filter((obj) => {
        let dateVar = new Date(
          (obj.dt + forecastData.city.timezone) * 1000
        ).toTimeString();
        if (
          dateVar.includes("12:00:00") ||
          dateVar.includes("11:00:00") ||
          dateVar.includes("10:00:00")
        ) {
          return true;
        } else {
          return false;
        }
      });

      let day2Data = dayTestData[1];

      // new Date((day2Data.dt + forecastData.city.timezone) * 1000).toTimeString()

      // console.log(dayTestData);

      // forecastData.list.forEach;

      // console.log(
      //   new Date(
      //     (day2Data.dt + forecastData.city.timezone) * 1000
      //   ).toTimeString()
      // );

      // Plan to set clock to correct time(?)
      // 1. Change dt_txt to dt
      // 2. Add timezone_offset to dt
      // 3. Convert new dt to readable time
      // 4. See if new readable time incldes 12:00:00, if not 11:00:00 or 13:00:00, etc. ("12:00:00" || "11:00:00" || "13:00:00" || "10:00:00" || "14:00:00")
      //                                                                                  Recommended to format like this since it checks 12 first and the next after if 12 isn't found

      let day3Data = dayTestData[2];

      let day4Data = dayTestData[3];

      let day5Data = dayTestData[4];

      // console.log(forecastData.list.findIndex((obj) => obj === day2));
      // setDay2Index(forecastData.list.findIndex((obj) => obj === day2Data));
      // setDay3Index(forecastData.list.findIndex((obj) => obj === day3Data));
      // setDay4Index(forecastData.list.findIndex((obj) => obj === day4Data));
      // setDay5Index(forecastData.list.findIndex((obj) => obj === day5Data));

      setIconDay2(day2Data.weather[0].icon);
      setIconDay3(day3Data.weather[0].icon);
      setIconDay4(day4Data.weather[0].icon);
      setIconDay5(day5Data.weather[0].icon);

      setTempDay2(day2Data.main.temp);
      setTempDay3(day3Data.main.temp);
      setTempDay4(day4Data.main.temp);
      setTempDay5(day5Data.main.temp);

      setHumDay2(day2Data.main.humidity);
      setHumDay3(day3Data.main.humidity);
      setHumDay4(day4Data.main.humidity);
      setHumDay5(day5Data.main.humidity);

      setDtDay2(day2Data.dt_txt);
      setDtDay3(day3Data.dt_txt);
      setDtDay4(day4Data.dt_txt);
      setDtDay5(day5Data.dt_txt);

      // console.log(forecastData.city.timezone)
      // console.log(day2Data.dt * 1000);
      // console.log((day2Data.dt + forecastData.city.timezone) * 1000);
      // console.log(new Date((day2Data.dt + forecastData.city.timezone) * 1000).toTimeString());
      // console.log(new Date(day2Data.dt * 1000).toTimeString());
      // console.log(new Date((day2Data.dt + forecastData.city.timezone) * 1000).getDay());
      // console.log(new Date(day2Data.dt * 1000).getDay());
    } else {
      setWeather(weatherDefault);
      setForecast(forecastDefault);

      setIconDay2("?");
      setIconDay3("?");
      setIconDay4("?");
      setIconDay5("?");

      setTempDay2(0);
      setTempDay3(0);
      setTempDay4(0);
      setTempDay5(0);

      setHumDay2(0);
      setHumDay3(0);
      setHumDay4(0);
      setHumDay5(0);

      setDtDay2("???");
      setDtDay3("???");
      setDtDay4("???");
      setDtDay5("???");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid justify-center">
      <div className="flex items-center justify-end">
        <Input type="search" name="" id="searchValue" />
        <a onClick={() => getData(searchValue.value)}>
          <img className="h-16 w-16" src={images.searchIcon} alt="" />
        </a>
      </div>
      <Container className="w-max">
        {/* <Input ref={inputRef} type="text" name="locationInput"></Input> */}
        <div className="grid grid-cols-4 justify-items-center gap-y-8">
          <div className="col-span-4 grid grid-cols-3 justify-items-start">
            <div>
              <img
                className="h-64 w-64"
                src={currentIcon(weather.weather[0].icon)}
                alt="???"
              />
            </div>
            <div className="???">
              <Text size="xlarge" className=" underline">
                {weather && weather.name}, {weather && weather.sys.country}{" "}
              </Text>
              <Text size="xlarge">{weather && weather.weather[0].main}</Text>
              <Text size="xlarge">
                {weather && Math.round(weather.main.temp)}°F
              </Text>
              <Text size="xlarge">
                MAX:{weather && Math.round(weather.main.temp_max)}° MIN:
                {weather && Math.round(weather.main.temp_min)}°
              </Text>
              <Text size="xlarge">HUM:{weather && weather.main.humidity}%</Text>
              <Text size="xlarge">
                {weather && new Date(weather.dt * 1000).toLocaleDateString()}
              </Text>
            </div>
            <div className=" justify-self-end">
              <img
                className="h-16 w-16 opacity-50"
                src={images.unfavedIcon}
                alt="???"
              />
            </div>
          </div>
          <Container roundedCorners className="p-3 text-center flex flex-col">
            <div className="flex justify-center">
              <img
                className="h-16 w-16"
                src={currentIcon(iconDay2)}
                alt="???"
              />
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{currentDay(new Date(dtDay2).getDay())}</Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{Math.round(tempDay2)}°</Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{humDay2}%</Text>
            </div>
          </Container>
          <Container roundedCorners className="p-3 text-center flex flex-col">
            <div className="flex justify-center">
              <img
                className="h-16 w-16"
                src={currentIcon(iconDay3)}
                alt="???"
              />
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{currentDay(new Date(dtDay3).getDay())}</Text>{" "}
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{Math.round(tempDay3)}°</Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{humDay3}%</Text>
            </div>
          </Container>
          <Container roundedCorners className="p-3 text-center flex flex-col">
            <div className="flex justify-center">
              <img
                className="h-16 w-16"
                src={currentIcon(iconDay4)}
                alt="???"
              />
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{currentDay(new Date(dtDay4).getDay())}</Text>{" "}
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{Math.round(tempDay4)}°</Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{humDay4}%</Text>
            </div>
          </Container>
          <Container roundedCorners className="p-3 text-center flex flex-col">
            <div className="flex justify-center">
              <img
                className="h-16 w-16"
                src={currentIcon(iconDay5)}
                alt="???"
              />
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{currentDay(new Date(dtDay5).getDay())}</Text>{" "}
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{Math.round(tempDay5)}°</Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{humDay5}%</Text>
            </div>
          </Container>
        </div>
      </Container>
      Not too fond of being forced London's time zones... time currently set to
      PDT
    </div>
  );
};

export default HomePageComponent;
