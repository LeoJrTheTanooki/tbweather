import { Heading, Text } from "nes-ui-react";
import React from "react";
import images from "./images";
import { Iweather } from "../Interfaces/Interfaces";

const WeatherInfoComponent = (props: Iweather) => {
  return (
    <div className="col-span-4 grid grid-cols-3 justify-items-start">
    <div>
      <img className="h-64 w-64" src={images.fewClouds} alt="" />

    </div>
    <div className="">
      <Heading size="xlarge">{props.name}, {}</Heading>
      <Text size="xlarge">58°F</Text>
      <Text size="xlarge">Partially Cloudy</Text>
      <Text size="xlarge">H:61° L:43°</Text>
      <Text size="xlarge">Monday 3:00 PM</Text>
    </div>
    <div className=" justify-self-end">
      <Text size="xlarge">Location</Text>
      <img className="h-16 w-16" src={images.unfavedIcon} alt="" />
    </div>
  </div>
  );
};

export default WeatherInfoComponent;
