import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../API/books';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    
      <h2>Books</h2>
      {books.length === 0 && <p>No books available As of Right Now! Come Back Later!</p>}
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
