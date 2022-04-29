Chat app

# Functionality
Signup
Login

full crud Messages



####
Models

User
username
password_digest
has_many messages
has_many channels through messages


Channel
name
description
has_many messages
has_many users through messages


Message
user_id
channel_id
belongs_to user
belongs_to channel






