import React from "react";
import Yelp from "./Yelp";

class YelpList extends React.Component {
  render() {
    return (
      <>
        {
          <ul>
            <Yelp yelpData={this.props.yelpData} />
          </ul>
        }
      </>
    )
  }
}

export default YelpList;
