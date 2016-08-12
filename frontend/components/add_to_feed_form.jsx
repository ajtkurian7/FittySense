const React = require('react');
const SessionStore = require('../stores/session_store.js');

const AddToFeedForm = React.createClass({
  getInitialState() {
    return { date: "",start: "", end: "" };
  },

  _dateChange(e) {
    this.setState({ date: e.target.value });
  },

  _startChange(e) {
    this.setState({ start: e.target.value });
  },

  _endChange(e) {
    this.setState({ end: e.target.value });
  },

  _handleClick(e) {
    e.preventDefault();
    let formData = {
      date: this.state.date,
      startTime: this.state.start,
      endTime: this.state.end,
      user_id: SessionStore.currentUser().id,
      route_id: this.props.route.id
    };

    this.props.click(formData);
  },

  render () {
    return(
      <div className="login-form">
        <label>
          <p>Date of Workout</p>
          <input type="date" onChange={this._dateChange} />
        </label>

        <label>
          <p>Start Time of Workout</p>
          <input type="time" onChange={this._startChange} />
        </label>
        <label>
          <p>End Time of Workout</p>
          <input type="time" onChange={this._endChange} />
        </label>

        <button className="button" onClick={this._handleClick}>Add to Feed</button>
      </div>
    );

  }
});

module.exports = AddToFeedForm;
