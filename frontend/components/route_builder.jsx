const React = require('react');
const ReactDOM = require('react-dom');
const RouteActions = require('../actions/route_actions.js');
const ExerciseStore = require('../stores/exercise_store.js');
const ExerciseActions = require('../actions/exercise_actions.js');
const Modal = require('react-modal');
const modalMapStyle = require('./modal_map_style.js');

const RouteBuilder = React.createClass({
  markers: [],
  getInitialState() {
    return { exercises: [], modalOpen: false, selectedMarker: "" };
  },

  componentDidMount() {
    this.exerciseStoreListener = ExerciseStore.addListener(this._onChange);
    ExerciseActions.fetchAllExercises();
    this.initMap();
  },

  componentWillUnmount() {
    this.exerciseStoreListener.remove();
  },

  _onChange() {
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

    this.map.addListener("click", (event) => {
      let marker = new google.maps.Marker ({
        position: event.latLng,
        map: this.map,
        draggable: true
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
        that.renderStartEndMarkers();
        that.directionsDisplay.setDirections(directionsResult);

      } else {
        window.alert("Directions request failed due to " + status);
        that.markers = that.markers.slice(0,-2);
      }
    });


  },

  renderStartEndMarkers () {
    let start = this.markers[0];
    let stop = this.markers[this.markers.length - 1];
    start.setIcon('http://maps.google.com/mapfiles/kml/paddle/go.png');
    start.setTitle("Exercise 1");
    stop.setIcon('http://maps.google.com/mapfiles/kml/paddle/stop.png');
    stop.setTitle("Exercise " + this.markers.length);

    this.renderMiddleMarkers();
    this.renderMarkerInfoWindows();
  },

  renderMiddleMarkers () {
    this.markers.slice(1,-1).forEach((marker, i)=> {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      marker.setTitle("Exercise " + (i + 2));

    });

  },

  renderMarkerInfoWindows () {
    this.markers.forEach((marker, i) => {
      marker.info = new google.maps.InfoWindow({
        content: `Click to Add Workout`,
      });

      marker.addListener("dragend", () => {
        this.directionsDisplay.setMap(null);
        this.setDirections(this.map, this.markers, this);
      });

      marker.addListener('click', () => {
        this.setState({ selectedMarker: i });
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


  _handleClick(e) {

  },

  _handleExerciseClick(e) {
    let exerciseIndex = $(e.target).siblings('select').val();
    let exercise = this.state.exercises[exerciseIndex];
    let marker = this.markers[this.state.selectedMarker];
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

  render () {
    return(
      <div className="route-builder">
        <div className="map" ref="map">Map</div>
        <button className="button" onClick={this._handleClick}>Submit</button>
        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.closeModal }
          style={ modalMapStyle }>
          <div className="exercise-selector">

            <p>
              Please Select an Exercise for this Marker:
            </p>
            <select>
              <option value={-1}>{"-"}</option>
              {
                this.state.exercises.map((exercise, i) => {
                  return(
                    <option key={i} value={i}>{exercise.title}</option>
                  );
                })
              }
            </select>
            <button onClick={ this._handleExerciseClick } className="button">
              Select Exercise
            </button>

        </div>
        </Modal>
      </div>
    );
  }
});

module.exports = RouteBuilder;

// <div className="display-window">
//   <label>
//     Please Select an Exercise from your Personal List
//     <select>
//       <option>{"-"}</option>
//       {
//         this.state.exercises.map((exercise, i) => {
//           return(
//             <option key={i}>{exercise.title}</option>
//           );
//         })
//       }
//     </select>
//   </label>
// </div>
