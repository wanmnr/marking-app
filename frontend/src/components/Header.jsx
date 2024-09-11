
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <div className="logo">
        <Link to="/">Exam Management System</Link>
      </div>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;