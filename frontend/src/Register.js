import React, { useState } from 'react';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import { registerUser } from './api';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!username) return alert('Enter a username');

    // Generate NaCl key pair
    const keyPair = nacl.box.keyPair();
    const publicKey = naclUtil.encodeBase64(keyPair.publicKey);
    const privateKey = naclUtil.encodeBase64(keyPair.secretKey);

    try {
      const res = await registerUser(username, publicKey);

      if (res.status === 201 || res.status === 200) {
        // Store username, private key, and public key
        localStorage.setItem('username', username);
        localStorage.setItem('privateKey', privateKey);
        localStorage.setItem('publicKey', publicKey);
        setMessage('Registration successful!');
        onRegister(username);
      } else {
        setMessage('Registration failed: ' + (res.data.detail || 'Unknown error'));
      }
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
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
};

export default Register;
