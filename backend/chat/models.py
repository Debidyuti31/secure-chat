from django.db import models

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    public_key = models.TextField()  # base64 public key
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    encrypted_message = models.TextField()  # base64 encrypted message
    nonce = models.CharField(max_length=255)  # base64 nonce
    sender_public_key = models.TextField()  # sender's base64 public key
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.sender.username} → {self.recipient.username}"
