const React = require('react');
const SessionStore = require('../stores/session_store.js');

const Profile = React.createClass({
  getInitialState() {
    return ({ user: SessionStore.currentUser() });
  },

  _imageURL () {
    let url = "";
    if (this.state.user.pic_url) {
      url = this.state.user.pic_url;
    } else {
      url = "https://cdn0.vox-cdn.com/images/verge/default-avatar.v9899025.gif";
    }

    return url;
  },

  render () {
    return (
      <div className="profile-container">
        <img src={this._imageURL()} alt="avatar" />
        <h1>{this.state.user.fname + ' ' + this.state.user.lname}</h1>
        <h1>{this.state.user.email}</h1>
        <button className="button">Upload Picture</button>
      </div>
    );
  }
});

module.exports = Profile;
