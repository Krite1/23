
import React from 'react';
// Fix: Import Link from 'react-router-dom' to resolve 'Cannot find name ReactRouterDOM' error.
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
          My Static Blog
        </Link>
        <nav>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
