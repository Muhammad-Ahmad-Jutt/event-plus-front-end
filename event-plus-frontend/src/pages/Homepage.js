import React, { useContext } from 'react';
import { AuthContext } from '../context/authentication';

export default function Homepage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? (
        <h1>Welcome to Event Plus 🎉</h1>
      ) : (
        <h1>Please Sign In</h1>
      )}
    </div>
  );
}