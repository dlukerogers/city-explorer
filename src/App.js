import React from 'react';
import axios from 'axios'; // axios is an object that has several methods
import CityTable from './components/CityTable';
import Map from './components/Map';
import Error from './components/Error'
import CityForm from './components/CityForm';
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
    }
  }

  handleLocationSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;
      
      let cityData = await axios.get(url);
      let lat = cityData.data[0].lat;
      let lon = cityData.data[0].lon;
      this.setState({
        lat: lat,
        lon: lon
      })
      let cityDisplayName = cityData.data[0].display_name;
      this.setState({
        cityDisplayName: cityDisplayName
      })
      this.setState(
        { cityData: cityData.data[0] },
        );
      } catch(error) {
        console.log('error: ', error);
        console.log('error.message: ', error.message)
        this.setState({
          error: true,
          errorMessage: `An Error Occured: ${error.response.status}`
        });
      }
    }
  
    
  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }
    
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
            : console.log('no error')
        }
        {this.state.cityData ? 
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
          </div>
          : <div>City not found</div>
        }

      
      </main>
    )
  }
}


export default App;
