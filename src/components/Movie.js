import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import './Movie.css'

class Movie extends React.Component {
  render() {
    return (
      <>
        <h3 id="movieListHeader">Top Movies</h3>
        {
          this.props.movieData.length === 0 ? (
            <p id="noDataP">There are no movies associated with this city</p>
          )
              : ( 
                <div>
                  <Carousel id="movieCarousel">
                    {this.props.movieData.length && this.props.movieData.map((movie, index) => (
                      <Carousel.Item id="carouselItem" key={index}>
                        { movie.image_url
                          ?
                          <img 
                            className="d-block w-100"
                            src = {`https://image.tmdb.org/t/p/original/${movie.image_url}`}
                            alt={movie.title} />
                          : ''
                        }
                        <h5>{movie.title}</h5>
                        <p>Overview: {movie.overview}</p>
                        <p>Release Date: {movie.released_on}</p>
                        <p>Popularity: {movie.popularity}</p>
                        <p>Average Votes: {movie.average_votes}</p>
                        <p>Total Votes: {movie.total_votes}</p>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              )
        } 
      </>
    )
  }
}

export default Movie;
