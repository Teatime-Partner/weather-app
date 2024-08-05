// import componens and API values
import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/currrentWeather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useState } from "react";

function App() {
  // create useState for current weather, set as empty
  const [currrentWeather, setCurrentWeather] = useState(null);

  // create a function to pass data from weather API to Search child component
  // searchData == user input location
  const handleOnSearchChange = (searchData) => {
    //obtain details for API url to generate correct location
    const [lat, lon] = searchData.value.split(" ");
    // fetch current weather API using async function
    fetch(`${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}`)
      .then((response) => response.json())
      .then((weatherResponse) => {
        // set useState
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      {/* pass search event handle to child to obtain location */}
      <Search onSearchChange={handleOnSearchChange} />
      {/* ensure currentWeather is valid and pass response from API onto child */}
      {currrentWeather && <CurrentWeather data={currrentWeather} />}
    </div>
  );
}

export default App;
