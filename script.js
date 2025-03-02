const API_KEY = 'AIzaSyBT2YzeGMUvCj4wGhUdQQbfUQzU_M0CO1M'; // Replace with your API key
const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

async function searchBooks() {
    const query = document.getElementById('search-box').value.trim();
    const resultsContainer = document.getElementById('results-container');

    if (query === '') {
        alert("Please enter a book name to search.");
        return;
    }

    resultsContainer.innerHTML = '<p>Loading...</p>';  // Loading indicator

    try {
        const response = await fetch(`${API_URL}${query}&key=${API_KEY}`);
        const data = await response.json();

        resultsContainer.innerHTML = '';  // Clear previous results

        if (data.items && data.items.length > 0) {
            data.items.forEach(book => {
                const bookInfo = book.volumeInfo;
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';

                bookCard.innerHTML = `
                    <img src="${bookInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="Book Cover">
                    <h3>${bookInfo.title}</h3>
                    <p><strong>Author:</strong> ${bookInfo.authors?.join(', ') || 'Unknown'}</p>
                    <p>${bookInfo.description?.substring(0, 100) || 'No description available'}...</p>
                    <a href="${bookInfo.previewLink}" target="_blank">Read More</a>
                `;
                resultsContainer.appendChild(bookCard);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found!</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Error fetching books. Please try again later.</p>';
    }
}

