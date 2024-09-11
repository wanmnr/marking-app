import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';

function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Menu />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;