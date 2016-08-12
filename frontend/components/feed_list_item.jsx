const React = require('react');
const RouteActions = require('../actions/route_actions.js');
const RouteStore = require('../stores/route_store.js');
const MapThumbnail = require("./map_thumbnail.jsx");

const FeedListItem = React.createClass({
  getInitialState() {
    return { routes: [] };
  },

  componentDidMount () {
    this.routeStoreListener = RouteStore.addListener(this._onChange);
    RouteActions.fetchAllRoutes();

  },

  componentWillUnmount () {
    this.routeStoreListener.remove();
  },

  _onChange() {
    this.setState({ routes: RouteStore.all() });
  },

  _findRoute () {
    let obj;
    this.state.routes.forEach((route)=> {
      if (route.id === this.props.feeds.route_id) {
        obj = route;
      }
    });
    return obj;
  },

  _distance () {
    if (this.state.routes.length) {
      return <li>{this._findRoute().map_info.distance} hr(s)</li>;
    } else {
      return [];
    }
  },

  _route () {
    if (this.state.routes.length) {
      return <MapThumbnail path={this._getPath()} size="160x100" c="map-thumb-small feed-map" />;
    } else {
      return [];
    }
  },
  _getPath() {
    let mapInfo = this._findRoute().map_info;
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

  render () {
    return(

      <div className="feed-item group">

        <ul>
          <li className="date"> {this.props.feeds.date}</li>
          <li className="title">{this.props.feeds.title}</li>
          <li className="description">{this.props.feeds.description}</li>
          <ul className="stats group">
            <li>{this.props.feeds.start_time}</li>
            <li>{this.props.feeds.total_time} hrs</li>
            {this._distance()}
          </ul>
        </ul>

        {this._route()}
      </div>

    );
  }
});

module.exports = FeedListItem;
