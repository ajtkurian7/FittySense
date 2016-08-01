# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`
- `GET /api/session`

### Routes

- `GET /api/users/:id/routes`
  - shows routes by user_id
- `POST /api/users/:id/routes`
- `GET /api/users/:id/routes/:id`
- `PATCH /api/users/:id/routes/:id`
- `DELETE /api/users/:id/routes/:id`

### Exercises

- `GET /api/users/:id/exercises`
  - Shows exercise list for user_id
- `POST /api/users/:id/exercises`
- `GET /api/users/:id/exercises/:id`
- `PATCH /api/users/:id/exercises/:id`
- `DELETE /api/users/:id/exercises/:id`
- `GET /api/users/exercises`
  - Shows all exercises in database


### Followers

- `GET /api/users/:id/followers`
- `POST /api/users/:id/followers`
- `DELETE api/users/:id/followers/:id`
