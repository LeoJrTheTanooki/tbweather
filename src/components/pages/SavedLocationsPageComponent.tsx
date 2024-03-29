import { Container } from "nes-ui-react";
import React from "react";
import images from "../images";
import { Text } from "nes-ui-react";

const SavedLocationsPageComponent = () => {
  return (
    <div className="px-32">
      <Text size="xlarge">Saved Locations</Text>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex justify-center">
          <Container
            className="px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Location"
          >
            <div className="grid">
              <img className="h-16 w-16 span-2" src={images.fewClouds} alt="" />
              <div>
                <Text size="xlarge">58°F</Text>
                <Text size="xlarge">61°/43°</Text>
              </div>
              <div className="flex justify-end">
                <img className="h-16 w-16" src={images.favedIcon} alt="" />
              </div>
              <Text className="col-span-3" size="xlarge">
                Mon. 03:00PM
              </Text>
              <Text className="col-span-3" size="xlarge">
                GMT/UTC+3
              </Text>
            </div>
          </Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
        <div className="flex justify-center">
          <Container
            className="opacity-50 px-4 w-[256px] h-[144px]"
            alignTitle="left"
            title="Empty"
          ></Container>
        </div>
      </div>
    </div>
  );
};

export default SavedLocationsPageComponent;
