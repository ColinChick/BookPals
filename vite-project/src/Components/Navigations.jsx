import React from 'react';
import { Link } from 'react-router-dom';

const Navigations = () => {
  // Function to handle logout
  const handleLogout = () => {
    // Your logout logic here
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/reservations">Reservations</Link></li>
   
        {localStorage.getItem('token') ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigations;
