import "./DailyWeather.css";
import { Icon } from "@iconify/react";
import { getIcon, getIconColor } from "../../Utils/GetIconDetails";
import { getDay, getDate } from "../../Utils/ConvertTime";

export default function SingleDayWeather({ daily, timezone, theme }) {
  return (
    <div className={`single-day-weather ${theme}-single-day-weather`}>
      <p className="single-day-weather-day">
        {getDay(daily.dt, timezone)}, <span>{getDate(daily.dt, timezone)}</span>
      </p>
      <div className="right-align-content">
        <p className="single-day-weather-temp">
          {Math.round(daily.temp.min)}&#176;/{Math.round(daily.temp.max)}&#176;
        </p>
        <Icon
          icon={getIcon(daily.weather[0].id, daily.weather[0].icon)}
          color={getIconColor(daily.weather[0].id, daily.weather[0].icon)}
          height="25px"
          width="25px"
        />
      </div>
    </div>
  );
}
