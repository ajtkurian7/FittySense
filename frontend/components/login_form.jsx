const React = require('react');
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');

const LogInForm = React.createClass({
  getInitialState(){
      return {
        email: "",
        password: ""
      };
  },

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
    // this.errorListener = SessionStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount() {
    // this.errorListener.remove();
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

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login-form">
          <label>
            Email:
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
        </form>
      </div>
    );
  }
});

module.exports = LogInForm;
