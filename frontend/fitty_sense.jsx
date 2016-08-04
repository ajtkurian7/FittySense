// React Requirements
const React = require('react');
const ReactDOM = require('react-dom');

//Routes
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const IndexRedirect = ReactRouter.IndexRedirect;
const Redirect = ReactRouter.Redirect;
const hashHistory = ReactRouter.hashHistory;

//components
const App = require('./components/app.jsx');
const LogInForm = require('./components/login_form.jsx');
const SignUpForm = require('./components/signup_form.jsx');
const UserPage = require('./components/user_page.jsx');
const ExerciseRoutes = require('./components/exercise_routes.jsx');
const Workouts = require('./components/workouts.jsx');
const Stats = require('./components/stats.jsx');
const Feed = require('./components/stats.jsx');

//stores
const SessionStore = require('./stores/session_store.js');

//Auth

const appRouter = (
  <Router history = { hashHistory }>
    <Route path='/' component={ App }> //put the main app in here
      <IndexRedirect to="onboarding"/>
      <Route path="login" component = {LogInForm} />
      <Route path="signup" component = {SignUpForm} />
      <Route path="onboarding" component = {UserPage} onEnter={ _ensureLoggedIn}>
        <Route path="/feed" component={Feed} />
        <Route path="/routes" component={ExerciseRoutes} />
        <Route path="/workouts" component={Workouts} />
        <Route path="/stats" component={Stats} />
      </Route>
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
