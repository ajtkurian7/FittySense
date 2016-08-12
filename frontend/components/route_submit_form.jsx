const React = require('react');
const RouteActions = require('../actions/route_actions.js');
const SessionStore = require('../stores/session_store.js');

const RouteSubmitForm = React.createClass({
  getInitialState () {
    return {
      title: "",
      description: "",
    };
  },

  _updateTitleState (e) {
    this.setState({ title: e.target.value });
  },

  _updateDescriptionState (e) {
    this.setState({ description: e.target.value });
  },

  _handleSubmit (e) {
    e.preventDefault();
    const formData = {
      title: this.state.title,
      description: this.state.description,
      exercise_ids: this.props.exercises(),
      map_info: this.props.position(),
      author_id: SessionStore.currentUser().id
    };



    RouteActions.postRoute(formData);
    this.props.callback();
  },

  // fieldErrors(field) {
  //   const errors = ErrorStore.formErrors("update_exercise");
  //
  //   if (!errors[field]) { return; }
  //
  //   const messages = errors[field].map( (errorMsg, i) => {
  //     return <li key={ i }>{ errorMsg }</li>;
  //   });
  //
  //   return <ul>{ messages }</ul>;
  // },

  render () {
    return(
      <form className="login-form" onSubmit={this._handleSubmit}>
        <input
          value={this.state.title}
          onChange={this._updateTitleState}
          placeholder="Title"
          className="textbox"/>

        <input
          value={this.state.description}
          onChange={this._updateDescriptionState}
          placeholder="Description"
          className="textbox"/>


        <input type="submit" value="submit" className="button"/>

      </form>
    );
  }
});

module.exports = RouteSubmitForm;
