import React from 'react';
import axios from 'axios'; // axios is an object that has several methods
import CityTable from './components/CityTable';
import Map from './components/Map';
import Error from './components/Error'
import CityForm from './components/CityForm';
import Weather from './components/Weather';
import MovieList from "./components/MovieList";
import YelpList from "./components/YelpList";
import Alert from 'react-bootstrap/Alert'
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      lat: '',
      lon: '',
      cityDisplayName: '',
      error: false,
      errorMessage: '',
      weather: [],
      weatherError: '',
      movies: [],
      movieError: '',
      yelp: [],
      yelpError: '',
    }
  }

  handleLocationSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;
      
      let cityData = await axios.get(url);
      let lat = cityData.data[0].lat;
      let lon = cityData.data[0].lon;
      let cityDisplayName = cityData.data[0].display_name;
      this.setState({
        lat: lat,
        lon: lon,
        cityDisplayName: cityDisplayName,
        cityData: cityData.data[0] 
      }, 
      () => {
        this.displayWeather(this.state.lat, this.state.lon);
        this.displayMovies(this.state.cityDisplayName);
        this.displayYelp(this.state.lat, this.state.lon);
      }
      )
      
      } catch(error) {
        console.log('error: ', error);
        console.log('error.message: ', error.message)
        this.setState({
          error: true,
          errorMessage: `An Error Occured: ${error.response ? error.response.status : error.message}`
        });
      }
    };

    displayWeather = async (lat, lon) => {
      let weatherData = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${lat}&lon=${lon}`;
      try {
        let weather = await axios.get(weatherData);
        this.setState({weather: weather.data});
      } catch (error) {
        console.log (`There is an error finding weather for the searched city: ${error.message}`);
        this.setState({weatherError: error.response.data});
      }
    };
    
    displayMovies = async (cityDisplayName) => {
      let cityName = cityDisplayName.split(",")[0];
      let movieData = `${process.env.REACT_APP_SERVER_URL}/movies?location=${cityName}`;
      try {
        let movies = await axios.get(movieData);
        this.setState({movies: movies.data});
      } catch (error) {
        console.log (`There is an error finding the movies for the searched city: ${error.message}`);
        this.setState({movieError: error.response.data});
      }
    }

    displayYelp = async (lat, lon) => {
      let yelpData = `${process.env.REACT_APP_SERVER_URL}/yelp?lat=${lat}&lon=${lon}`;
      try {
        let yelp = await axios.get(yelpData);
        this.setState({yelp: yelp.data});
      } catch (error) {
        console.log (`There is an error finding restaurants for the searched city: ${error.message}`);
        this.setState({yelpError: error.response.data});
      }
    }
  
    
  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    });
  };
    
  render() {    
    return (
      <main>
        <h1>City Explorer</h1>
        <CityForm 
          handleLocationSubmit={this.handleLocationSubmit}
          changeCityInput={this.changeCityInput}
        />
        {
          this.state.error
            ? <Error 
                errorMessage={this.state.errorMessage}
              />
            : null
        }
        {
          this.state.cityData && this.state.lat && this.state.lon ? (
            <div id="cityDataDiv">
              <CityTable 
                lat={this.state.lat}
                lon={this.state.lon}
                cityDisplayName={this.state.cityDisplayName}
              />
              <Map
                lat={this.state.lat}
                lon={this.state.lon}
                cityDisplayName={this.state.cityDisplayName}
              />
              {
                this.state.weatherError ? (
                  <Alert id="weatherError" variant="danger">{this.state.weatherError}</Alert>
                )
                  : <Weather weatherData={this.state.weather} />
              }
              {
                this.state.movieError ? (
                  <Alert id="movieError" variant="danger">{this.state.movieError}</Alert>
                )
                  : <MovieList movieData={this.state.movies} />
              }
              {
                this.state.yelpError ? (
                  <Alert id="yelpError" variant="danger">{this.state.yelpError}</Alert>
                )
                  : <YelpList yelpData={this.state.yelp} />
              }
            </div>
          ) : (<div>Please enter a valid city name</div>)
        }

      </main>
    )
  }
}


export default App;
