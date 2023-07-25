import React from 'react';
import axios from 'axios'; // axios is an object that has several methods
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
// import Alert from 'react-bootstrap/Alert';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      
    }
  }

  handleLocationSubmit = async (e) => {
    e.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;
      
    let cityData = await axios.get(url);
      
      this.setState({
        cityData: cityData.data[0]
      });
  }
  
  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }
  
  render() {
    let cityDataArr = [this.state.cityData]
    let cityDisplayedData = cityDataArr.map((city, index) => {
      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${city.lat},${city.lon}&zoom=12`
      return (
        <div key={index}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>City</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{city.display_name}</td>
                <td>{city.lat}</td>
                <td>{city.lon}</td>
              </tr>
            </tbody>
          </Table>
          <Image id='mapImg' src={mapURL} alt={city.display_name} rounded />
        </div>
      )
      })


    return (
      <main>
        <h1>City Explorer</h1>
          <form onSubmit={this.handleLocationSubmit}>
            <label>Search for a City:
              <input name="city" onChange={this.changeCityInput}/>
            </label>
            <button type="submit">Explore!</button>
          </form>
          
          <div id="cityDataDiv">{cityDisplayedData}</div>
      </main>
    )
  }
}


export default App;
