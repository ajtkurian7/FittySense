# Phase 4: Followers (1 days, W2 W 6pm)

## Rails

### Models
* Followers
* Routes

### Controllers
* Api::FollowersController (create, destroy, index, show, update)

### Views
* followers/show.json.jbuilder


## Flux
### Views (React Components)
* Followers
* ActivityFeed

### Stores
* Follower
* FollowedRoutes

### Actions
* `ApiActions.receiveFollowedUsersRoutes`
* `RouteActions.fetchFollowedUsersRoutes`

### ApiUtil
* `ApiUtil.fetchFollowedUsersRoutes`

## Gems/Libraries
