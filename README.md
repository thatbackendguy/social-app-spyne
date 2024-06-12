# Social App
## SDE-1 Assignment Spyne.ai

### Authentication
#### Sign Up
Endpoint: `/api/auth/signup`  
Method: `POST`  
Description: Create a new user.  
Request Body:  
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "password": "password123"
}
```
#### Log In
Endpoint: `/api/auth/login`  
Method: `POST`  
Description: Authenticate a user.  
Request Body:  
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
### Users
#### Get Users
Endpoint: `/api/users`  
Method: `GET`  
Description: Retrieve a list of users.  
Headers: { "x-auth-token": "token" }  

#### Search User by Name
Endpoint: `/api/users/search`  
Method: `GET`  
Description: Search for users by name.  
Headers: { "x-auth-token": "token" }   
Query Params: name=name  

#### Update User  
Endpoint: `/api/users/:id`  
Method: `PUT`  
Description: Update a user's details.  
Headers: { "x-auth-token": "token" }  
Request Body:
```json
{
    "email": "newemail@example.com",
    "mobile": "0987654321"
}
```

#### Follow User
Endpoint: `/api/users/follow/:id`  
Method: `POST`  
Description: Follow another user.  
Headers: { "x-auth-token": "token" }  

#### Delete User
Endpoint: `/api/users/:id`  
Method: `DELETE`  
Description: Delete a user.  
Headers: { "x-auth-token": "token" }  

### Discussions
#### Get Discussions
Endpoint: `/api/discussions`  
Method: `GET`  
Description: Retrieve a list of discussions.  
Headers: { "x-auth-token": "token" }  

#### Search Discussions by Hashtag
Endpoint: `/api/discussions/search`  
Method: `GET`  
Description: Search for discussions by hashtags or text.  
Headers: { "x-auth-token": "token" }  
Query Params:
tags=tag1,tag2
text=search text

#### Create Discussion
Endpoint: `/api/discussions`  
Method: `POST`  
Description: Create a new discussion.  
Headers: { "x-auth-token": "token" }  
Request Body: multipart/form-data with fields text, hashtags, and image  

#### Update Discussion
Endpoint: `/api/discussions`  
Method: `PUT`  
Description: Update an existing discussion.  
Headers: { "x-auth-token": "token" }  
Request Body: multipart/form-data with fields text, hashtags, and image  

#### Like Discussion
Endpoint: `/api/discussions/like/:id`  
Method: `POST`  
Description: Like a discussion.  
Headers: { "x-auth-token": "token" }  

#### Delete Discussion
Endpoint: `/api/discussions/:id`  
Method: `DELETE`  
Description: Delete a discussion.  
Headers: { "x-auth-token": "token" }  

### Comments
#### Add Comment
Endpoint: `/api/comments/:discussionId`  
Method: `POST`  
Description: Add a comment to a discussion.  
Headers: { "x-auth-token": "token" }  
Request Body:
```json
{
    "text": "This is a comment."
}
```
#### Like Comment
Endpoint: `/api/comments/like/:id`  
Method: `POST`  
Description: Like a comment.  
Headers: { "x-auth-token": "token" }    

#### Update Comment
Endpoint: `/api/comments/:id`  
Method: `PUT`  
Description: Update an existing comment.  
Headers: { "x-auth-token": "token" }  
Request Body:
```json
{
    "text": "Updated comment text."
}
```

#### Delete Comment
Endpoint: `/api/comments/:id`  
Method: `DELETE`    
Description: Delete a comment.  
Headers: { "x-auth-token": "token" }    

#### Reply to Comment
Endpoint: `/api/comments/reply/:commentId`  
Method: `POST`  
Description: Reply to an existing comment.  
Headers: { "x-auth-token": "token" }  
Request Body:
```json
{
    "text": "This is a reply to the comment."
}
```

© Yash Prajapati [thatbackendguy](https://www.thatbackendguy.com/about-me)