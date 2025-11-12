/*
    Netlify automatically detects this netlify/functions folder. It builds the function, and
    keeps the API key secure.
*/

export async function handler(event) {
  // 1. Get the address from the query string
  const { address } = event.queryStringParameters;

  // 2. Get your SECRET key from Netlify's environment variables
  const API_KEY = process.env.VITE_GEOCODING_API_KEY;

  // 3. Build the secure URL
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;

  try {
    // 4. Make the call to Google (this happens on the server)
    const response = await fetch(url);
    const data = await response.json();

    // 5. Send the result back to your React app
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch geocoding data" }),
    };
  }
}
