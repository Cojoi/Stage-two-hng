// app.js

document.addEventListener('DOMContentLoaded', () => {
    // Elements for the search functionality
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const movieDetailsContainer = document.getElementById('movie-details-container');

    // Event listener for the search functionality
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === '') {
            alert('Please enter a search term.');
            return;
        }

        // Clear previous search results
        movieDetailsContainer.innerHTML = '';

        // Replace 'YOUR_API_KEY' with your actual API key and 'YOUR_API_ENDPOINT' with the API endpoint for movie search
        const apiKey = 'YOUR_API_KEY';
        const apiEndpoint = `https://api.example.com/search-movies?query=${searchTerm}&api_key=${apiKey}`;

        // Fetch movie search results from the API
        fetch(apiEndpoint)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch search results.');
                }
                return response.json();
            })
            .then((data) => {
                // Display search results
                if (data.results && data.results.length > 0) {
                    data.results.forEach((result) => {
                        const movieCard = document.createElement('div');
                        movieCard.classList.add('card');
                        // Populate movie card with result data (title, release date, etc.)
                        // Append the movie card to the movieDetailsContainer
                        movieDetailsContainer.appendChild(movieCard);
                    });
                } else {
                    // No results found
                    movieDetailsContainer.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch((error) => {
                // Handle API error
                console.error(error);
                movieDetailsContainer.innerHTML = '<p>Error fetching search results.</p>';
            });
    });
});






// app.js

document.addEventListener('DOMContentLoaded', () => {
    // Elements for displaying movie details
    const movieId = /* Extract the movie ID from the route, e.g., using window.location or a routing library */;
    const apiKey = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    const movieTitle = document.querySelector('[data-testid="movie-title"]');
    const movieReleaseDate = document.querySelector('[data-testid="movie-release-date"]');
    const movieRuntime = document.querySelector('[data-testid="movie-runtime"]');
    const movieOverview = document.querySelector('[data-testid="movie-overview"]');
    const moviePoster = document.querySelector('[data-testid="movie-poster"]'); // Element for displaying movie poster

    // Fetch movie details from TMDB API
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch movie data.');
            }
            return response.json();
        })
        .then((data) => {
            // Populate movie details on the page
            movieTitle.textContent = data.title;
            movieReleaseDate.textContent = `Release Date (UTC): ${data.release_date}`;
            movieRuntime.textContent = `Runtime (minutes): ${data.runtime}`;
            movieOverview.textContent = `Overview: ${data.overview}`;

            // Load movie poster
            const posterPath = data.poster_path;
            if (posterPath) {
                const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
                moviePoster.src = posterUrl;
                moviePoster.alt = 'Movie Poster';
            }
        })
        .catch((error) => {
            // Handle API error
            console.error(error);
            movieTitle.textContent = 'Error fetching data.';
            movieReleaseDate.textContent = '';
            movieRuntime.textContent = '';
            movieOverview.textContent = '';
            moviePoster.src = ''; // Clear poster if an error occurs
        });
});
