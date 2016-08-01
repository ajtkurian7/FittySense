# FittySense

[FittySense link][FittySense] **Note:** This should be a link to your production site

[FittySense]: http://www.strava.com

## Minimum Viable Product

FittySense is a web application inspired by Strava that will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

### General Features

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README
- [ ] All Features must have:
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS Styling

### Specific Features

- [ ] Creating Routes
  - [ ] Draw routes in Google Maps from starting and ending points
  - [ ] Option to add exercise markers along planned route
  - [ ] Calculate difficulty of workout based on number of exercise markers and length of route
  - [ ] Creating show page for each route with applicable information
- [ ] Saving Workouts
  - [ ] Save created routes with workouts to DB
  - [ ] Option to save other users created workouts
  - [ ] Create additional marker workouts to be added to routes
- [ ] Workout Feed
  - [ ] Display all completed workouts performed by user
  - [ ] Display all workouts completed recently in community feed
  - [ ] Have options to view, save, and comment on workouts in feed
  - [ ] Have a like button
- [ ] Workout Stats/Totals
  - [ ] Calculate user level based on workouts completed
  - [ ] Track total distance traveled, workouts completed, markers finished, Start time, end time, splits for each marker.
  - [ ] Integrate points system as a single metric
- [ ] Bonus
  - [ ] Mobile Interface to log exercise markers during route
  - [ ] Spotify playlist integration
  - [ ] Pictures feed in each workout

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days, W1 W 6pm)

**Objective:** Functioning rails project with front-end Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication backend setup
- [ ] create `StaticPages` controller and root view
- [ ] set up webpack & flux scaffold with skeleton files
- [ ] setup `APIUtil` to interact with the API
- [ ] set up flux cycle for frontend auth
- [ ] user signup/signin components
- [ ] blank landing component after signin
- [ ] style signin/signup components
- [ ] seed users

### Phase 2: Routes Model, API, and components (2 days, W1 F 6pm)

**Objective:** Routes can be created, read, edited and destroyed through
the API.

- [ ] create `Route` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for routes (`RoutesController`)
- [ ] jBuilder views for routes
- [ ] test out API interaction in the console.
- implement each route component, building out the flux loop as needed.
  - [ ] `RoutesIndex`
  - [ ] `RouteIndexItem`
  - [ ] `RouteMap`
- [ ] save Routes to the DB when the form loses focus or is left idle after editing.
- [ ] Seed Routes

### Phase 3: Exercises (2 day, W2 Tu 6pm)

**Objective:** Exercises belong to Routes, and can be created and added to the Route.

- [ ] create `Exercise` model
- build out API, Flux loop, and components for:
  - [ ] Exericse CRUD
  - [ ] adding exercises to personal User DB
  - [ ] adding exercises to routes
  - [ ] viewing exercises per route
- [ ] Seed Exercises

Phase 3 adds exercise implementation into the routes.

### Phase 4: Followers (1 days, W2 W 6pm)

**Objective:** Users can add Followers from the followers component in the main user page

- [ ] create `Follower` model and join table
- build out API, Flux loop, and components for:
  - [ ] build activity feed based on followers table
  - [ ] fetching followers for Followers component
  - [ ] adding followers from search
  - [ ] Removing followers
- [ ] Style new elements
- [ ] Seed followers information

### Phase 5: Add Statistics for Each User (1 days, W2 Th 6pm)

**objective:** Automatically calculate stats based on finished workouts

- [ ] Show stats in UserStats component
- [ ] Show leaderboard for all followers/followees based on power score
- [ ] Automatically update stats based on finished workouts
- [ ] View User Stats on User Page

### Phase 6: - CSS (1 day, W2 F 6pm)

**objective:** Make website look presentable

- [ ] Make sure all elements are thematically organized
- [ ] Adhere to color scheme of original website
- [ ] Add effects to enhance navigation
- [ ] Ensure smooth navigation throughout website

### Bonus Features (TBD)
- [ ] Mobile Interface to log exercise markers during route
- [ ] Spotify playlist integration
- [ ] Pictures feed in each workout

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
