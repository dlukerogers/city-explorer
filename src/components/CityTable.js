import React from "react";
import Table from 'react-bootstrap/Table';
import "./CityTable.css"

class CityTable extends React.Component {


  render() {
    return (
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
            <td>{this.props.cityDisplayName}</td>
            <td>{this.props.lat}</td>
            <td>{this.props.lon}</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default CityTable;
