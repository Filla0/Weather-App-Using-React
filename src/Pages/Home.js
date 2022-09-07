import { Link } from "react-router-dom";
import React, { useState, useContext, useRef, useEffect } from "react";
import { CityContext } from "../Context/CityContext";
import logo from "../image/logo.png";
import Fuse from "fuse.js";
import "./Home.css";
import Loader from "../Components/Loader/Loader";

export default function Home() {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { getWeather } = useContext(CityContext);
  const myRef = useRef();

  function handleChange(e) {
    setInput(e.target.value);
  }

  async function searchCity() {
    setIsLoading(true);
    const response = await fetch("./city.list.json");
    const cityList = await response.json();
    const fuse = new Fuse(cityList, {
      keys: ["name"],
      useExtendedSearch: true,
    });

    setCities(fuse.search(`=${input}`));
    setIsLoading(false);
  }
  useEffect(() => {
    myRef.current.focus();
  }, []);

  const searchResults =
    cities &&
    cities.map((city) => {
      return (
        <Link className="city-link" key={city.item.id} to="/weather">
          <div
            onClick={() => {
              getWeather(city.item.coord, city.item.name);
            }}
          >
            {city.item.state ? (
              <p>
                {city.item.name}, {city.item.state}, {city.item.country}
              </p>
            ) : (
              <p>
                {city.item.name}, {city.item.country}
              </p>
            )}
          </div>
        </Link>
      );
    });

  return (
    <div className={`home-container `}>
      <div className="header">
        <div className="home-logo">
          <img src={logo} alt="Logo" className="logo" />
          <h3>React Weather</h3>
        </div>
      </div>

      <div className="Home-body">
        <div className="Home-body-content">
          <div className="home-content">
            <h1 className="home-title">Check your weather</h1>
            <p className="home-sub-title">
              Check the current, hourly and daily weather for any city.
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="home-input-group"
            >
              <label htmlFor="cityInput">Type city name:</label>
              <input
                ref={myRef}
                placeholder="e.g. amsterdam"
                id="cityInput"
                type="text"
                value={input}
                onChange={handleChange}
              />
              <button
                disabled={!input}
                onClick={() => {
                  searchCity();
                }}
              >
                Search
              </button>
            </form>

            {isLoading ? (
              <Loader />
            ) : (
              cities &&
              (cities.length === 0 ? (
                <div className="city-not-found">
                  City not found. Try a different name.
                </div>
              ) : (
                <div className="city-link-list">{searchResults}</div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer">
          <a href="https://github.com/Filla0" className="footer-button">
            Build by Filimon
          </a>
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>
    </div>
  );
}
