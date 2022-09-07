import { useContext } from "react";
import "./HourlyWeather.css";
import { CityContext } from "../../Context/CityContext";
import { ThemeContext } from "../../Context/ThemeContext";
import SingleHourWeather from "./SingleHourWeather";

export default function HourlyWeather() {
  const { cityWeather } = useContext(CityContext);
  const { theme } = useContext(ThemeContext);
  const { hourly } = cityWeather;

  const hourlyWeather = hourly.map((hourly, index) => {
    return (
      <SingleHourWeather
        timezone={cityWeather.timezone}
        hourly={hourly}
        key={index}
      />
    );
  });
  return (
    <div className="hourly-weather-wrapper">
      <div className="hourly-weather">
        <p className={`hourly-weather-title ${theme}-hourly-weather-title`}>
          Hourly Weather
        </p>
        <div className="hourly-weather-content">{hourlyWeather}</div>
      </div>
    </div>
  );
}
