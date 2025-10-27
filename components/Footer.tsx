
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {currentYear} My Static Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
