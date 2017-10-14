In this folder we have all the necessary files to run the frontend server.
In order to sucessfully run the app, please start the api-server BEFORE starting the frontend server.

## How to run the App
Before running the App all depencies must be installed. Then you can run the app in test mode or production mode.

### `Installing dependencies`
* To install the dependencies run the following command `npm install` in the root folder.

### `Running on test mode`
* To run the App in test/develop mode run the following command `npm start` in the root folder.

### `Running on production mode`
* To run the App in production mode(optimized code) run the following command `npm build` in the root folder.

## What You're Getting
```
+--public/    
 |-- index.html - DO NOT MODIFY
 |-- favicon.ico - React Icon, You may change if you wish.
 |-- manifest.json
+-- src/
 +-- actions/ - All redux actions files are here
  |-- actionTypes.js - Has all the possible ACTIONS for the app
  |-- categoriesActions.js - ACTION - Generates actions for categories
  |-- commentsActions.js - ACTION - Generates actions for comments
  |-- postsActions.js - ACTION - Generates actions for posts
 +-- reducers/ - All redux reducers files are here
  |-- categoriesReducer.js - REDUCER - reducer for all categories actions
  |-- commentsReducer.js - REDUCER - reducer for all comments actions
  |-- initalState.js - Responsible for providing the initial state of the redux store
  |-- postsReducer.js - REDUCER - reducer for all posts actions
  |-- rootReducer.js - REDUCER - reducer responsible to combine all other reducers
 +-- utils/ - Utilities files are here
  |-- BlogAPI.js - Library resposible for api-server interactions
  |-- Idgen.js - Responsible for generating the UUIDs
  |-- TimeFormatter.js - Resposible for formating date object values to a more friendly readable content
 |-- App.js - This is the root of your app.
 |-- App.css - Styles for your app.
 |-- App.test.js - Used for testing. Provided with Create React App. 
 |-- index.js - You should not need to modify this file. It is used for DOM rendering only.
 |-- index.css - Global styles. You probably won't need to change anything here.
 |-- ListAll.js - REACT COMPONENT - Responsible for listing all posts of all categories
 |-- ListByCategories.js - REACT COMPONENT - Responsible for listing all posts under a single category
 |-- logo.svg - Simple logo, not used in this version
 |-- PageNotFound.js - REACT COMPONENT - Responsible for sending message to user when the entered URL is invalid
 |-- PostResume.js - REACT COMPONENT - Responsible for showing the resume info of a single post
 |-- registerServiceWorker.js - Created by create-react-app
 |-- SinglePost.js - REACT COMPONENT - Responsible for showing the details of a single post and also its comments
|-- .gitignore 
|-- README.MD - This README file.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
```