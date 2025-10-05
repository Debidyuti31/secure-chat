import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import SendMessage from './SendMessage';

function App() {
  const [user, setUser] = useState(localStorage.getItem('username') || null);
  const [showRegister, setShowRegister] = useState(true); // toggle between Register/Login

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('privateKey');
    localStorage.removeItem('publicKey');
    setUser(null);
  };

  if (user) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Encrypted Chat</h1>
        <p>Logged in as <b>{user}</b></p>
        <button onClick={handleLogout}>Logout</button>
        <SendMessage />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Encrypted Chat</h1>
      {showRegister ? (
        <>
          <Register onRegister={setUser} />
          <p>
            Already have an account?{' '}
            <button onClick={() => setShowRegister(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <Login onLogin={setUser} />
          <p>
            Don't have an account?{' '}
            <button onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
