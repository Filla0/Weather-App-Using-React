import "./App.css";
import Home from "./Pages/Home";
import Weather from "./Pages/Weather";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { CityContext } from "./Context/CityContext";

const App = () => {
  const { canAccessRoute } = useContext(CityContext);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/weather"
          element={canAccessRoute ? <Weather /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
