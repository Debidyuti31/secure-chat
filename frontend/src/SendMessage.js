import React, { useState } from 'react';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import { getUserByUsername, sendMessage } from './api';

const SendMessage = () => {
  const [recipient, setRecipient] = useState('');
  const [messageText, setMessageText] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    if (!recipient || !messageText) return alert('Fill all fields');

    const sender = localStorage.getItem('username');
    const senderPrivateKey = localStorage.getItem('privateKey');
    const senderPublicKey = localStorage.getItem('publicKey'); // <-- use public key here

    try {
      // Fetch recipient info
      const res = await getUserByUsername(recipient);
      if (!res.data.length) {
        setStatus('Recipient not found');
        return;
      }

      const recipientPublicKey = res.data[0].public_key;

      const nonce = nacl.randomBytes(nacl.box.nonceLength);
      const encryptedMessage = nacl.box(
        naclUtil.decodeUTF8(messageText),
        nonce,
        naclUtil.decodeBase64(recipientPublicKey),
        naclUtil.decodeBase64(senderPrivateKey)
      );

      const payload = {
        sender,
        recipient,
        encrypted_message: naclUtil.encodeBase64(encryptedMessage),
        nonce: naclUtil.encodeBase64(nonce),
        sender_public_key: senderPublicKey
      };

      const sendRes = await sendMessage(payload);
      if (sendRes.status === 201 || sendRes.status === 200) {
        setStatus('Message sent!');
        setMessageText('');
      } else {
        setStatus('Failed to send message');
      }
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Send Message</h2>
      <input
        type="text"
        placeholder="Recipient username"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
      />
      <textarea
        placeholder="Type your message..."
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
      <p>{status}</p>
    </div>
  );
};

export default SendMessage;
