import React, { useState, useEffect } from 'react';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books from the server
    fetch('/api/books', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Log the data received from the server
        console.log('Books data:', data);

        // Set the retrieved books in state
        setBooks(data);
      })
      .catch(error => {
        // Handle errors
        setError(error.message);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      {error && <p>Error fetching books: {error}</p>}
      <h2>Books</h2>
      {books.length === 0 && <p>No books available</p>}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <img src={book.coverimage} alt={`Cover for ${book.title}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
