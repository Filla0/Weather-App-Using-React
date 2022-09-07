import "./DailyWeather.css";
import "../HourlyWeather/HourlyWeather.css";
import { useContext } from "react";
import { CityContext } from "../../Context/CityContext";
import { ThemeContext } from "../../Context/ThemeContext";
import SingleDayWeather from "./SingleDayWeather";

export default function DailyWeather() {
  const { cityWeather } = useContext(CityContext);
  const { theme } = useContext(ThemeContext);

  const dailyWeather = cityWeather.daily.map((daily, index) => {
    return (
      <SingleDayWeather
        daily={daily}
        timezone={cityWeather.timezone}
        key={index}
        theme={theme}
      />
    );
  });

  return (
    <div className="daily-weather-wrapper">
      <div className="hourly-weather">
        <p className={`hourly-weather-title ${theme}-hourly-weather-title`}>
          Daily Weather
        </p>
        {dailyWeather}
      </div>
    </div>
  );
}
