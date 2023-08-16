import React from "react";
import Image from 'react-bootstrap/Image';
import './Map.css'

class Map extends React.Component {


  render() {
    return (
      <Image 
        id='mapImg' 
        src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.lat},${this.props.lon}&zoom=12`} 
        alt={this.props.cityDisplayName} 
        rounded 
      />
    )
  }
}

export default Map;
