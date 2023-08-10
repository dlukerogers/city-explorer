import React from "react";
import WeatherDay from "./WeatherDay";
import "./Weather.css"

class Weather extends React.Component {
  render() {
    return (
      <>
        {
          <ul>
            <WeatherDay weatherData={this.props.weatherData} />
          </ul>
        }
      </>
    )
  }
}

export default Weather;
