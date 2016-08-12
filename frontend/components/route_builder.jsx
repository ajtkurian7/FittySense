const React = require('react');
const ReactDOM = require('react-dom');
const RouteActions = require('../actions/route_actions.js');
const ExerciseStore = require('../stores/exercise_store.js');
const RouteStore = require('../stores/route_store.js');
const ExerciseActions = require('../actions/exercise_actions.js');
const Modal = require('react-modal');
const modalMapStyle = require('./modal_map_style.js');
const hashHistory = require("react-router").hashHistory;
const ExerciseSelector = require("./exercise_selector.jsx");
const RouteSubmitForm = require("./route_submit_form.jsx");

const RouteBuilder = React.createClass({


  getInitialState() {
    return (
      {
        exercises: [],
        markers: [],
        modalOpen: false,
        selectedMarker: "",
        exerciseSelect: false
      }
    );
  },

  componentDidMount() {
    this.exerciseStoreListener = ExerciseStore.addListener(this._onExerciseChange);
    this.routeStoreListener = RouteStore.addListener(this._onRoutesChange);
    ExerciseActions.fetchAllExercises();
    this.initMap();
  },

  componentWillUnmount() {
    this.exerciseStoreListener.remove();
    this.routeStoreListener.remove();
  },

  _onExerciseChange() {
    this.setState({ exercises: ExerciseStore.all() });
  },

  _onRoutesChange() {
    hashHistory.push("/routes");
  },

  initMap () {
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: {lat: 40.7128, lng: -74.0059},
      zoom: 16,
      clickableIcons: false

    };

    this.map = new google.maps.Map(mapDOMNode, mapOptions);

    this.searchBox();

    this.map.addListener("click", (event) => {
      let marker = new google.maps.Marker ({
        position: event.latLng,
        map: this.map,
        draggable: true
      });



      this.state.markers.push(marker);

      if (this.state.markers.length > 1) {

        this.setDirections(this.map, this.state.markers, this);
      }
    });

  },

  searchBox() {
    let input = ReactDOM.findDOMNode(this.refs.pacInput);
    let searchBox = new google.maps.places.SearchBox(input);


    this.map.addListener("bounds_changed", () => {
      searchBox.setBounds(this.map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
      let places = searchBox.getPlaces();
      let bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.gemetry.location);
        }
      });
      this.map.fitBounds(bounds);
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
    this.renderMarkerInfoWindows();
  },

  renderMiddleMarkers () {
    this.state.markers.slice(1,-1).forEach((marker, i)=> {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      marker.setTitle("Exercise " + (i + 2));

    });

  },

  renderMarkerInfoWindows () {

    this.state.markers.forEach((marker, i) => {
      if (!marker.info) {
        marker.info = new google.maps.InfoWindow({
          content: `Click to Add Workout`,
        });
      }

      marker.addListener("dragend", () => {
        this.directionsDisplay.setMap(null);
        this.setDirections(this.map, this.state.markers, this);
      });

      marker.addListener('click', () => {
        this.setState({ selectedMarker: i, exerciseSelect: true });
        this.openModal();

      });

      marker.addListener('mouseover', () => {
        marker.info.open(this.map, marker);
        if (marker.exercise) {
          setTimeout(()=> marker.info.close(), 5000);
        } else {
          setTimeout(() => marker.info.close(), 1000);
        }
      });
    });
  },

  closeModal () {
    this.setState({ modalOpen: false});
  },

  openModal () {
    this.setState({ modalOpen: true });
  },



  _handleExerciseClick(e) {
    let exerciseIndex = $(e.target).siblings('select').val();
    let exercise = this.state.exercises[exerciseIndex];
    let marker = this.state.markers[this.state.selectedMarker];
    marker.exercise = exercise;

    this.closeModal();
    let contentString = `<b>${marker.exercise.title}</b>` +
                        `<p>${marker.exercise.description}</p>` +
                        `<p>Number of Reps: ${marker.exercise.num_reps}</p>` +
                        `<p>Difficulty: ${marker.exercise.difficulty}</p>`;

    marker.info.setContent(contentString);
    marker.info.open(this.map, marker);
    setTimeout(() => marker.info.close(), 5000);
  },

  createPositionObject() {
    let obj = {};
    this.state.markers.forEach( (marker,i) => {
      obj[i] = {};
      obj[i].lat = marker.position.lat();
      obj[i].lng = marker.position.lng();
      // obj[i].exercise = marker.exercise;
      obj.distance = this.totalDistance();
    });

    return obj;
  },

  createExerciseArray() {
    let arr = [];
    this.state.markers.forEach((marker, i) => {
      if (marker.exercise) {
        arr.push(marker.exercise.id);
      } else {
        arr.push(-1);
      }
    });

    return arr;
  },

  totalDistance () {
    let sum = 0;
    this.directionsResult.routes[0].legs.forEach( (leg) => {
      sum += leg.distance.value; //in meters
    });

    return +((sum/1609.34).toFixed(2)); // round to 2 decimal places in miles
  },

  _handleClick(e) {
    this.setState({exerciseSelect: false, modalOpen: true});
  },

  _handleFormClick() {
    this.closeModal();

  },

  render () {
    let modal;
    if (this.state.exerciseSelect) {
      modal = <ExerciseSelector exercises={ this.state.exercises }
                                click={ this._handleExerciseClick }/>;

      modalMapStyle.content.height = "100px";

    } else {
      modal = <RouteSubmitForm exercises={ this.createExerciseArray }
                               position={ this.createPositionObject }
                               callback={ this._handleFormClick }/>;

      modalMapStyle.content.height = "250px";
    }

    return(
      <div className="route-builder">
        <div className="map" ref="map"></div>
        <button className="button" onClick={this._handleClick}>Submit</button>
        <input ref="pacInput" className="controls" type="text" placeholder="Search Box" />
        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.closeModal }
          style={ modalMapStyle }>

          { modal }

        </Modal>
      </div>
    );
  }
});

module.exports = RouteBuilder;
