const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const Feed = require('./feed.jsx');

const UserPage = React.createClass({
  currentUser () {
    let currentUser =  SessionStore.currentUser();
    let fullName = currentUser.fname + ' ' + currentUser.lname;
    return fullName;
  },


  render () {
    return (
      <div>
        <h1>Welcome {this.currentUser()}!</h1>
        <div>
          <h2>Activity Feed </h2>


        </div>
      </div>
    );
  }
});

module.exports = UserPage;
