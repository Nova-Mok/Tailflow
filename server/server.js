const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000' 
  }));

// Redirect user to Google's OAuth 2.0 endpoint for permission

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.get('/auth/google', (req, res) => {
    res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/calendar.readonly`
    );
});

app.get('/auth/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code',
            code
        });

        const accessToken = data.access_token;

        // Redirect to the React frontend app with the access token
        res.redirect(`http://localhost:3000/?token=${accessToken}`);
    } catch (error) {
        console.error("Error fetching access token", error);
        res.status(500).send("Error obtaining access token");
    }
});

app.get('/clearbit/:email', async (req, res) => {
    const email = req.params.email;
  
    try {
      const response = await axios.get(`https://person.clearbit.com/v2/combined/find`, {
        params: {
          email: email
          // Add other parameters here if needed
        },
        headers: {
          'Authorization': `Bearer ${process.env.CLEARBIT_API_KEY}`
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching data from Clearbit:", error);
      res.status(500).send("Failed to fetch data from Clearbit");
    }
});

app.get('/company/:domain', async (req, res) => {
    const domain = req.params.domain;
  
    try {
        const response = await axios.get(`https://company.clearbit.com/v2/companies/find`, {
            params: { domain: domain },
            headers: {
                'Authorization': `Bearer ${process.env.CLEARBIT_API_KEY}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching company data from Clearbit:", error.message);
        res.status(500).send("Failed to fetch company data from Clearbit");
    }
});

app.get('/search/:email', async (req, res) => {
  const email = req.params.email;
  const [name, domain] = email.split('@'); // Splitting the email to get the name before @ and domain after @

  try {
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
          params: {
              key: 'AIzaSyAZM_cVn4hiB5o-41Q_dmD41WeXUsRVR1E',
              cx: 'a6c942d87912f4ba7',
              q: email,
              exactTerms: name,
              imgType: 'face',
              num: 1
          }
      });

      res.json(response.data);
  } catch (error) {
      console.error("Error fetching data from Google Custom Search:", error.message);
      res.status(500).send("Failed to fetch data from Google Custom Search");
  }
});



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
