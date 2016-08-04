const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
const ErrorStore = require('../stores/error_store');

const SignUpForm = React.createClass({
  contextTypes: {
		router: React.PropTypes.object.isRequired
	},
  getInitialState(){
      return {
        email: "",
        fname: "",
        lname: "",
        password: "",
      };
  },

  componentDidMount() {

    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount() {
    this.errorListener.remove();
    this.sessionListener.remove();
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

  fieldErrors(field) {
    const errors = ErrorStore.formErrors("signup");

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  render(){
    return (
      <div className="session-page signup">
        <div className="login-form-container">
          <h1 className="signup-title">Fitty Sense</h1>
          <p className="signup-title">Sign Up for a New Account</p>

          <form onSubmit={this._handleSubmit} className="login-form">

              <input
                value={this.state.fname}
                onChange={this._updateFNameState}
                placeholder="First Name"
                className="textbox"/>

            {this.fieldErrors("fname")}

              <input
                value={this.state.lname}
                onChange={this._updateLNameState}
                placeholder="Last Name"
                className="textbox"/>

            {this.fieldErrors("lname")}

            <input
                value={this.state.email}
                onChange={this._updateEmailState}
                placeholder="Email"
                className="textbox"/>


              {this.fieldErrors("email")}

              <input
                type="password"
                value={this.state.password}
                onChange={this._updatePasswordState}
                placeholder="Password"
                className="textbox"/>


            {this.fieldErrors("password")}

            <input type="submit" value="Sign Up" className="button"/>

          </form>

        </div>
      </div>
    );
  }
});

module.exports = SignUpForm;
