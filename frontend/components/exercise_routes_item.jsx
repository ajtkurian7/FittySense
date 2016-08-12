const React = require('react');
const MapThumbnail = require('./map_thumbnail.jsx');
const Modal = require('react-modal');
const modalShowMapStyle = require("./modal_show_map_style.js");
const AddToFeedForm = require("./add_to_feed_form.jsx");
const FeedActions = require("../actions/feed_actions.js");



const ExerciseRoutesItem = React.createClass({
  getInitialState () {
    return { modalOpen: false, addToFeed: false };
  },

  getPath() {
    let mapInfo = this.props.route.map_info;
    let infoLength = Object.keys(mapInfo).length;
    let path = [];
    for (let i = 0; i < infoLength-1; i++) {
      let obj = {};
      obj.lat = parseFloat(mapInfo[i].lat);
      obj.lng = parseFloat(mapInfo[i].lng);
      path.push(new google.maps.LatLng(obj));
    }
    return path;
  },

  closeModal () {
    this.setState({ modalOpen: false});
  },

  openModal () {
    this.setState({ modalOpen: true });
  },

  getEstimatedTime() {
    let distance = this.props.route.map_info.distance;

    return Math.round((distance / 4) * 60);
  },

  _handleClick() {
    this.setState({ modalOpen: true, addToFeed: true });
  },

  _handleSubmit(formData) {
    debugger
    FeedActions.postUserFeed(formData);
  },

  render () {
    let render;
    if (this.state.addToFeed) {
      render = <AddToFeedForm click={this._handleSubmit} route={this.props.route} />;
    } else {
      render = [];
    }

    return(
      <ul className="route-item" onClick={this._handleClick}>
        <li className="thumb"><MapThumbnail path={this.getPath()} /></li>
        <li className="title">{this.props.route.title}</li>
        <li className="details">{this.props.route.description}</li>
        <li className="stats">{this.props.route.map_info.distance} Miles</li>
        <li className="stats">Estimated Completion Time: {this.getEstimatedTime()} Mins</li>
        <li className="created">{this.props.route.created_at}</li>
        <div className="buttons group">
          <button className="button add-to-feed" onClick={this._handleClick}>Add to Feed</button>
          <button className="button delete-route">Delete</button>
        </div>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.closeModal }
          style={ modalShowMapStyle }>

          {render}

        </Modal>
      </ul>
    );
  }
});

module.exports = ExerciseRoutesItem;
