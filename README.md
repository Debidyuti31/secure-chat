# secure-chat
# Secure Chat (End-to-End Encrypted Messaging)
Secure Chat is a full-stack end-to-end encrypted messaging app. All messages are encrypted on the client-side and can only be decrypted by the intended recipient, keeping your conversations private.

Features:
1. End-to-end encrypted messages
2. Real-time chat using WebSockets
3. User authentication and secure login
4. Encrypted storage in MongoDB
5. Responsive and modern UI

How It Works:
1. User registers → generates public/private key pair.
2. Message encryption → client encrypts messages using recipient’s public key.
3. Encrypted message storage → server stores only ciphertext.
4. Decryption → recipient decrypts message with their private key.
