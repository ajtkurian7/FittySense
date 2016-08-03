// React Requirements
const React = require('react');
const ReactDOM = require('react-dom');

//Routes
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

//components
const App = require('./components/app.jsx');

//Auth


const appRouter = (
  <Router history = { hashHistory }>
    <Route path='/' component={'App'}> //put the main app in here
      <Route path="/login" component = {LoginForm} />
      <Route path="/signup" component = {LoginForm} />
      <Route path="/success" component = {Success} />
    </Route>
  </Router>
);


function _ensureLoggedIn(nextState, replace) {
  if (!SessionStore.isUserLoggedIn()){
    replace('/login');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('content');
  ReactDOM.render(appRouter, root);
});
