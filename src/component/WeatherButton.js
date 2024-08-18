import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({
  cities,
  onCityClick,
  onCurrentLocationClick,
  activeCity,
}) => {
  return (
    <div>
      <Button
        variant={activeCity === "current" ? "primary" : "info"}
        onClick={onCurrentLocationClick}
      >
        Current Location
      </Button>{" "}
      {cities.map((item) => (
        <Button
          key={item}
          variant={activeCity === item ? "primary" : "info"}
          onClick={() => onCityClick(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
