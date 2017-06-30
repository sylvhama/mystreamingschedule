# My Streaming Schedule

Progressive Web App which will help you to share your Twitch streaming schedule.
It uses the **MERN** stack: MongoDB, Express, React and Node.js.
Demo: https://mystreamingschedule.herokuapp.com/

## Why?
I follow a lot of people on Twitch, mostly French streamers. Twitch UX is amazing, I always receive a notification which warns me that my favorites streamers are starting to broadcast. I often try to know when are the regular streams. However Twitch does not provide any tool which allows its users to create a schedule / planning. So users make their owns: 
- http://zerator.com/programmation
- https://domingo.tv/programmation
- http://www.ogaming.tv/news/o-gaming-tv-la-grille-des-programmes/655
- http://imgur.com/a/nBlTB

I have noticed few problems with those homemade solutions:
- It's not mobile friendly;
- Some use images (no SEO);
- Users without a website use a third party not initialy made for this purpose.

So I've tried to bring a safe, mobile friendly and easy to use solution in order to let Twitch users to share their streaming schedule.

## Available Scripts

In the project directory, after running `npm install`, you can run:

### `npm run start`

Runs the app in development mode (nodemon + webpack, see more in _package.json_).
Open [http://localhost:7777/](http://localhost:777) to view it in the browser.

### `npm run test`
Runs unit tests and snapshot tests. It uses [Jest](https://facebook.github.io/jest/docs/tutorial-react.html). `.babelrc` is only used for those tests. 

### `npm run build` **On Prod branch only**

Builds the client app for production to the `public` via [Webpack -p](https://webpack.js.org/guides/production-build/#the-automatic-way).

## Structure
Express / Node.js will handle the API calls and redirect all others requests to index.html. Then the React Router will take care of the rest. Material Design: http://www.material-ui.com/

## Twitch API
Authentification doc: https://dev.twitch.tv/docs/v5/guides/authentication/ 
Authentification sample: https://github.com/TwitchDev/authentication-samples/tree/master/node

## Database and hosting

For MongoDB I use https://mlab.com/, the app is hosted on https://heroku.com/ 

## Babel and Polyfills

ES2015 Presets and more are loaded via [babel-loader](https://github.com/babel/babel-loader). 
Others polyfills: https://polyfill.io/v2/docs/

## Service Worker

I have used a simple Service Worker provided [by Google](https://github.com/googlechrome/samples/tree/gh-pages/service-worker/custom-offline-page). If the user is offline then `offline.html` will be shown. If you use Chrome on an Android device then it will prompt the user if he wants to add the app to his homescreen (you should try it!). From the homescreen, the app provides a standalone / native-like experience. More about Progressive Web Apps: https://developers.google.com/web/progressive-web-apps/
