// src/components/Menu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Menu() {
  const { user } = useAuth();

  if (!user) return null;

  const menuItems = [
    { to: "/", text: "Dashboard" },
    { to: "/sheet", text: "Sheet" },
    { to: "/subjects", text: "Subject Management" },
    { to: "/export", text: "Export Results" },
    { to: "/settings", text: "Settings" },
  ];

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `block py-2 px-4 rounded transition duration-150 ease-in-out ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;