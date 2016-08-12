const React = require('react');
const ReactDOM = require('react-dom');
const ExerciseStore = require('../stores/exercise_store.js');
const ExerciseActions = require('../actions/exercise_actions.js');

const ShowRoute = React.createClass({
  getInitialState () {
    return { markers: [], exercises: [] };
  },

  componentDidMount() {
    this.exerciseStoreListener = ExerciseStore.addListener(this._onChange);
    ExerciseActions.fetchAllExercises();
    this.initMap();
  },

  componentWillUnmount () {
    this.exerciseStoreListener.remove();
  },

  _onChange () {
    this.setState({ exercises: ExerciseStore.all() });
  },


  initMap () {
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: {lat: 40.7128, lng: -74.0059},
      zoom: 16,
      clickableIcons: false

    };

    this.map = new google.maps.Map(mapDOMNode, mapOptions);

    // this.searchBox();

    // this.map.addListener("click", (event) => {
    //   let marker = new google.maps.Marker ({
    //     position: event.latLng,
    //     map: this.map,
    //     draggable: false
    //   });
    //
    //
    //
    //   this.state.markers.push(marker);
    //
    //   if (this.state.markers.length > 1) {
    //
    //     this.setDirections(this.map, this.state.markers, this);
    //   }
    // });
    let numMarkers = Object.keys(this.props.route.map_info).length - 1;
    let mapInfo = this.props.route.map_info;
    let lat;
    let lng;
    let marker;

    for (var i = 0; i < numMarkers; i++) {
      lat = parseFloat(mapInfo[i].lat);
      lng = parseFloat(mapInfo[i].lng);
      marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map
      });
      this.state.markers.push(marker);

      if (this.state.markers.length > 1) {
        this.setDirections(this.map, this.state.markers, this);
      }
    }
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


    that.directionsService.route({
      origin: origin.position,
      destination: destination.position,
      waypoints: waypoints,
      travelMode: "WALKING"

    }, function(directionsResult, status) {

      if (status === 'OK') {
        that.directionsResult = directionsResult;
        that.renderStartEndMarkers();
        that.directionsDisplay.setDirections(directionsResult);

      } else {
        window.alert("Directions request failed due to " + status);
        that.markers = that.markers.slice(0,-2);
      }
    });


  },

  renderStartEndMarkers () {
    let start = this.state.markers[0];
    let stop = this.state.markers[this.state.markers.length - 1];
    start.setIcon('http://maps.google.com/mapfiles/kml/paddle/go.png');
    start.setTitle("Exercise 1");
    stop.setIcon('http://maps.google.com/mapfiles/kml/paddle/stop.png');
    stop.setTitle("Exercise " + this.state.markers.length);

    this.renderMiddleMarkers();
    // this.renderMarkerInfoWindows();
  },

  renderMiddleMarkers () {
    this.state.markers.slice(1,-1).forEach((marker, i)=> {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      marker.setTitle("Exercise " + (i + 2));

    });

  },

  renderMarkerInfoWindows() {

    let exercises = [];
    this.props.route.exercise_ids.forEach((id, i)=> {
      if (id === -1) {
        this.state.marker[i].info = new google.maps.InfoWindow({
          content: "Keep Running"
        });
      } else {
        for (var j = 0; i < this.state.exercises.length; i++) {
          if (this.state.exercises[j].id === id) {
            let contentString = `<b>${this.state.exercises[j].title}</b>` +
                                `<p>${this.state.exercises[j].description}</p>` +
                                `<p>Number of Reps: ${this.state.exercises[j].num_reps}</p>` +
                                `<p>Difficulty: ${this.state.exercises[j].difficulty}</p>`;
            this.state.marker[i].info = new google.maps.InfoWindow({
              content: contentString
            });
          }
        }
      }
    });

    this.state.markers.forEach((marker, i) => {
      marker.addListener('mouseover', () => {
        marker.info.open(this.map, marker);
        setTimeout(()=> marker.info.close(), 5000);

      });
    });
  },

  render() {
    return(
      <div className="map-modal" ref="map"></div>
    );
  }
});

module.exports = ShowRoute;
