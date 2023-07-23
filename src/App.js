import React from 'react';
import axios from 'axios'; // axios is an object that has several methods
import Table from 'react-bootstrap/Table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starWarsData: [],
      cityName: '',
      cityData: {},
      error: false,
    }
  }

  handleSWSubmit = async (event) => {
    event.preventDefault();

    try {
      // get the star Wars data from the API
      // .get() makes a request to an API
      // it takes in a URL as a parameter
      let swChars = await axios.get('https://www.swapi.tech/api/people/?page=1');
      // proof of life
      console.log(swChars.data.results);
      // save it in state
      this.setState({
        starWarsData: swChars.data.results,
        error: false
      });
    } catch(error) {
      this.setState({
        error: true
      })
    }

  }

  handleLocationSubmit = async (e) => {
    e.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;

    let cityData = await axios.get(url);

    this.setState({
      cityData: cityData.data[0]
    });
    // console.log(this.state.cityName);
    // console.log(cityData.data);
  }

  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }

  render() {
    console.log(this.state.cityData)
    let swList = this.state.starWarsData.map((char, idx) => {
      console.log(char);
      return <li key={idx}>{char.name}</li>
    });
    
    let cityDataArr = [this.state.cityData]
    console.log(cityDataArr)
    let cityDisplayedData = cityDataArr.map((city, index) => {
      return (
        <Table key={index} striped bordered hover>
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
      )
      })

    // mapURL variable goes here

    return (
      <>
        <h1>Data from an API</h1>
          {this.state.error
            ?
            <p>There was an error</p>
            :
            <ul>{swList}</ul>
          } 
          <form onSubmit={this.handleLocationSubmit}>
            <label>Search for a City:
              <input name="city" onChange={this.changeCityInput}/>
            </label>
            <button type="submit">Explore!</button>
          </form>
          <div>{cityDisplayedData}</div>
      </>
    )
  }
}


export default App;


/* 

 try {
      // the code you put inside the "try" block is kind of like the condition for an if else

    } catch(error) {
      // if the code in the try fails. the "catch code runs"

    }
  }

*/
