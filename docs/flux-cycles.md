# Flux Cycles


## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. sets `form` and `_errors` in the `ErrorStore`
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. removes `_errors` for a given `form` in the `ErrorStore`

## Routes Cycles

### Routes API Request Actions

* `fetchFollowedUsersRoutes`
  0. invoked from `ActivityFeed` `didMount/willReceiveProps`
  0. `GET /api/users/:id/routes` is called for followed users.
  0. `receiveFollowedUsersRoutes` is set as callback.

* `fetchOwnRoutes`
  0. invoked from `RoutesIndex` `didMount/willReceiveProps`
  0. `GET /api/users/[own id]/routes`
  0. `receiveOwnRoutes` is set as callback.

* `fetchOneRoute`
  0. invoked from `RoutesIndexItem` `onClick`
  0. `GET /api/users/[own id]/routes/:id`
  0. `receiveOneRoute` is set as the callback.

* `createRoute`
  0. invoked from new route `onClick`
  0. `POST /api/users/[own id]/routes`
  0. `receiveOneRoute` is set as the callback

* `updateRoute`
  0. invoked from button `onClick` in `RouteMap`
  0. `PATCH /api/users/[own id]/routes/:id`
  0. `receiveOneRoute` is set as callback

* `deleteRoute`
  0. invoked from button `onClick` in `RouteMap`
  0. `DELETE /api/users/[own id]/routes/:id`
  0. `destroyRoute` is set as the callback

### Routes API Response Actions

* `receiveFollowedUsersRoutes`
  0. invoke from an API callback
  0. `FollowedRoute` store updates `_followedRoutes` and emits change

* `receiveOwnRoutes`
  0. invoke from an API callback
  0. `OwnRoute` store  updates `_ownRoutes` and emits change

* `receiveOneRoute`
  0. invoke from an API callback
  0. `OwnRoute` store finds and updates `_ownRoutes[:id]` and emits change

* `destroyRoute`
  0. invoke from an API callback
  0. `OwnRoute` store removes `_ownRoutes` and emits change

### Store Listeners

* `RoutesIndex` listens to `OwnRoutes` store
* `ActivityFeed` listens to `FollowedRoutes` store
* `RoutesListItem` listens to `OwnRoutes` store
* `RouteDetail` listens to `OwnRoutes` store


## Exercise Cycles

### Exercises API Request Actions

* `fetchAllExercises`
  0. invoked from button on `ExercisesIndex` `onClick` or `RouteDetail` when creating new Route
  0. `GET /api/exercises`
  0. `receiveAllExercises` is set as the callback

* `fetchAllUserExercises`
  0. invoked from `ExercisesIndex` `didMount/willReceiveProps`
  0. `GET /api/users/[own id]/exercises`
  0. `receiveAllUserExercises` is set as the callback

* `fetchOneExercise`
  0. invoked from `ExercisesIndexItem` `onClick`
  0. `GET /api/users/[own id]/exercises/[:id]`
  0. `receiveOneExercise` is set as the callback

* `createExercise`
  0. invoked from create button `onClick`
  0. `POST /api/users/[own id]/exercises`
  0. `receiveOneExercise` is set as the callback

* `updateExercise`
  0. invoked from button `onClick` in `ExerciseDetail`
  0. `PATCH /api/users/[own id]/exercises/[:id]`
  0. `receiveOneExercise` is set as the callback

* `deleteExercise`
  0. invoked from button `onClick` in `ExerciseDetail`
  0. `DELETE /api/users/[own id]/exercises/[:id]`
  0. `removeExercise` is set as the callback

### Exercises API Response Actions

* `receiveAllExercises`
  0. invoke from an API Callback
  0. `Exercise` store updates `_exercises` and emits change

* `receiveOneExercise`
  0. invoke from an API callback
  0. `Exercise` store finds and updates `_exercises[:id]` and emits change

* `destroyExercise`
  0. invoke from an API callback
  0. `Exercise` store finds and removes `_exercises[:id]` and emits change

### Store Listeners

* `ExercisesIndex` listens to `Exercise` store
* `ExerciseIndexItem` listens to `Exercise` store
* `ExerciseDetail` listens to `Exercise` store

## Follower Cycles

### Followers API Request Actions

* `fetchAllFollowers`
  0. invoked from `Followers` `didMount/willReceiveProps`
  0. `GET /api/users/[own id]/followers`
  0. `receiveAllFollowers` is set as the callback

* `destroyFollower`
  0. invoked from `Followers` `onClick` remove follower button
  0. `DELETE /api/users/[own id]/followers/[:id]`
  0. `removeFollower` is set as the callback

### Followers API Response Actions

* `receiveAllFollowers`
  0. invoked from an API callback
  0. `Follower` store updates `_followers` and emits change

* `removeFollower`
  0. invoked from an API callback
  0. `Follower` store finds and removes `_followers[:id]` and emits change

### Store Listeners  

* `Followers` listens to `Follower` store

## Stat Cycles

### Stats API Request Actions

* `fetchAllStats`
  0. invoked from `UserStats` (leaderboard) `didMount/willReceiveProps`
  0. `GET /api/stats`
  0. `receiveAllStats` is set as the callback

* `fetchUserStats`
  0. invoked from `UserStats` `didMount/willReceiveProps`
  0. `GET /api/users/[:id]/stats`
  0. `receiveUserStats` is set as the callback

* `updateStats`
  0. invoked from Finished Route button `onClick`
  0. `PATCH /api/users/[:id]/stats/`
  0. `receiveUserStats` is set as the callback

### Stats API Response Actions

* `receiveAllStats`
  0. invoked from API callback
  0. `Stats` store updates `_stats` and emits change

* `receiveUserStats`
  0. invoked from API callback
  0. `Stats` store updates and finds user `_stats[user_id]` and emits change

### Store Listeners
* `UserStats` listens to `Stats` store
