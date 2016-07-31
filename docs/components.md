## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * **LoginForm**
  * **SignupForm**
  * Navbar
  * **UserShow**
    * Followers
      * List of Followers
      * Add Follower
    * User Stats
    * ActivityFeed
      * UserOnly/User+Followers Toggle
      * User Routes - Title and Description
        * Map of Route
        * Add to Own List of Routes Button
        * Like Button
  * **RoutesIndex**
    * Map of selected/create route
    * List of Routes
    * Create Route Button
  * **ExercisesIndex**
    * **NewExerciseForm**
    * List of Available Exercises
    * Exercise Description
    * User's Exercise List
    * Add New Exercise from Repo
    * Create New Exercise


## Routes

* **component:** `App` **path:** `/`
  * **component** `LoginForm` **path:** `/login`
  * **component** `SignupForm` **path:** `/signup`
  * **component:** `UserShow` **path:** `users/userId`
    * **component:** `RoutesIndex` **path:** `/routes`
    * **component:** `ExercisesIndex` **path:** `/exercises`
      * **component:** `NewExercise` **path:** `/new`
