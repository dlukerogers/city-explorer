import React from 'react';
import axios from 'axios'; // axios is an object that has several methods

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starWarsData: []
    }
  }

  handleSWSubmit = async (event) => {
    event.preventDefault();
    // get the star Wars data from the API
    // .get() makes a request to an API
    // it takes in a URL as a parameter
    let swChars = await axios.get('https://www.swapi.tech/api/people/?page=1');
    // proof of life
    console.log(swChars.data.results);
    // save it in state
    this.setState({
      starWarsData: swChars.data.results
    });
  }

  render() {
    let swList = this.state.starWarsData.map((char, idx) => {
      console.log(char);
      return <li key={idx}>{char.name}</li>
    })

    return (
      <>
        <h1>Data from an API</h1>
          <form onSubmit={this.handleSWSubmit}>
            <button type="submit">Display Star Wars data</button>
          </form>
          <ul>{swList}</ul>
      </>
    )
  }
}

export default App;
