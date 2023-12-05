const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const baseURL = 'https://api.connect.stanbicbank.co.ke/api/sandbox';
const apiKey = '6135a571f45b0039e91f5717e6031996'; // Your actual consumer key
const apiSecret = '45065a1d39a5fb8224e079098111deb9'; // Your actual secret key

let accessToken = '';

// Fetch access token
const fetchAccessToken = async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/oauth2/token`, {
      grant_type: 'client_credentials',
      client_id: apiKey,
      client_secret: apiSecret,
    });
    accessToken = response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.message);
  }
};

// Transfer funds
app.post('/transfer', async (req, res) => {
  try {
    const response = await axios.post(
      `${baseURL}/rtgs-payments`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error initiating transfer:', error.message);
    res.status(500).json({ error: 'Failed to transfer funds.' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Fetch access token on server startup
fetchAccessToken();
