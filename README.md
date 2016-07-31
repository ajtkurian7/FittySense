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

### Phase 2: Notes Model, API, and components (2 days, W1 F 6pm)

**Objective:** Notes can be created, read, edited and destroyed through
the API.

- [ ] create `Note` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`NotesController`)
- [ ] jBuilder views for notes
- [ ] test out API interaction in the console.
- implement each note component, building out the flux loop as needed.
  - [ ] `NotesIndex`
  - [ ] `NoteIndexItem`
  - [ ] `NoteForm`
- [ ] save Notes to the DB when the form loses focus or is left idle after editing.
- [ ] style notes components
- [ ] seed notes

### Phase 3: Notebooks (2 day, W2 Tu 6pm)

**Objective:** Notes belong to Notebooks, and can be viewed by notebook.

- [ ] create `Notebook` model
- build out API, Flux loop, and components for:
  - [ ] Notebook CRUD
  - [ ] adding notes requires a notebook
  - [ ] moving notes to a different notebook
  - [ ] viewing notes by notebook
- [ ] Use CSS to style new components
- [ ] Seed Notebooks

Phase 3 adds organization to the Notes. Notes belong to a Notebook,
which has its own `Index` view.

### Phase 4: Tags (1 days, W2 W 6pm)

**Objective:** Notes can be tagged with multiple tags, and tags are searchable.

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for notebook
  - [ ] adding tags to notebook
  - [ ] creating tags while adding to notebooks
  - [ ] searching notebooks by tag
- [ ] Style new elements
- [ ] Seed tags and tag the seeded Notebooks

### Phase 5: Allow Complex Styling in Notes (1 days, W2 Th 6pm)

**objective:** Enable complex styling of notes.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.
- [ ] Add Quill styling to seeded notes

### Phase 6: - Pagination / infinite scroll for Notes Index (1 day, W2 F 6pm)

**objective:** Add infinite scroll to Notes Index

- [ ] Paginate Notes Index API to send 20 results at a time
- [ ] Append next set of results when user scrolls and is near bottom
- [ ] Make sure styling still looks good
- [ ] Ensure we have enough seeded notes to demo infinite scroll

### Bonus Features (TBD)
- [ ] Search through notes for blocks of text
- [ ] Set reminders on notes
- [ ] Changelogs for Notes
- [ ] Multiple sessions

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
