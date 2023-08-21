import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import './Yelp.css'

class Yelp extends React.Component {
  render() {
    return (
      <>
        <h3 id="restaurantListHeader">Top Restaurants</h3>
        {
          this.props.yelpData.length === 0 ? (
            <p id="noDataP">There are no restaurants associated with this city</p>
          )
              : ( 
                <div>
                  <Carousel id="yelpCarousel">
                    {this.props.yelpData.length && this.props.yelpData.map((restaurant, index) => (
                      <Carousel.Item id="carouselItem" key={index}>
                        { restaurant.image_url
                          ?
                          <img 
                            className="d-block w-100"
                            src = {restaurant.image_url}
                            alt={restaurant.name} />
                          : ''
                        }
                        <h5>{restaurant.name}</h5>
                        <p>Price: {restaurant.price}</p>
                        <p>Rating: {restaurant.rating}</p>
                        <a href={restaurant.url}>Link to Yelp Review</a>
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

export default Yelp;
