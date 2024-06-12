# Social App
## SDE-1 Assignment Spyne.ai

### Authentication
#### User Signup
Endpoint: `/api/auth/signup`
Method: POST
Body:
```
{
  "name": "Yash Prajapati",
  "mobile": "7285850155",
  "email": "yash@thatbackendguy.com",
  "password": "yash1234"
}
```
Response:
```
{
  "msg": "User registered successfully"
}
```

#### User Login
Endpoint: `/api/auth/login`
Method: POST
Body:
```
{
  "email": "yash@thatbackendguy.com",
  "password": "yash1234"
}
```
Response:
```
{
  "token": "jwt-token-here"
}
```

### User Management
#### Get List of Users
Endpoint:`/api/users`
Method: GET
Headers:
```
{
  "x-auth-token": "jwt-token-here"
}
```
Response:
```
[
  {
    "_id": "user-id",
    "name": "John Doe",
    "mobile": "1234567890",
    "email": "john.doe@example.com",
    "followers": [],
    "following": []
  }
]
```

#### Search User by Name
Endpoint: `/api/users/search?name=Yash`
Method: GET
Headers:
```
{
  "x-auth-token": "jwt-token-here"
}
```
Response:
```
[
  {
    "_id": "user-id",
    "name": "Yash Prajapati",
    "mobile": "7285850155",
    "email": "yash@thatbackendguy.com",
    "followers": [],
    "following": []
  }
]
```

#### Follow a User
Endpoint: `/api/users/follow/:id`
Method: POST
Headers:
```
{
  "x-auth-token": "jwt-token-here"
}
```
Response:
```
{
  "msg": "User followed successfully"
}
```

### Discussion Management
#### Create a Discussion

Endpoint: `/api/discussions`
Method: POST
Headers:
```
{
  "x-auth-token": "jwt-token-here",
  "Content-Type": "multipart/form-data"
}
```
Body:
Form-data (key-value pairs):
text: This is a discussion text.
image: (select a file)
hashtags: tag1,tag2

Response:
```
{
  "_id": "discussion-id",
  "user": "user-id",
  "text": "This is a discussion text.",
  "image": "uploads/file-name",
  "hashtags": ["tag1", "tag2"],
  "createdOn": "2023-10-10T10:10:10.000Z",
  "likes": [],
  "comments": [],
}
```

#### Get Discussions by Hashtags
Endpoint: `/api/discussions/search?tags=tag1,tag2`
Method: GET
Headers:
```
{
  "x-auth-token": "jwt-token-here"
}
```
Response:
```
[
  {
    "_id": "discussion-id",
    "user": "user-id",
    "text": "This is a discussion text.",
    "image": "uploads/file-name",
    "hashtags": ["tag1", "tag2"],
    "createdOn": "2023-10-10T10:10:10.000Z",
    "likes": [],
    "comments": [],
    "views": 0
  }
]
```

#### Like a Discussion
Endpoint: `/api/discussions/:id/like`
Method: POST
Headers:
```
{
  "x-auth-token": "jwt-token-here"
}
```
Response:
```
{
  "msg": "Discussion liked successfully"
}
```

### Comment Management
#### Add a Comment
Endpoint: `/api/comments/:discussionId`
Method: POST
Headers:
```
{
  "x-auth-token": "jwt-token-here"
}
```
Body:
```
{
  "text": "This is a comment."
}
```
Response:
```
{
  "_id": "comment-id",
  "user": "user-id",
  "discussion": "discussion-id",
  "text": "This is a comment.",
  "likes": [],
  "replies": []
}
```

#### Like a Comment
Endpoint: `/api/comments/:id/like`
Method: POST
Headers:
```
{
  "x-auth-token": "jwt-token-here"
}
```
Response:
```
{
  "msg": "Comment liked successfully"
}
```

© Yash Prajapati [thatbackendguy](https://www.thatbackendguy.com/about-me)