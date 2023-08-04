import React from "react";
import Card from "react-bootstrap/Card";
import "./WeatherDay.css"

class WeatherDay extends React.Component {
  render() {
    return (
      <>
        <h3 id="forecastHeader">Weather Forecast</h3>
        {this.props.weatherData.map((day, idx) => (
          <Card id="weatherCard" key={idx}>
            <Card.Body>
              <Card.Title>{day.date}</Card.Title>
              <Card.Text>{day.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>
    )
  }
}

export default WeatherDay
