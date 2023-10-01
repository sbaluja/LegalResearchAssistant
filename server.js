require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const { default: Metaphor } = require("metaphor-node");
const openAI = require('openai')

const metaphorClient = new Metaphor(process.env.METAPHOR_KEY)

const gpt = new openAI.OpenAI({
    apiKey : process.env.GPTKEY
});

app.use(cors({origin: '*'}));
app.use(bodyParser.json()) 

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Define a route for handling the Metaphor API search request
app.post("/search", async (req, res) => {
    const  { query, database }  = req.body;
    const response = await metaphorClient.search(query, {
        useAutoprompt : true,
        includeDomains : database,
        numResults: 10,
      });
    res.send(response)
});

// Define a route for handling the Metaphor API get contents request
app.post("/contents", async (req, res) => {
    const { resultId } = req.body;
    contents = (await metaphorClient.getContents([ resultId ])).contents[0].extract
    const chatCompletion = await gpt.chat.completions.create({
        messages: [{ role: 'user', content: 'Summarize the following: \n' + contents }],
        model: 'gpt-3.5-turbo',
      }).catch((err) => {
        if (err instanceof gpt.APIError) {
          console.log(err.status); // 400
          console.log(err.name); // BadRequestError
  
          console.log(err.headers); // {server: 'nginx', ...}
        } else {
          throw err;
        }
      });  
    contents = chatCompletion.choices[0].message.content
    res.send(contents)
    // Make a request to the Metaphor API's /contents endpoint and send the content back to the frontend
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
