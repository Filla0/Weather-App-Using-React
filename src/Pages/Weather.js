import { Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { CityContext } from "../Context/CityContext";
import { ThemeContext } from "../Context/ThemeContext";
import CardContainer from "../Containers/CardContainer";
import CurrentWeather from "../Components/CurrentWeather/CurrentWeather";
import HourlyWeather from "../Components/HourlyWeather/HourlyWeather";
import DailyWeather from "../Components/DailyWeather/DailyWeather";
import Loader from "../Components/Loader/Loader";
import { convertTime } from "../Utils/ConvertTime";
import { Icon } from "@iconify/react";
import "./Weather.css";

export default function Weather() {
  const {
    cityName,
    cityCoord,
    cityWeather,
    clearState,
    isError,
    getWeather,
    isLoading,
  } = useContext(CityContext);
  const { theme } = useContext(ThemeContext);
  const [currentUnits, setCurrentUnits] = useState("metric");
  const isInitialMount = useRef(true);

  window.onpopstate = function (e) {
    clearState();
  };

  window.onhashchange = function (e) {
    clearState();
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      clearState();
      getWeather(cityCoord, cityName, currentUnits);
    }
  }, [currentUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChange(e) {
    setCurrentUnits(e.target.value);
  }
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      {isError ? (
        <h2 style={{ textAlign: "center", marginTop: "2em" }}>
          There was an error. Please try again.
        </h2>
      ) : cityWeather && cityWeather.length !== 0 ? (
        <div className={`weather-container ${theme}-weather-container`}>
          <header className="weather-header">
            <Link to="/">
              <button
                className="weather-header-back-btn"
                onClick={() => clearState()}
              >
                {
                  <Icon
                    icon="akar-icons:chevron-left"
                    width="25px"
                    height="25px"
                  />
                }
              </button>
            </Link>
            <h2 className="weather-header-city-name">
              {cityName},{" "}
              <span>
                {convertTime(cityWeather.current.dt, cityWeather.timezone)}
              </span>
            </h2>
            <form className="weather-header-units-form">
              <label className={currentUnits === "metric" ? "checked" : ""}>
                <input
                  type="radio"
                  name="currentUnits"
                  value="metric"
                  id="metricRadio"
                  checked={currentUnits === "metric"}
                  onChange={handleChange}
                />
                Metric - &#176;C, m/s
              </label>

              <label className={currentUnits === "imperial" ? "checked" : ""}>
                <input
                  type="radio"
                  name="currentUnits"
                  value="imperial"
                  id="imperialRadio"
                  checked={currentUnits === "imperial"}
                  onChange={handleChange}
                />
                Imperial - &#176;F, mph
              </label>
            </form>
          </header>

          <CardContainer className="current-weather-area">
            <CurrentWeather unit={currentUnits} />
          </CardContainer>
          <CardContainer className="hourly-weather-area">
            <HourlyWeather />
          </CardContainer>
          <CardContainer className="daily-weather-area">
            <DailyWeather />
          </CardContainer>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
