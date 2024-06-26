import {
  Container,
  Input,
  Text,
} from "nes-ui-react";
import { useEffect, useState } from "react";
import images from "../images";
import { getWeather, getForecast } from "../../DataServices/DataService";
import { IForecast, Iweather } from "../../Interfaces/Interfaces";

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

  const [dtDay2, setDtDay2] = useState<number>(0);
  const [dtDay3, setDtDay3] = useState<number>(0);
  const [dtDay4, setDtDay4] = useState<number>(0);
  const [dtDay5, setDtDay5] = useState<number>(0);

  // The new document.getElementbyId
  const searchValue = document.getElementById(
    "searchValue"
  ) as HTMLInputElement;

  const navSearchValue = document.getElementById(
    "navSearchValue"
  ) as HTMLInputElement;
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
      default:
        return "???";
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
      let forecastList = forecastData.list.filter((obj) => {
        let dateVar = new Date(
          (obj.dt + forecastData.city.timezone) * 1000
        ).toString();
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

      let todaysDay = new Date(
        (weatherData.dt + weatherData.timezone) * 1000
      ).getDay();

      let forecastDay = new Date(
        (forecastList[0].dt + forecastData.city.timezone) * 1000
      ).getDay();

      if (forecastDay !== todaysDay + 1) {
        forecastList.shift();
      }

      let day2Data = forecastList[0];

      let day3Data = forecastList[1];

      let day4Data = forecastList[2];

      let day5Data = forecastList[3];

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

      setDtDay2((day2Data.dt + forecastData.city.timezone) * 1000);
      setDtDay3((day3Data.dt + forecastData.city.timezone) * 1000);
      setDtDay4((day4Data.dt + forecastData.city.timezone) * 1000);
      setDtDay5((day5Data.dt + forecastData.city.timezone) * 1000);
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

      setDtDay2(0);
      setDtDay3(0);
      setDtDay4(0);
      setDtDay5(0);
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
        <div className="grid grid-cols-2 min-[460px]:grid-cols-4 justify-items-center gap-y-8">
          <div className=" col-span-2 min-[460px]:col-span-4 grid md:grid-cols-3 justify-items-start gap-y-8 w-full">
            <div className="order-2 md:order-1 justify-self-center">
              <img
                className="h-64 w-64"
                src={currentIcon(weather.weather[0].icon)}
                alt="???"
              />
            </div>
            <div className="order-3 md:order-2 md:col-span-1 justify-self-center">
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
                {weather &&
                  new Date(
                    (weather.dt + weather.timezone) * 1000
                  ).toDateString()}
              </Text>
              <Text size="xlarge">
                {weather &&
                  new Date(
                    (weather.dt + weather.timezone) * 1000
                  ).getUTCHours() +
                    ":" +
                    new Date(
                      (weather.dt + weather.timezone) * 1000
                    ).getUTCMinutes()}
              </Text>
            </div>
            <div className="order-1 md:order-3 justify-self-end">
              <a title="Favorites Coming Soon">
                <img
                  className="h-16 w-16 opacity-50"
                  src={images.unfavedIcon}
                  alt="???"
                />
              </a>
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
    </div>
  );
};

export default HomePageComponent;
