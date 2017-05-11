import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

const RoadToRestoGooleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={props.center} >

    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

class RestoLocator extends Component {
  constructor() {
    super();

    this.state = {
      directions: null,
    }

  }

  componentDidMount() {
    const DirectionsService = new window.google.maps.DirectionsService();

    const { origin, destination } = this.props;

    DirectionsService.route({
      origin: new window.google.maps.LatLng(origin.latitude, origin.longitude),
      destination: new window.google.maps.LatLng(destination.latitude, destination.longitude),
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  render() {
    const { origin } = this.props;

    return (
      <div className="resto-locator">
        <RoadToRestoGooleMap
          containerElement={
            <div style={{ height: `400px`, width: `500px`, margin: "auto" }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          center={new window.google.maps.LatLng(origin.latitude, origin.longitude)}
          directions={this.state.directions}
        />
      </div>
    );
  }
}

export default RestoLocator;