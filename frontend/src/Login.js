import React, { useState } from 'react';
import { getUserByUsername } from './api';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!username) return alert('Enter a username');

    try {
      const res = await getUserByUsername(username);

      if (res.data.length === 0) {
        setMessage('User not found');
        return;
      }

      // For demo purposes, we assume privateKey is already in localStorage
      // (generated during registration)
      const userPublicKey = res.data[0].public_key;
      localStorage.setItem('username', username);
      localStorage.setItem('publicKey', userPublicKey);

      onLogin(username);
      setMessage('');
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage('Error: ' + JSON.stringify(err.response.data));
      } else {
        setMessage('Error: ' + err.message);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
