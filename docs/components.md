## Component Hierarchy


* **App**
  * **LoginForm**
  * **SignupForm**
  * Navbar
  * **UserShow**
    * **Followers**
      * List of Followers
      * Follow user by Search
    * User Stats
    * ActivityFeed
      * UserOnly/User+Followers Toggle
      * User Routes - Title and Description
        * Map of Route`
        * Add to Own List of Routes Button
        * Like Button
  * **RoutesIndex**
    * **RoutesIndexItem**
    * RouteDetail
    * RoutesListItem(s)
  * **ExercisesIndex**
    * **NewExerciseForm**
    * ExerciseIndexItem(s)
    * Supplemental Info (ExerciseDetail)
      * **ExerciseRepo** - Preloaded Workouts
      * Exercise Description
    * User's Exercise List



## Routes

* **component:** `App` **path:** `/`
  * **component** `LoginForm` **path:** `/login`
  * **component** `SignupForm` **path:** `/signup`
  * **component** `RoutesIndexItem` **path** `/routes/:routeId`
  * **component** `ExercisesIndexItem` **path** `/route/:exerciseId`
  * **component:** `UserShow` **path:** `users/userId`
    * **component:** `RoutesIndex` **path:** `/routes`
    * **component:** `Followers` **path:** `/followers`
    * **component:** `ExercisesIndex` **path:** `/exercises`
      * **component:** `NewExercise` **path:** `/new`
  * **component** `ExerciseRepo` **path:** `/exercises`
