# Project Overview
The project is a web application that enables users to perform legal searches and retrieve summaries of search results. It consists of a client-side JavaScript file (main.js) that handles user interactions and a server-side JavaScript file (server.js) that communicates with external APIs to retrieve data and provide search results.

## Main.js
'main.js' is responsible for the client-side functionality of the web application. It uses the Axios library to make asynchronous HTTP requests to the server for searching and retrieving content summaries. Here are the key components of main.js:

- Event Listeners: The file attaches event listeners to various elements in the HTML, such as the search button and result elements. When users interact with these elements, it triggers corresponding functions.

- Search Functionality: When the search button is clicked, the searchButton event listener is triggered. This function sends a POST request to the server, passing the search query and selected database (USA or Canada) as parameters. The server responds with search results, which are then displayed on the webpage.

- Result Display: The displayResults function is responsible for rendering search results on the webpage. It creates HTML elements dynamically for each search result, including titles, URLs, and buttons to get summaries or find similar results.

- Summary Retrieval: When the "Get Summary" button is clicked, the resultsContainer event listener is triggered. This function sends a POST request to the server to retrieve a summary for the selected result. The summary is then displayed on the webpage.

## Server.js
'server.js' is the server-side component of the project. It is built using Node.js and Express.js and communicates with external APIs to handle search requests and content summaries. Here are the key components of server.js:

- Middleware: The server uses various middleware, including dotenv for environment variables, body-parser for parsing JSON data, and cors for cross-origin resource sharing.

- Routes: The server defines two routes: /search and /contents. The /search route handles search requests and communicates with the Metaphor API to retrieve search results. The /contents route fetches content summaries using the Metaphor API and OpenAI's GPT-3.

- Metaphor API: The server uses the Metaphor API to perform legal searches and retrieve content summaries. It configures the API client with an API key and uses it to search for legal information and retrieve content.

- OpenAI GPT-3: The server uses the GPT-3 API from OpenAI to generate summaries of legal content. It sends content to GPT-3 and receives summaries in response.

- Server Listening: The server listens on a specified port (defaulting to 3000) and logs a message to indicate that it is running.

## How to Run the Project
To run this project, you will need to:

1. Set up environment variables for your API keys by adding your OpenAI API key & Metaphor API Key to the .env file in the project directory.

2. Install the required Node.js packages by running `npm install` in the project directory.

3. Start the server by running `node server.js` in the project directory.

4. Open the web application in your browser by opening up index.html.

5. Interact with the web application to perform searches and retrieve summaries.

This readme provides an overview of the full-stack project's functionality and components. To run the project successfully, ensure that you have the necessary API keys and dependencies installed.

## Example search queries

- Spousal Support Cases
- Net equalization property cases
- Child support over 18 years of age
- Prenup matrimonial home