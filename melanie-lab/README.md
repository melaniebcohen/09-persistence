![cf](https://i.imgur.com/7v5ASc8.png) Lab 09: Persistence
======

## Directory Structure
* **README.md**
* **.gitignore**
* **.eslintrc**
* **.eslintignore**
* **package.json**
  * a `lint` script has been configured for running eslint
  * a `test` script has been configured for running jest
  * a `start` script has been configured for running the server
* **lib/** - contains helper modules
  * **parse-json.js**
  * **parse-url.js**
  * **router.js** 
  * **response.js**
  * **storage.js**
* **model/** - contains resource model
  * **kitteh.js**
* **route/** - contains routes
  * **kitteh-route.js**
* **data/** - contains data within file system
  * **kitteh/**
* **__test__** - contains route tests
  * **kitteh-route-test.js**
* **server.js** - runs the application

## Installation
1. To install this application, download the files from this repository
2. `cd` to the repository directory and run `npm i`
3. Use `npm run start` or `node server.js` to start the server connection
4. Alternatively, run `npm run test` to run tests

## Server Endpoints
Users can make the following requests:

GET: With a valid kitteh id, user can use the following route: 
```
localhost:3000/api/kitteh?id=${kitteh.id}
```

POST: Kittehs can be created using the following route with name and content inputs: 
```
localhost:3000/api/kitteh
```
Kittehs will also have a `says: 'meow'` property 

DELETE: Kittehs can be deleted using the following route: 
```
localhost:3000/api/kitteh?id=${kitteh.id}
```

