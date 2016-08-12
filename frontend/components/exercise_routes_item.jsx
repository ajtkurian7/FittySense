const React = require('react');
const MapThumbnail = require('./map_thumbnail.jsx');
const Modal = require('react-modal');
const modalShowMapStyle = require("./modal_show_map_style.js");
const AddToFeedForm = require("./add_to_feed_form.jsx");
const FeedActions = require("../actions/feed_actions.js");
const FeedStore = require("../stores/feed_store.js");
const hashHistory = require('react-router').hashHistory;
const ShowRoute = require('./show_route.jsx');



const ExerciseRoutesItem = React.createClass({
  getInitialState () {
    return { modalOpen: false, addToFeed: false };
  },

  componentDidMount() {
    this.feedStoreListener = FeedStore.addListener(this._onChange);
  },

  componentWillUnmount () {
    this.feedStoreListener.remove();
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

  _handleShowClick() {
    this.setState({ modalOpen: true, addToFeed: false });
  },

  _handleDeleteClick() {
    this.props.del(this.props.route.id);
  },

  _handleSubmit(formData) {
    FeedActions.postUserFeed(formData);
  },

  _onChange() {
    hashHistory.push("/");
  },

  render () {
    let render;
    if (this.state.addToFeed) {
      render = <AddToFeedForm click={this._handleSubmit} route={this.props.route} />;
    } else {
      render = <ShowRoute route={this.props.route}/>;
      modalShowMapStyle.content.width = "600";
      modalShowMapStyle.content.height = "400";
    }

    return(
      <ul className="route-item" >
        <div onClick={this._handleShowClick}>

          <li className="thumb"><MapThumbnail path={this.getPath()} size="300x188" c="map-thumb" /></li>
          <li className="title">{this.props.route.title}</li>
          <li className="details">{this.props.route.description}</li>
          <li className="stats">{this.props.route.map_info.distance} Miles</li>
          <li className="stats">Estimated Completion Time: {this.getEstimatedTime()} Mins</li>
          <li className="created">{this.props.route.created_at}</li>
        </div>
        <div className="buttons group">
          <button className="button add-to-feed" onClick={this._handleClick}>Add to Feed</button>
          <button className="button delete-route" onClick={this._handleDeleteClick}>Delete</button>
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
