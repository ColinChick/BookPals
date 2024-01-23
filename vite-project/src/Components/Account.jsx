import React, { useState, useEffect } from 'react';

const Account = ({ token }) => {
  const [user, setUser] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    // Check authentication and fetch user information
    if (token) {
      fetchUserData();
      fetchCheckedOutBooks();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      // Make API call to fetch user data
      const response = await fetch('/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCheckedOutBooks = async () => {
    try {
      // Make API call to fetch checked-out books
      const response = await fetch('/api/reservations', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const checkedOutBooksData = await response.json();
      setCheckedOutBooks(checkedOutBooksData);
    } catch (error) {
      console.error('Error fetching checked-out books:', error);
    }
  };

  return (
    <div className="account-container">
      {/* Render user information */}
      {user && (
        <div className="user-info">
          <h2>{user.firstname} {user.lastname}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      {/* Render checked-out books */}
      {checkedOutBooks.length > 0 ? (
        <div className="checked-out-books">
          <h3>Checked Out Books</h3>
          <ul>
            {checkedOutBooks.map((book) => (
              <li key={book.id}>{book.title} by {book.author}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No books checked out.</p>
      )}
    </div>
  );
};

export default Account;
