import React, { useState } from "react";

const CityContext = React.createContext();

const CityContextProvider = (props) => {
  const [cityWeather, setCityWeather] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityCoord, setCityCoord] = useState({});
  const [canAccessRoute, setCanAccessRoute] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = async (coord, name, units = "metric") => {
    setCanAccessRoute(true);
    if (!coord.lat) {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely&units=${units}&appid=73f5d06948a97be32fae7d28866c0345`;
    setIsLoading(true);
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCityWeather(data);
      setCityName(name);
      setCityCoord(coord);
      setIsLoading(false);
    } else {
      setIsError(true);
    }
  };

  const clearState = () => {
    setCanAccessRoute(false);
    setCityWeather([]);
  };

  return (
    <CityContext.Provider
      value={{
        canAccessRoute,
        cityName,
        cityCoord,
        cityWeather,
        getWeather,
        clearState,
        isError,
        isLoading,
      }}
    >
      {props.children}
    </CityContext.Provider>
  );
};

export { CityContextProvider, CityContext };
