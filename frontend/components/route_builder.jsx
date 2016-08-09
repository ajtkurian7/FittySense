const React = require('react');
const ReactDOM = require('react-dom');
const RouteActions = require('../actions/route_actions.js');

const RouteBuilder = React.createClass({
  markers: [],
  componentDidMount() {
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: {lat: 40.7128, lng: -74.0059},
      zoom: 16
    };

    this.map = new google.maps.Map(mapDOMNode, mapOptions);

    this.map.addListener("click", (event) => {
      let marker = new google.maps.Marker ({
        position: event.latLng,
        map: this.map,
        title: "Exercise"
      });
      this.markers.push(marker);
      if (this.markers.length > 1) {

        this.setDirections(this.map, this.markers, this);
      }
    });




  },

  setDirections(map, markers, that) {
    let origin = markers[0];
    let waypoints = markers.slice(1,-1).map((marker) => {
      return { location: marker.position, stopover: true };
    });
    let destination = markers[markers.length - 1];

    let rendererOptions = {
      map: map,
      suppressMarkers: true,
    };

    that.directionsService = new google.maps.DirectionsService();
    that.directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    // that.directionsDisplay.setMap(map);
    // that.directionsDisplay.supressMarkers = true;

    that.directionsService.route({
      origin: origin.position,
      destination: destination.position,
      waypoints: waypoints,
      travelMode: "WALKING"

    }, function(directionsResult, status) {

      if (status === 'OK') {
        that.renderMarkers();
        console.log(directionsResult);
        that.directionsDisplay.setDirections(directionsResult);

      } else {
        window.alert("Directions request failed due to " + status);
        that.markers = that.markers.slice(0,-2);
      }
    });


  },

  renderMarkers () {
    let start = this.markers[0];
    let stop = this.markers[this.markers.length - 1];
    start.setIcon('http://maps.google.com/mapfiles/kml/paddle/go.png');
    stop.setIcon('http://maps.google.com/mapfiles/kml/paddle/stop.png');
    this.renderExerciseMarkers();
  },

  renderExerciseMarkers () {
    this.markers.slice(1,-1).forEach((marker, i)=> {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      marker.setTitle("Exercise " + (i + 1));


      marker.info = new google.maps.InfoWindow({
        content: `<div>${marker.getTitle()}</div>`,
      });

      marker.addListener('click', function() {
        marker.info.open(this.map, marker);
      });
    });
  },

  _handleClick(e) {

  },

  render () {
    return(
      <div className="route-builder">
        <div className="map" ref="map">Map</div>
        <button className="button" onClick={this._handleClick}>Submit</button>
      </div>
    );
  }
});

module.exports = RouteBuilder;
