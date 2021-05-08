# youtube-player
This is a demo project for a youtube playlist website that allows adding and removing songs from a playlist, as well as listening to the playlist that someone already created.

It includes both UI and server that broadcasts using websockets.

* Once you add a video url to the playlist it gets added to all connected viewers of the UI app, at the borttom of the playlist.
* Once you added the first video, it starts playing instantly (tested with multiple tabs of the same Chrome browser).
* Once a video finishes playing, it gets removed from the list to all UI app connected viewers.


## Project setup
Please run yarn in both client and server directories:

```
yarn install
```
## Starting server
From server directory, please run: 

```
node index.js
```

## Starting client app

### Compiles and hot-reloads for development

```
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Compiles and minifies for production
```
yarn build
```
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

To view the production version:
```
yarn global add serve
serve -s build
```

### Running unit-tests

```
yarn test
```

Launches the test runner in the interactive watch mode.
