document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('results');

    const apiEndpoint = 'https://www.superheroapi.com/api.php/e08e695326131c6271c7a1289331337f/search/'; // replace with actual API endpoint

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            searchSuperheroes(query);
        } else {
            alert('Please enter a superhero name to search.');
        }
    });

    function searchSuperheroes(query) {
        fetch(`${apiEndpoint}${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.response === "success") {
                    displayResults(data.results);
                } else {
                    resultsContainer.innerHTML = '<p class="text-danger">No superheroes found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultsContainer.innerHTML = '<p class="text-danger">An error occurred while searching.</p>';
            });
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach(superhero => {
            const superheroCard = `
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${superhero.image.url}" class="card-img" alt="${superhero.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${superhero.name}</h5>
                                <p class="card-text"><strong>Full Name:</strong> ${superhero.biography['full-name']}</p>
                                <p class="card-text"><strong>Publisher:</strong> ${superhero.biography.publisher}</p>
                                <p class="card-text"><strong>First Appearance:</strong> ${superhero.biography['first-appearance']}</p>
                                <p class="card-text"><strong>Power Stats:</strong> Intelligence: ${superhero.powerstats.intelligence}, Strength: ${superhero.powerstats.strength}, Speed: ${superhero.powerstats.speed}, Durability: ${superhero.powerstats.durability}, Power: ${superhero.powerstats.power}, Combat: ${superhero.powerstats.combat}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
            resultsContainer.innerHTML += superheroCard;
        });
    }
});
