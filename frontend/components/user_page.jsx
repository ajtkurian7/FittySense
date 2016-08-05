const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const Feed = require('./feed.jsx');
const FeedStore = require('../stores/feed_store.js');
const FeedActions = require('../actions/feed_actions.js');

const UserPage = React.createClass({
  getInitialState() {
    return { feeds: [] };
  },

  componentDidMount () {
    this.feedStoreListener = FeedStore.addListener(this._onChange);
    FeedActions.fetchUserRoutes();
  },

  componentWillUnmount () {
    this.feedStoreListener.remove();
  },

  _onChange () {
    this.setState({ feeds: FeedStore.all() });
  },

  currentUser () {
    let currentUser =  SessionStore.currentUser();
    let fullName = currentUser.fname + ' ' + currentUser.lname;
    return fullName;
  },

  feedList () {
    return this.state.feeds.map((el, i) => {
      return(
        <li key={i} className="feed-item">
          <ul>
            <li>{el.date}</li>
            <li>{el.title}</li>
            <li>{el.description}</li>
            <li>Started at:{el.start_time}</li>
            <li>Total time: {el.total_time} hrs</li>
          </ul>

        </li>
      );
    });
  },


  render () {

    return (
      <div>
        <h1>Welcome {this.currentUser()}!</h1>
        <div>
          <h2>Activity Feed </h2>
          <ul>
            {this.feedList()}
          </ul>

        </div>
      </div>
    );
  }
});

module.exports = UserPage;
