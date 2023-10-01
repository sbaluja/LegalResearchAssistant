const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const loadingMessage = document.getElementById("loadingMessage");
const countrySelect = document.getElementById("country");

const usaDatabases = ["https://www.thelaw.net/", "https://www.caseclerk.com/", "https://www.anylaw.com/", "https://lexroll.com/"]
const canDatabases = ["https://www.canlii.org/"]

searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    const selectedCountry = countrySelect.value;
    const selectedDatabase = selectedCountry === "usa" ? usaDatabases : canDatabases;
    // Show the loading message while waiting for the response
    loadingMessage.style.display = "block";

    // Make a POST request to the search endpoint
    axios.post('http://localhost:3000/search', { 
            query: query, 
            database : selectedDatabase
        }).then((response) => {
            const results = response.data.results; // Assuming the API returns an array of results
            // Display the results in the resultsContainer
            displayResults(results);
        })
        .catch((error) => {
            console.error("Error fetching search results:", error);
        }).finally(() => {
            // Hide the loading message when the response is received (success or error)
            loadingMessage.style.display = "none";
        });
});

resultsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("getContentButton")) {
        const resultId = event.target.dataset.resultId;
        // Find the corresponding result element by resultId
        const resultElement = document.getElementById(resultId);
            
        // Create a paragraph element to display the content
        const contentParagraph = document.createElement("p");
        contentParagraph.textContent = "Loading...";
        
        // Append the content paragraph to the result element
        resultElement.appendChild(contentParagraph);
        axios.post('http://localhost:3000/contents', { resultId })
        .then((response) => {
            const summary = response.data
            contentParagraph.textContent = summary;
        })
        .catch((error) => {
            console.error("Error fetching search results:", error);
        });
        // Use the Metaphor API's /contents endpoint to get the content of the selected result
        // Display the content to the user
    }
});

function displayResults(results) {
    resultsContainer.innerHTML = "";
    results.forEach((result) => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("result");
        resultElement.id=result.id
        if(result.title === null){
            result.title = "No Title Found"
        }
        resultElement.innerHTML = `
            <h2>${result.title}</h2>
            <a href="${result.url}">
            <p>${result.url}</p>
            </a>
            <button class="getContentButton" data-result-id="${result.id}">Get Summary</button>
        `;
        resultsContainer.appendChild(resultElement);
    });
}

