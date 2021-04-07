# TownSquare

## API
All API endpoints begin with /api.

### Errors

If there is an error than the JSON object returned will have one key, errors, with an array of the errors encountered.
```
{
  errors: [
    "first_name is a required field",
    "last_name is a required field
  ]
}
```

### Users

### List all users:

GET request to /api/users

```
[
  {
  "user_id": 1,
  "first_name": "Stephen",
  "last_name": "Hyde",
  "email": "stephen@friend.horse"
  },
  {
  "user_id": 2,
  "first_name": "Fred",
  "last_name": "Flintstone",
  "email": "fred@gmail.com"
  }
]
```

### Data for specific user:

GET request to /api/users/:id (for example /api/users/1 for user #1)

```
{
  "user_id": 1,
  "first_name": "Stephen",
  "last_name": "Hyde",
  "email": "stephen@friend.horse"
}
```

### List Groups for specific user:

GET request to /api/users/:id/groups

```
[
  {
    "group_id": 1,
    "image_url": "assets/images/default-religious.jpg",
    "group_name": "JavaScript Meet Up",
    "description": "We meet up and write code",
    "category": "religious"
  },
  {
    "group_id": 2,
    "image_url": "assets/images/default-animals.jpg",
    "group_name": "Cleveland Horse Enthusiasts",
    "description": "We are enthusiastic about horses!",
    "category": "animals"
  }
]

```

### List Events in Groups User is Member of

GET request to /api/users/:id/events

```
[
  {
    "event_id": 1,
    "title": "Group Coding at Stephen's",
    "description": "We meet up and write code",
    "address_1": "1600 Pennsylvania Avenue",
    "address_2": "Apartment 3",
    "city": null,
    "zipcode": "44124",
    "time": "2021-04-11T00:00:00.000Z",
    "attending": 1,
    "group": {
    "group_id": 1,
      "group_name": "JavaScript Meet Up",
      "category": "religious"
    }
  },
  {
    "event_id": 2,
    "title": "Extra Self Assessment",
    "description": "We meet up and write code",
    "address_1": "1600 Pennsylvania Avenue",
    "address_2": "Apartment 3",
    "city": null,
    "zipcode": "44124",
    "time": "2021-04-12T20:00:00.000Z",
    "attending": 1,
    "group": {
      "group_id": 1,
      "group_name": "JavaScript Meet Up",
      "category": "religious"
    }
  }
]
```

### List DMS involving User

GET request to /api/users/:id/dms

```
{
  "2": [
    {
      "dm_id": 2,
      "timestamp": "2021-04-05T16:28:09.000Z",
      "message": "Hi",
      "sender": {
        "user_id": 1,
        "first_name": "Stephen",
        "last_name": "Hyde"
      },
      "receiver": {
        "user_id": 2,
        "first_name": "Fred",
        "last_name": "Flintstone"
      }
    },
    {
      "dm_id": 4,
      "timestamp": "2021-04-05T16:28:42.000Z",
      "message": "May we have a conversation?",
      "sender": {
        "user_id": 1,
        "first_name": "Stephen",
        "last_name": "Hyde"
      },
      "receiver": {
        "user_id": 2,
        "first_name": "Fred",
        "last_name": "Flintstone"
      }
    }
  ],
  "3": [
    // messages between user_id 3 and user_id 1
  ]
}
```

### List all Groups

GET request to /api/groups

```
[
  {
    "group_id": 1,
    "image_url": "assets/images/default-religious.jpg",
    "group_name": "JavaScript Meet Up",
    "description": "We meet up and write code",
    "category": "religious",
    "owner": {
      "user_id": 1,
      "first_name": "Stephen",
      "last_name": "Hyde",
      "email": "stephen@friend.horse"
    }
  },
  {
    "group_id": 2,
    "image_url": "assets/images/default-animals.jpg",
    "group_name": "Cleveland Horse Enthusiasts",
    "description": "We are enthusiastic about horses!",
    "category": "animals",
    "owner": {
      "user_id": 2,
      "first_name": "Fred",
      "last_name": "Flintstone",
      "email": "fred@gmail.com"
    }
  }
]
```

## Create Group

POST request to /api/groups

- image_url is optional

Include data in the following format:
```
{
  "group_name": "My New Group Name",
  "description": "We like to hang out",
  "category": "outdoors",
  "owner_id": 1,
  "zipcode": 44124,
  "image_url": "http://website.com/image.jpg"
}
```

### Search For Group By Name

GET request to /api/groups/search?name=searchTerm (replace "searchTerm" with name you are searching for)

- If the search term contains spaces you will need to URL encode it before making the request
- If you want an exact match, add "&exact=true" to the end of the URL
- Data is in the same format as other group data requests
- Letter case does not matter

Examples:

`/api/groups/search?name=ends` WILL match the group name "Friends"

`/api/groups/search?name=ends&exact=true` WILL NOT match the group name "Friends"


### Info for Specific Group

GET request to /api/groups/:id

```
{
  "group_id": 1,
  "image_url": "assets/images/default-religious.jpg",
  "group_name": "JavaScript Meet Up",
  "description": "We meet up and write code",
  "category": "religious",
  "owner": {
    "user_id": 1,
    "first_name": "Stephen",
    "last_name": "Hyde",
    "email": "stephen@friend.horse"
  }
}
```

### Events in Specific Group

GET request to /api/groups/:id/events

```
[
  {
    "event_id": 1,
    "title": "Group Coding at Stephen's",
    "description": "We're gonna write some JavaScript while watching Sister Wives",
    "address_1": "1600 Pennsylvania Avenue",
    "address_2": "Apartment 3",
    "city": null,
    "state": "OH",
    "zipcode": "44124",
    "time": "2021-04-11T00:00:00.000Z",
    "group": {
      "group_id": 1,
      "group_name": "JavaScript Meet Up",
      "description": "We meet up and write code",
      "category": "religious"
    }
  },
  {
    "event_id": 2,
    "title": "Extra Self Assessment",
    "description": "We miss having self assessments, so we're gonna make some for ourselves",
    "address_1": "1600 Pennsylvania Avenue",
    "address_2": "Apartment 3",
    "city": null,
    "state": "OH",
    "zipcode": "44124",
    "time": "2021-04-12T20:00:00.000Z",
    "group": {
      "group_id": 1,
      "group_name": "JavaScript Meet Up",
      "description": "We meet up and write code",
      "category": "religious"
    }
  }
]
```

### Members in Specific Group

GET request to /api/groups/:id/members

```
[
  {
    "user_id": 1,
    "first_name": "Stephen",
    "last_name": "Hyde"
  },
  {
    "user_id": 2,
    "first_name": "Fred",
    "last_name": "Flintstone"
  },
  {
    "user_id": 11,
    "first_name": "Colleen",
    "last_name": "McCohort"
  },
  {
    "user_id": 12,
    "first_name": "JiHang",
    "last_name": "McCohort"
  },
  {
    "user_id": 13,
    "first_name": "Adrian",
    "last_name": "McCohort"
  },
  {
    "user_id": 14,
    "first_name": "Joe",
    "last_name": "McCohort"
  },
  {
    "user_id": 15,
    "first_name": "Ross",
    "last_name": "McCohort"
  }
]
```

### Posts in Specific Group (owner announcements)

GET request to /api/groups/:id/posts

```
[
  {
    "post_id": 1,
    "group_id": 1,
    "created_at": "2021-04-05T14:00:00.000Z",
    "body": "Last time we had a cookout some people forgot to bring their own food (Jane), and then caused a scene (Jane). Let's not have that happen again.",
    "author": {
      "user_id": 1,
      "first_name": "Stephen",
      "last_name": "Hyde",
      "email": "stephen@friend.horse"
    }
  },
  {
    "post_id": 2,
    "group_id": 1,
    "created_at": "2021-04-05T14:00:00.000Z",
    "body": "It was dope",
    "author": {
      "user_id": 1,
      "first_name": "Stephen",
      "last_name": "Hyde",
      "email": "stephen@friend.horse"
    }
  }
]
```

### Forum Posts (and nested children)

GET request to /api/groups/:id/forum

```
[
  {
    "parent": {
      "forum_post_id": 1,
      "group_id": 1,
      "posted": "2021-04-05T17:02:18.000Z",
      "message": "What a dope forum to post on!",
      "author": {
        "user_id": 1,
        "first_name": "Stephen",
        "last_name": "Hyde",
        "email": "stephen@friend.horse"
      }
    },
    "children": [
      {
        "reply_id": 1,
        "posted": "2021-04-05T17:08:53.000Z",
        "message": "Syntax error? More like byntax error!",
        "author": {
          "user_id": 1,
          "first_name": "Stephen",
          "last_name": "Hyde",
          "email": "stephen@friend.horse"
        }
      },
      {
        "reply_id": 2,
        "posted": "2021-04-05T17:09:27.000Z",
        "message": "That joke was dumb! Also you replied to your own post.",
        "author": {
          "user_id": 2,
          "first_name": "Fred",
          "last_name": "Flintstone",
          "email": "fred@gmail.com"
        }
      }
    ]
  },
  {
    "parent": {
      "forum_post_id": 3,
      "group_id": 1,
      "posted": "2021-04-05T17:05:27.000Z",
      "message": "Syntax error? More like byntax error!",
      "author": {
        "user_id": 1,
        "first_name": "Stephen",
        "last_name": "Hyde",
        "email": "stephen@friend.horse"
      }
    },
    "children": []
  }
]
```

### Add a Top-Level Post to a Forum

POST request to /api/groups/:group_id/forum with data having the structure:

```
{
  "group_id": 1,
  "user_id": 1,
  "message": "This is a top level post"
}
```


### Add a Reply to a Top-Level Post on a Forum

POST request to /api/groups/:group_id/forum-reply with data having the structure:
```
{
  "group_id": 1,
  "user_id": 2,
  "forum_post_id": 1,
  "message": "And this is a response to that top level post"
}
```


### List ALL Events

GET request to /api/events

```
[
  {
    "event_id": 1,
    "title": "Group Coding at Stephen's",
    "description": "We're gonna write some JavaScript while watching Sister Wives",
    "address_1": "1600 Pennsylvania Avenue",
    "address_2": "Apartment 3",
    "city": null,
    "state": "OH",
    "zipcode": "44124",
    "time": "2021-04-11T00:00:00.000Z",
    "group": {
      "group_id": 1,
      "group_name": "JavaScript Meet Up",
      "description": "We meet up and write code",
      "category": "religious"
    }
  },
  {
    "event_id": 2,
    "title": "Extra Self Assessment",
    "description": "We miss having self assessments, so we're gonna make some for ourselves",
    "address_1": "1600 Pennsylvania Avenue",
    "address_2": "Apartment 3",
    "city": null,
    "state": "OH",
    "zipcode": "44124",
    "time": "2021-04-12T20:00:00.000Z",
    "group": {
      "group_id": 1,
      "group_name": "JavaScript Meet Up",
      "description": "We meet up and write code",
      "category": "religious"
    }
  },
  {
    "event_id": 4,
    "title": "Outdoor Lecture",
    "description": "A.G. Pennypacker will be giving a talk on his new book titled \"Horses: Man's Best Friend? The Case Against Dogs\"",
    "address_1": "123 Park Street",
    "address_2": "",
    "city": null,
    "state": "OH",
    "zipcode": "44124",
    "time": "2021-04-16T18:00:00.000Z",
    "group": {
      "group_id": 2,
      "group_name": "Cleveland Horse Enthusiasts",
      "description": "We are enthusiastic about horses!",
      "category": "animals"
    }
  },
  {
    "event_id": 3,
    "title": "Syntax Error Cookout",
    "description": "We will be eating non-expired beef in the park",
    "address_1": "123 Park Street",
    "address_2": "",
    "city": null,
    "state": "OH",
    "zipcode": "44124",
    "time": "2021-04-20T21:30:00.000Z",
    "group": {
      "group_id": 1,
      "group_name": "JavaScript Meet Up",
      "description": "We meet up and write code",
      "category": "religious"
    }
  },
  {
    "event_id": 5,
    "title": "Cookout in the Park",
    "description": "We will be hosting our annual cookout serving our four legged friends who didn't make it this year.",
    "address_1": "123 Park Street",
    "address_2": "",
    "city": null,
    "state": "OH",
    "zipcode": "44124",
    "time": "2021-04-28T22:00:00.000Z",
    "group": {
      "group_id": 2,
      "group_name": "Cleveland Horse Enthusiasts",
      "description": "We are enthusiastic about horses!",
      "category": "animals"
    }
  }
]
```

### Data for One Specific Event

GET request to /api/events/:event_id

```
{
  "event_id": 1,
  "title": "Group Coding at Stephen's",
  "description": "We're gonna write some JavaScript while watching Sister Wives",
  "address_1": "1600 Pennsylvania Avenue",
  "address_2": "Apartment 3",
  "city": null,
  "state": "OH",
  "zipcode": "44124",
  "time": "2021-04-11T00:00:00.000Z",
  "group": {
    "group_id": 1,
    "group_name": "JavaScript Meet Up",
    "description": "We meet up and write code",
    "category": "religious"
  }
}
```

### List Attendees for Event

GET request to /api/events/:event_id/attendees

Not listed means they haven't responded.
attending: 1 = yes they are attending
attending: 0 = they responded no, they are not attending
```
[
  {
    "user_id": 1,
    "first_name": "Stephen",
    "last_name": "Hyde",
    "email": "stephen@friend.horse",
    "attending": 1
  },
  {
    "user_id": 11,
    "first_name": "Colleen",
    "last_name": "McCohort",
    "email": "colleen@gmail.com",
    "attending": 1
  },
  {
    "user_id": 12,
    "first_name": "JiHang",
    "last_name": "McCohort",
    "email": "jihang@gmail.com",
    "attending": 0
  },
  {
    "user_id": 13,
    "first_name": "Adrian",
    "last_name": "McCohort",
    "email": "adrain@gmail.com",
    "attending": 1
  },
  {
    "user_id": 14,
    "first_name": "Joe",
    "last_name": "McCohort",
    "email": "joe@gmail.com",
    "attending": 0
  },
  {
    "user_id": 15,
    "first_name": "Ross",
    "last_name": "McCohort",
    "email": "ross@gmail.com",
    "attending": 1
  }
]
```

### List ALL DMs (may be useful for debugging)

GET request to /api/dms

Same format as data at /api/users/:user_id/dms

### List Groups by Category

GET request to /api/groups/category/:category_name (for example: /api/groups/category/animals)

Same format as data at /api/groups

### List Events by Category

GET request to /api/events/category/:category_name (for example: /api/groups/category/religious)

Same format as data at /api/events
