# Realtor Clone

From the Packt course on Coursera. Demonstrates a CRUD based web app, using React and Firebase (Firestore, Auth, Storage).

Live demo [here](https://codacube-realtor.netlify.app/) - might not be running (the API keys need to be re-instated)

## Running locally

- Because of the netlify functions, you need to run this with the netlify CLI to emulate the netlify platform
- Install it with `npm install netlify-cli --save-dev`
- It will read environment variables from the local .env file
- Run the project with `npx netlify dev`. It will:
  - Automatically run `npm run dev`
  - Run the functions found in `netlify/functions`
  - Load the keys and make them accessible via `process.env`
  - Starts a main server (eg. `localhost:8888`). Calls to `/` will serve our Vite app. Calls to `/.netlify/functions` will forward requests to the local function server

## NOTES:

- The course didn't cover security of API Keys, I had to research this myself
- I've setup the API keys in netlify. The geolocation key is billable (set to secret)
  - Netlify will warn if a secret key is exposed during the build
  - A netlify function is used to make a call to the server to get the key, all handled by netlify
  - Cloudflare workers can also be used for this (but more setup and it's on a different host)
- Firebase.js settings can be public, security is actually set in Firebase itself, but I've made

## TODO:

- If API keys not present, then display an error or handle it (currently unhandled, shows a blank page, with errors in the console)
- The
