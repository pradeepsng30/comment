# Commenting Demo
App has been divided into 2 parts
Express Node based Server  and React based client.

server runs on port `3000`
  
  
Client directory reside  ./client .
Client runs on port 3001
Client talks to server on port 3000

  

MySql DB details (no password)
```host: "localhost",

user: "root",

database: "commenting"
```

# Steps to run 
  

 1.  clone the repo
 2. clone the DB with .sql file
 3. `npm i` in root
 4. start the server by `npm start`
 5.  `npm i` in /client directory
 6.  start the client by `npm start`
 7. open localhost:3001 to see the demo.


# Models
```
Post
    id
    content

Comment
    id
    Parent: PostId | Comment id
    content
    userId
```


Server side API is served with 4 operations

 1. `get-id` gets all comments with parent id id provided
 2. `delete` deletes the comment with provided id
 3. `update` updates the comment with provided id and content
 4. `create` creates a new comment provided content and parent (also used for replying) 

    It USes Mysql to store and query the data
    and provides response in JSON format



Client has Main React Component as `APP`
Which renders the initial comment as static Post. 
`Comment` component requires props

 1. id- unique id
 2. userId- user who created that comment
 3. content
 4. onUpdate - call back function when update is done.

It makes call to server based on its `id` and fetches child comment
renders itself and recursively children make call and render themselves.

    



### TODO: Auth is not integrated yet
### TODO: improve UI
