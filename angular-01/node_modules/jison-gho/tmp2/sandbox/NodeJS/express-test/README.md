# What is it
This is a test project for ExpressJS v4 using the following solutions:
- NodeJS + ExpressJS (Middleware / Controller) 
- Templates engine (View): ejs
- Model: Mongoose + MongoDB
- Session storage: mongo-connect
- Configuration manager: nconf 
- Logger: Winston (app logic messages) + Debug (internal library messages)
- Web Sockets: socket.io

Asynchronous JS is written using `async` library.

# Scripts
Additional multi-purpose scripts can be found in `scripts/` folder.

#Usage
1) Install and run MongoDB.
```
mongod --dbpath /mongo/db -v
```
2) Install npm modules
```
npm install
```
3) Initialize the database
```
node db.js  # init database script
```
4) Run the app
```
node app.js
```

Tips: 
Run the app with `supervisor` to automatically update the running app upon code changes.
```
npm install -g supervisor
supervisor app.js
```

# Modes
Launch in development / debug mode:
- Set environment variables:
    - NODE_ENV=development
    - DEBUG=express:*,socket.io:* (logging of particular libs relying on `debug`)

Launch in production mode:
- Set environment variables:
    - NODE_ENV=production
    
Extended logs are saved to `logs/debug.log`.

# Supported use cases
- Log in / log out (signing up via the same form)
- Return user list as JSON (only authenticated users)
- Render index and some other pages (server-side rendering)
- Print the number of index page visits for current user session
- Chat based on Web Sockets (using socket.io), with user authentication