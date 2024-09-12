// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-grow">
        <Menu />
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
