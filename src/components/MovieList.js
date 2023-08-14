import React from "react";
import Movie from "./Movie";

class MovieList extends React.Component {
  render() {
    return (
      <>
        {
          <ul>
            <Movie movieData={this.props.movieData} />
          </ul>
        }
      </>
    )
  }
}

export default MovieList;
