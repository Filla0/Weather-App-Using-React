import { convertTime } from "../../Utils/ConvertTime";
import { Icon } from "@iconify/react";
import { getIcon, getIconColor } from "../../Utils/GetIconDetails";
import "./HourlyWeather.css";

export default function SingleHourWeather({ hourly, timezone }) {
  return (
    <div className="single-hour-weather">
      <p className="single-hour-weather-time">
        {convertTime(hourly.dt, timezone)}
      </p>
      <Icon
        icon={getIcon(hourly.weather[0].id, hourly.weather[0].icon)}
        color={getIconColor(hourly.weather[0].id, hourly.weather[0].icon)}
        width="40"
        height="40"
        // style={{ margin: "5px 0" }}
      />
      <p className="single-hour-weather-temp">
        {Math.round(hourly.temp)}&#176;
      </p>
    </div>
  );
}
