from rest_framework import serializers
from .models import User, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'public_key']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'encrypted_message', 'nonce', 'sender_public_key', 'created_at', 'read_at']
