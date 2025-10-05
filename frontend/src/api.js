import axios from 'axios';

// Backend URL
const API_URL = 'http://127.0.0.1:8000/api';

// ---------------------------
// User APIs
// ---------------------------

// Register a new user
export const registerUser = async (username, publicKey) => {
  try {
    const res = await axios.post(`${API_URL}/users/`, {
      username,
      public_key: publicKey
    });
    return res;
  } catch (err) {
    throw err;
  }
};

// Login / Get user by username
export const loginUser = async (username) => {
  try {
    const res = await axios.get(`${API_URL}/users/?search=${username}`);
    return res;
  } catch (err) {
    throw err;
  }
};

// Get user by username (same as loginUser, but clearer for SendMessage)
export const getUserByUsername = async (username) => {
  try {
    const res = await axios.get(`${API_URL}/users/?search=${username}`);
    return res;
  } catch (err) {
    throw err;
  }
};

// ---------------------------
// Message APIs
// ---------------------------

// Send an encrypted message
export const sendMessage = async (messageData) => {
  try {
    // messageData should include:
    // sender, recipient, encrypted_message, nonce, sender_public_key
    const res = await axios.post(`${API_URL}/messages/`, messageData);
    return res;
  } catch (err) {
    throw err;
  }
};
