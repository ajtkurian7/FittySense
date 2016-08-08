const React = require('react');
const ReactDOM = require('react-dom');

const RouteBuilder = React.createClass({
  componentDidMount() {
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: {lat: 40.7128, lng: -74.0059},
      zoom: 16
    };

    this.map = new google.maps.Map(mapDOMNode, mapOptions);

    let map = new google.maps.Map();
  },

  render () {
    return(
      <div className="map" ref="map">
        // <input className="pac-input" type="text" placeholder="Where are you at?" ref="pac-input" />
      </div>
    );
  }
});

module.exports = RouteBuilder;
