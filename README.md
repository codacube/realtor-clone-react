# Realtor Clone

From the Packt course on Coursera. Demonstrates a CRUD based web app, using React and Firebase (Firestore, Auth, Storage).

Live demo [here](https://codacube-realtor.netlify.app/) - might not be running (the API keys need to be re-instated)

# NOTES:

- The course didn't cover security of API Keys, I had to research this myself
- I've setup the API keys in netlify. The geolocation key is billable (set to secret)
  - Netlify will warn if a secret key is exposed during the build
  - A netlify function is used to make a call to the server to get the key, all handled by netlify
  - Cloudflare workers can also be used for this (but more setup and it's on a different host)
- Firebase.js settings can be public, security is actually set in Firebase itself, but I've made

# TODO:

- If API keys not present, then display an error or handle it (currently unhandled, shows a blank page, with errors in the console)
