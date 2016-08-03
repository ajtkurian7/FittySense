const React = require('react');
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');

const LogInForm = React.createClass({
  getInitialState(){
      return {
        email: "",
        fname: "",
        lname: "",
        password: "",
        password2: ""
      };
  },

  componentDidMount() {
    this.SessionStore.addListener(this.redirectIfLoggedIn);
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

  //update states when text box changes in value

  _updateEmailState (e) {
    e.preventDefault();
    this.setState({email: e.target.value});
  },

  _updatePasswordState (e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  },

  _updatePassword2State (e) {
    e.preventDefault();
    this.setState({password2: e.target.value});
  },

  _updateFNameState (e) {
    e.preventDefault();
    this.setState({fname: e.target.value});
  },

  _updateLNameState (e) {
    e.preventDefault();
    this.setState({lname: e.target.value});
  },

  //submit callback

  _handleSubmit(e) {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname,
      password: this.state.password
    };

    SessionActions.signUp(formData);
  },

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <label>
          Email:
          <input
            value={this.state.email}
            onChange={this._updateEmailState}/>
        </label>
        <label>
          First Name:
          <input
            value={this.state.fname}
            onChange={this._updateFNameState}/>
        </label>
        <label>
          Last Name:
          <input
            value={this.state.email}
            onChange={this._updateEmailState}/>
        </label>
        <label>
          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this._updatePasswordState}/>
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={this.state.password2}
            onChange={this._updatePassword2State}/>
        </label>
      </form>
    );
  }
});

module.exports = LogInForm;
