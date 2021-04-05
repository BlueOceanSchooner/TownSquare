# TownSquare

## API
All API endpoints begin with /api.

### Users
To get a list of all users:
GET request to /api/users

User data format:
```
[
  {
    user_id: number,
    first_name: string,
    last_name: string,
    email: string
  }
]
```