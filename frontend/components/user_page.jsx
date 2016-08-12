const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const Feed = require('./feed.jsx');
const FeedStore = require('../stores/feed_store.js');
const FeedActions = require('../actions/feed_actions.js');
const FeedListItem = require('./feed_list_item.jsx');

const UserPage = React.createClass({
  getInitialState() {
    return { feeds: [], };
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





  render () {

    return (
      <div className="feed-page">
        <h1>Welcome {this.currentUser()}!</h1>
        <p>
          Check out some of your most recent workouts! <br/>
          Then start adding runs and workouts to see more of your activites
          pop up!
        </p>
        <div>
          <h2>Activity Feed </h2>

            {this.state.feeds.map((feed, i) => {
              return <FeedListItem key={i} feeds={feed}/>;
            })}

        </div>
      </div>
    );
  }
});

module.exports = UserPage;
