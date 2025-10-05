from rest_framework import serializers
from .models import User, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'public_key']

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    recipient = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'encrypted_message', 'nonce', 'sender_public_key', 'created_at', 'read_at']
