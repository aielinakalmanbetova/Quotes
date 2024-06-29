import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className="container pt-4 w-50 border-bottom border-2 border-dark d-flex">
      <div className="navbar">
        <Link to="/">
          Quotes Central
        </Link>
        <div>
          <Link to="/quotes">Quotes</Link>
        </div>
        <div className="actions">
          <Link to="/new-quote">Submit new quote</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;