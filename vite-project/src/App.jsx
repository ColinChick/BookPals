import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './Components/Account';  
import Books from './Components/Books';
import Login from './Components/Login';
import Navigation from './Components/Navigations';
import Register from './Components/Register'; 
import bookLogo from './assets/books.png';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div>
        <Navigation token={token} />

        <Routes>
          <Route path="/books" element={<Books token={token} />} />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
