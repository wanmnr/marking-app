import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Menu() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <nav className="side-menu">
      <ul>
        <li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/upload">Upload Sheet</NavLink></li>
        <li><NavLink to="/subjects">Subject Management</NavLink></li>
        <li><NavLink to="/export">Export Results</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    </nav>
  );
}

export default Menu;