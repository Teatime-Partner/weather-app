// import css to style the weather display
import "./current-weather.css";

// create a child function to display current weather data after async API call from parent resolves
// data is passed from the Parent in App.js
const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          {/* pass details of the city location and brief description of weather with icon */}
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.current.condition.text}</p>
        </div>
        <img alt="weather" className="weather-icon" src={data.current.condition.icon} />
      </div>
      <div className="bottom">
        {/* pass details regarding temperature and selected parameters */}
        <p className="temperature">{data.current.temp_c}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">
              <strong>Details</strong>
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{data.current.feelslike_c}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.current.wind_kph} km/h</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.current.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.current.pressure_mb} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
