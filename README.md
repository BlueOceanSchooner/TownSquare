# TownSquare

## API
All API endpoints begin with /api.

- [Users](#Users)
  - [GET List of Users](#list-all-users)
  - [GET Data for User via user_id](#data-for-specific-user)
- [Groups](#Groups)
  - [GET List of All Groups](#list-all-groups)
  - [GET Data for Group by group_id](#info-for-specific-group)
  - [GET Search for Group by Name](#search-for-group-by-name)
  - [GET List Groups by Category](#list-groups-by-category)
  - [GET List Groups User is Member Of](#list-groups-user-is-member-of)
  - [GET List Groups User is Owner Of](#list-groups-user-is-owner-of)
  - [GET List of Members of a Group](#members-in-specific-group)
  - [POST Create Group](#create-group)
- [Events](#Events)
  - [GET List All Events](#list-all-events)
  - [GET Events in Specific Group](#events-in-specific-group)
  - [GET Events in Groups User Belongs To](#events-in-user-groups)
  - [GET Data for Specific Event](#data-for-specific-event)
  - [GET List of Attendees for Event](#list-attendees-for-event)
  - [GET List Events by Category](#list-events-by-category)
  - [POST Create an Event](#add-an-event)
  - [POST RSVP to an Event](#rsvp-to-event)
- [DMS](#dms)
  - [GET List All DMS](#list-all-dms)
  - [GET List DMS Involving User](#list-dms-involving-user)
- [Announcements](#announcements)
  - [GET List Announcements for Group](#announcements-for-group)
  - [POST Create Announcement](#add-announcement)
- [Forum](#forum)
  - [GET List Forum Posts with Children](#forum-posts-with-children)
  - [POST Create Top Level Forum Post](#add-top-level-forum-post)
  - [POST Create Reply to Forum Post](#add-reply-to-forum-post)


-------------------------------
## Errors

If there is an error than the JSON object returned will have one key, errors, with an array of the errors encountered.
```
{
  errors: [
    "first_name is a required field",
    "last_name is a required field
  ]
}
```

-------------------------------
## Users

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
-------------------------------
## Groups

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

### Search For Group By Name

GET request to /api/groups/search?name=searchTerm (replace "searchTerm" with name you are searching for)

- If the search term contains spaces you will need to URL encode it before making the request
- If you want an exact match, add "&exact=true" to the end of the URL
- Data is in the same format as other group data requests
- Letter case does not matter

Examples:

`/api/groups/search?name=ends` WILL match the group name "Friends"

`/api/groups/search?name=ends&exact=true` WILL NOT match the group name "Friends"


### List Groups by Category

GET request to /api/groups/category/:category_name (for example: /api/groups/category/animals)

Same format as data at /api/groups



### List Groups User is Member Of

GET request to /api/users/:id/groups-member

```
[
  {
    "group_id": 1,
    "image_url": "/assets/images/default-religious.jpg",
    "group_name": "JavaScript Meet Up",
    "description": "We like to code",
    "category": "religious",
    "owner": {
      "user_id": 1,
      "first_name": "Stephen",
      "last_name": "Hyde",
      "email": "stephen@friend.horse"
    }
  },
  ...
]

```

### List Groups User is Owner Of

GET request to /api/users/:id/groups-owned

```
[
  {
    "group_id": 1,
    "image_url": "/assets/images/default-religious.jpg",
    "group_name": "JavaScript Meet Up",
    "description": "We like to code",
    "category": "religious",
    "owner": {
      "user_id": 1,
      "first_name": "Stephen",
      "last_name": "Hyde",
      "email": "stephen@friend.horse"
    }
  },
  ...
]

```

### Members in Specific Group

GET request to /api/groups/:id/members

```
[
  {
    "user_id": 12,
    "first_name": "JiHang",
    "last_name": "McCohort"
  },
  {
    "user_id": 13,
    "first_name": "Adrian",
    "last_name": "McCohort"
  }
]
```

### Create Group

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

If successful the data will be returned in the same format as when you GET request a group by group_id.


-------------------------------
## Events

### List All Events

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
  ...
]
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


### Events in User Groups

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


### Data for Specific Event

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

### List Events by Category

GET request to /api/events/category/:category_name (for example: /api/groups/category/religious)

Same format as data at /api/events


### Add an Event

POST request to /api/events with data of the structure: (Note: Address MUST be valid!)

```
{
    "group_id": 1,
    "title": "Underwater Whiteboarding",
    "description": "AKA Waterboarding",
    "address_1": "1385 Merry Oaks Trail",
    "address_2": "",
    "city": "Chagrin Falls",
    "state": "OH",
    "zipcode": "44022",
    "event_date": "2021-05-28 21:15:00"
}
```

### RSVP to Event

POST request to /api/events/:event_id/attendees

Send data in the format:

```
{
  "user_id": 1,
  "attending": 1 // 1 = attending, 0 = not attending
}
```






-------------------------------
## DMS

### List ALL DMs

GET request to /api/dms

Same format as data at /api/users/:user_id/dms



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



-------------------------------
## Announcements

### Announcements for Group

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

### Add Announcement

POST request to /api/groups/:id/posts

Send data in the following format:

```
{
  "title": "Title of Announcement",
  "user_id": 1, // (the author of the post)
  "body": "This is the body of the announcement"
}

```

If successful it will return the data for the created announcement

--------------------------------
# Forum


### Forum Posts With Children

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

### Add Top Level Forum Post

POST request to /api/groups/:group_id/forum with data having the structure:

```
{
  "group_id": 1,
  "user_id": 1,
  "message": "This is a top level post"
}
```

If successful the data will be in the same format as when you request all posts, but not in an array.

### Add Reply to Forum Post

POST request to /api/groups/:group_id/forum-reply with data having the structure:
```
{
  "group_id": 1,
  "user_id": 2,
  "forum_post_id": 1,
  "message": "And this is a response to that top level post"
}
```

If successful the data returned will be in the format:

```
{
    "reply_id": 3,
    "posted": "2021-04-08T00:03:10.000Z",
    "message": "That joke was dumb! Also you replied to your own post.",
    "author": {
        "user_id": 2,
        "first_name": "Fred",
        "last_name": "Flintstone",
        "email": "fred@gmail.com"
    }
}
```
