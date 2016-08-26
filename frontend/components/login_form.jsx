const React = require('react');
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
const ErrorStore = require('../stores/error_store.js');
const Link = require('react-router').Link;


const LogInForm = React.createClass({

  contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState(){
      return {
        email: "",
        password: ""
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

  _updateEmailState (e) {
    e.preventDefault();
    this.setState({email: e.target.value});
  },

  _updatePasswordState (e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  },

  _handleSubmit(e) {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password
    };

    SessionActions.logIn(formData);

  },

  _handleGuestLogin(e) {
    e.preventDefault();

    const guestData = {
      email: "50cent@gunit.com",
      password: "123456"
    };

    SessionActions.logIn(guestData);
  },

  fieldErrors(field) {
    const errors = ErrorStore.formErrors("login");

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },


  render(){
    return (
      <div className="session-page login">
        <div className="login-form-container">
          <h1 className="signup-title">Fitty Sense</h1>
          <p className="signup-title">Log Into Your Account</p>

          <form onSubmit={this._handleSubmit} className="login-form">

              <input
                value={this.state.email}
                onChange={this._updateEmailState}
                placeholder="Email"
                className="textbox"/>

              <input
                type="password"
                value={this.state.password}
                onChange={this._updatePasswordState}
                placeholder="Password"
                className="textbox"/>

              <input type="submit" value="Login" className="button"/>
              <Link to="/signup" className="link"> <span>Sign Up</span> </Link>
              <button className="button" onClick={this._handleGuestLogin}>Guest Login</button>
              {this.fieldErrors('base')}
          </form>

        </div>
      </div>
    );
  }
});

module.exports = LogInForm;
