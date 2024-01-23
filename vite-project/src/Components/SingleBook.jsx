import React, { useState, useEffect } from 'react';

const SingleBook = ({ bookId, token }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {

    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${bookId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const bookData = await response.json();
          setBook(bookData);
        } else {
       
          console.error('Failed to fetch book details');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [bookId, token]);

  return (
    <div>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Description: {book.description}</p>
          <img src={book.coverimage} alt={`Cover of ${book.title}`} />
          <p>Available: {book.available ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default SingleBook;
