import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
      <h1>Event Plus</h1>
      <div>
        <button onClick={() => navigate('/signin')} style={{ marginRight: '10px' }}>Sign In</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </header>
  );
}

export default Header;