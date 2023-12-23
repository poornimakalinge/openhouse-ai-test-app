const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

//READ Request Handlers
app.get('/', (req, res) => {
  console.log('req : ', req);
  res.send('REST API with Node.js!!');
});

app.get('/communities', async (_req, res) => {
  const url = 'https://storage.googleapis.com/openhouse-ai-fe-coding-test/communities.json';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return res.json(result);

  } catch (error) {
    return res.status(500).json({error: 'An error occurred while fetching communities'});
  }
});

app.get('/homes', async (_req, res) => {
  const url = 'https://storage.googleapis.com/openhouse-ai-fe-coding-test/homes.json';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({error: 'An error occurred while fetching community homes'});
  }
});


//PORT ENVIRONMENT VARIABLE
const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
