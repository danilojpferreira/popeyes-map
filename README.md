<h1 align="center">
	🥬 Popeyes Maps 📍
</h1>

<p align="center">
  This project comprises frontend, backend and database solutions to create a Progressive Web App (PWA) to monitor the movement of Popeyes on the island of Malta, as part of the JS Assessment.
</p>

<p align="center">
	<a href="#about">About</a> •
	<a href="#usage">Usage</a> •
    <a href="#documentation">Documentation</a> •
	<a href="#authors">Authors</a> 
</p>

# About

This project has three main applications:

    1 - frontend, built with React.JS Framework, that provides a visual interface for Popeyes.
    2 - Backend, an API built with Node.JS and Express.JS, that provide data to the frontend. The data is streammed using Websocket protocol.
    3 - Database, an Instance of MongoDB, that store the routes and share it with the Backend.

# Usage

There is an installation and usage guide, it is recommended to use Docker, it makes configuring apps very simple. However, you can install and run it manually, so there is a guide for each application in this project and it is recommended to start in the following order: database, backend and frontend.

## Requirements and Install

Easily, you can only use Docker (https://www.docker.com/products/docker-desktop), and no need install any additional software.

Otherwise, if you prefer to run this project without a virtualization service (container), you need to have the following software installed and running on your environment:

1. MongoDB version 4+: https://docs.mongodb.com/manual/installation/
2. MongoDB Import at version 100.5.1+: https://docs.mongodb.com/database-tools/mongoimport/
3. Node.JS at version 17.2.0: https://nodejs.org/
4. Node package manager (as npm or yarn. In this project we're usign Yarn at version 1.22.17): https://yarnpkg.com/getting-started/install

   If you are using Macbook, `Homebrew` it is recommended to install all necessary software, respectively the formulaes mongodb-community, mongodb-database-tools, node@14 and yarn.

## Execute

### With Docker

Ensure you have docker and docker-compose installed on your system. Usually, docker-compose comes with Docker Desktop. Then, you should to open a new terminal tab, go to project folder (root) and type:
```bash
docker-compose up -d
```

When you finish, to close the application use the command:
```bash
docker-compose down
```

### Without Docker

#### MongoDB

First you need to ensure it is a running mongodb server instance. Usually, to run a mongodb instance you need to open a new terminal and type the following code:

```bash
mongod
```

In general, it will run on `localhost` (or `127.0.0.1`) on port `27017`. When running your mongodb node, you will see the host information, and if it is different from the default value, update the .env file in the root of the backend project, following the .env.example provided, with a full address in the MONGO_URI field.

Assuming you have a mongodb instance running and with the data, now it's time to insert the data into your server. You must open a new terminal and move to the database folder. In the database folder root, you must run the following command:

```bash
mongoimport --db popeyes --collection maps \
    --drop --file ./base.json
```

It will create the database and collection used to serve the backend application. After running this code successfully, it's time to run the backend application.

#### Backend

Go to the backend folder with your terminal. You must have node.js and your favorite node package manager installed. We'll use yarn in the following examples, but you can use npm and just change the `yarn` command to `npm run` in each bash. Install node modules and start your server with the command:

```bash
yarn install && yarn start
```

It should start your backend server. By default, the server starts on localhost on port 3000, you can change this with the PORT property on .env file. Just remember that when you change it, it needs to be updated on the front end, in the `src/app/utils/config.tsx` file, by changing the value of the WS_SERVER variable.

#### frontend

So now it's time to run the last application, the front end. Here we have two options: run on a node server (recommended) or build a static website (run the `yarn build` or `yarn build:prod` command), create a web server and deploy. The second option is the most used for web application, but for now I will provide a faster way, using only the node. You should open a new terminal and go with this one to the frontend root folder and run the command:

```bash
yarn install && yarn start
```

It should start your application at localhost:8080, and you can access this with your browser by going to http://localhost:8080. If port 8080 was already in use for another application, the frontend can be started on another port like 8081 and sequentially. You should look for the correct address in your terminal under `Project is running at:`.

# Documentation

### frontend

The frontend application was built using React.JS Framework version 17.0.2, using typescript language. The application consists of Render three pages:

#### Main page:

located in `src/app/pages/Main`, consisting of two files: `index.tsx`, which is a TypeScript component itself, and `styles.scss`, which provides the style sheet. The main page renders a `Card` (styled div), with a `Typing` (where the text is displayed as if someone is typing), a `Select` (a list of path options) and finally a used `Button ` to click on the selected option and go to the Maps page. All these mentioned component fragments are located in `src/app/components`.

Select has a list that is made up of an array of objects. Each object has the following structure:

```javascript
{
    value: 'string',
    label: 'string',
}
```

The label is the string shown in the Select component, and the value is the variable representing an application router (eg `localhost:8080/map/value`).

To maintain state, this JSX element stores two local states, use the `useState` hook:

- The first `[showList, setShowList]` is a boolean type that represents a conditional to show the list. The default value is `false` and becomes `true` when the `Typing` component finishes rendering the text.

- The second `[map, setMap]` is a type of string that represents the map selected to navigate. There is no default value, and when it has some value, the GO button is shown.

After clicking the GO button, the Router application (implemented with `react-router-dom`) navigates to the route specified in the `map` variable, which is the path of the selected list, chosen in `Select`.

#### Maps page:

located in `src/app/pages/Maps`, consisting of two files: `index.tsx`, which is a Javascript component itself, and `styles.scss`, which provides the style sheet. The main page renders a `Card` (styled div), with a `Map`, the visual map and control components: `Back`, `Play/Pause` and `Reset` buttons (which are simple divs with SVG and button role), `Select` to choose the speed, where it can be fast (1 second each movement), medium (5 seconds each movement) and slow (10 seconds each movement), ` Slider` which is a visual user component located on the path and can be used as a controller, and a simple `Text` to show the remaining time of arrival.

When this JSX fragment was initialized, some process was started, it is:

1. Load the following hooks: useDispatch (used to send states to redux), useNavigate (used to navigate to other pages), useWindowDimensions (which provides screen height and width, to run on all devices like smartphones) and useParams (used to get the main route information. These are `map`, the path to load, `vehicle`, the vehicle shown on the map to represent the user, and `reverse`, an optional parameter that specifies whether the route needs to be reversed).
2. Try connecting to the Websocket server. on Line 40 the connection is made with the default `localhost:3030`, but it can be changed in `src/utils/config.tsx` by changing the value of the variable `WS_SERVER`, as mentioned.
3. Send to redux storage (a global store) a `isLoading` state. This enables a loader screen, which is located in `src/app/components/Loading` and is implemented in the main component of the `src/app.tsx` route. The Loading component works by 'listening' to the `isLoading` variable in redux storage and if it becomes `true`, a Loading view is rendered above any other current view, otherwise only the current view is rendered.
4. Initialize the local states, use the useState hook, which is composed of:
   `[id, setId]`, a number that holds the ID of the current request, used to avoid loading data from other requests to the same client.
   `[steps, setSteps]`, a number that keeps track of how many steps the user has taken on the path.
   `[maxSteps, setMaxSteps]` a number representing how many steps the full path has.
   `[play, setPlay]` a boolean representing whether to play or pause the path.
   `[coordinates, setCoordinates]` an array of array of numbers, representing the coordinates of the path, used to stream motion data.
   `[speed, setSpeed]` a number representing the time between moves, in milliseconds.
   `[timer, setTimer]` a number representing the time remaining on the path, in seconds.
   `[viewport, setViewport]` an object with properties over map view settings.
5. Send a message to the backend, requesting the map. This step is defined by a useEffect hook (line 75) and is executed every time the play, speed or map changes, requesting new information.
6. Receive a message from the backend. If `isLoading` is active, wait 2 seconds and deactivate it, and get the received data and update the following states: maxSteps, steps and coordinates, to load the data in the map and in the controllers (like timer and slider), and update the viewport, to center the user on the map. This implementation uses a useEffect hook (line 92) and runs every time it receives new data from the backend (lastJsonMessage variable), or the id and map variables change, informing that the plotted points need to be changed.
7. Set the timer value, the timer is an implementation that uses a useEffect (line 125), and reruns whenever maxSteps, speed or steps change, so you can imagine if the speed is around 10 seconds, this useEffect will be runs only after 10 seconds, and this is true. Then there's another useEffect (line 129) that implements a workaround, updating the data every second if play is true.
8. Finally, the last useEffect (line 143) sets play off, if the path has ended (when the steps become equal to maxSteps).

You may notice that when using useEffect and hooks, events become interdependent, which can be confusing, but this documentation tries to explain exactly the usage. Every action you do on this screen (except the back button) triggers one of the mentioned useEffects, and can create a non-Hamiltonian chain effect, which updates the necessary states.

If you try to access a map that does not exist, you will be redirected to the Error page.

#### Error page:

Located in `src/app/pages/Error`, consisting of two files: `index.tsx`, which is a Javascript component itself, and `styles.scss`, which provides the style sheet. The main page renders an error message with a 'Back' button, which takes you to the main page.

#### Main Libraries used

| Lib                        | Version          | Use                                                    |
| -------------------------- | ---------------- | ------------------------------------------------------ |
| @material-ui/core          | 4.12.3           | Provide material design components for web development |
| mapbox-gl and react-map-gl | 2.6.1 and 6.1.18 | Implements the map library                             |
| react-router-dom           | 6.2.1            | Collection of navigation components                    |
| react-use-websocket        | 2.9.1            | Simple-to-use websocket communications hook            |
| redux                      | 4.1.2            | Implement global application state                     |

### Back-End

This Backend application is a really simple project, forked of https://github.com/luiztools/nodejs-websockets, that implements a web server API with Node.JS and Express.JS, using the Javascript language. This application starts on port 3000 by default, but you can configure it by creating a `.env` file, following the `.env.example` template. The application starts a server (index.js) applying modules built on app.js and app-ws.js.

The first template is a basic use of Express.js. The second model is a controller, which provides connections and responses to clients. When the application is used, a websocket application is initialized, provided by the `ws` package. All messages are redirected to the `onMessage` function which receives the frontend request and provides a response. It works by following these steps:

1. When a message is received, the server tries to get the map data. This data is stored in a mongodb collection. The official mongodb driver for javascript is used to perform this query.
2. After identifying the map, it checks if it needs to be reversed, and if so, it executes a .reverse() function, which reverses the map.
3. It is then checked whether it can be played (by boolean play). If so, the coordinates were transmitted one by one, using the speed variable as sleep velocity time between streams. Otherwise, just send the first coordinate. In each message, a pigbag was provided, informing the frontend of the following data:
   `id` a requestor number, equal to the frontend id received.
   `map` a string map name, proper to these coordinates.
   `coordinate` an array of two numbers, which represent the map point.
   `size`: a number to represent how many coordinates are in this map.
   `step`: the coordinate index reference.

#### Main Libraries used

| Lib     | Version | Use                                                     |
| ------- | ------- | ------------------------------------------------------- |
| express | 4.17.1  | Provide API server for web application using node.js    |
| mongodb | 4.3.1   | A driver used to connect and perform queries in mongoDB |
| ws      | 7.5.3   | Provide websocket protocol on node.js servers           |

### Database

This project uses MongoDB version 4+ as the database. The stored data is a list of coordinates, starting from a point to another specified ending point. This data is stored in a database called `popeyes` and a collection called `maps`. Each route has this structure:

```json
{
  "name": "string",
  "coordinate": [[0, 0]]
}
```

The name field provides a named map (which is passed from the frontend to the backend when you select a route, and the backend runs a mongodb query to get it) and the coordinate is an array of coordinates. Each coordinate is a tuple of numbers, which represent latitude and longitude. You can see that a tuple, in Json/Bson format, is given by an array with these two data respectively.

## Improvements

This project still has some limitations and can be improved:

    ❌ Streaming can be improved by ending old streams when a new one is requested
    ❌ Login or any type of authorization protocol
    ❌ When using a slider to a point in the future, also transmitting all missing data in the gap range
    ❌ Create a buffer in frontend app
    ❌ Load the available routes into the database, to make the application scalable

# Author

<table>
  <tr>
    <td align="center"><a href="https://github.com/danilojpferreira/"><img style="border-radius: 50%;" height="100px" width="100px" src="https://media-exp1.licdn.com/dms/image/C4E03AQFgk8Q7YSODuw/profile-displayphoto-shrink_800_800/0/1586959675005?e=1643846400&v=beta&t=noednhWncm5IiK9iwZSjlL4fcm8zVkyPOYNjEbw1GMU"><br/><p><b>Danilo Pereira</b></p></a><p>Author</p><a href="https://www.linkedin.com/in/danilojpferreira/">Linkedin</a></td>
  </tr>
  
</table>
