const React = require('react');

const MapThumbnail = React.createClass({
  encodePath() {
    return google.maps.geometry.encoding.encodePath(this.props.path);
  },

  staticMapUrl() {
    let urlBase = "https://maps.googleapis.com/maps/api/staticmap?";
    let size = `size=${this.props.size}`;
    let path = `&path=weight:3%7Ccolor:black%7Cenc:${this.encodePath()}`;
    let key = "&key=AIzaSyDCJtkiY4Xo-vFaA8AmZ1bKbOxRssNjGMY";

    return urlBase + size + path + key;

  },

  render () {
    return(
      <div className={this.props.c}>
        <img src={this.staticMapUrl()} alt="Map Thumbnail"/>
      </div>
    );
  }
});

module.exports = MapThumbnail;
