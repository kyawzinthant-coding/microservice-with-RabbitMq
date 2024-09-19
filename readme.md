# Microservices Chat App with Message Blocking and RabbitMQ

This project is a microservices-based chat application that supports real-time messaging, message delivery confirmation, and notification services. The application is built for scalability and performance, using RabbitMQ for message brokering and microservice communication. WebSockets (Socket.IO) are used for real-time updates, and notifications are pushed to active users using Firebase SDK, or sent via email using SMTP if the user is offline.

## Table of Contents
- [Microservices Architecture](#microservices-architecture)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture Flow](#architecture-flow)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Microservices Architecture
The application consists of the following microservices:

### 1. **User-Service**
   - Handles user authentication and authorization.
   - Allows users to register, log in, and retrieve user information.

### 2. **Chat-Service**
   - Manages real-time messaging between users.
   - Sends messages and retrieves message history.

### 3. **Notification-Service**
   - Pushes notifications to users when they are online using Firebase SDK.
   - Sends email notifications using SMTP when users are offline.

### **Message Blocking**
   - Message brokering and communication between services are handled through RabbitMQ.
   - RabbitMQ ensures messages are delivered reliably and efficiently between microservices.

### **API Gate Way**
   

## Features
- **Authentication / Authorization**: Secure user registration and login using JWT.
- **Real-time Messaging**: Chat in real time with other users using WebSockets (Socket.IO).
- **Message Delivery Confirmation**: Get confirmation when your message is delivered.
- **Microservices Architecture**: Independent services for users, chats, and notifications for improved scalability.
- **RabbitMQ**: Used for message brokering and to handle inter-service communication.
- **Firebase Notifications**: Push notifications to active users via Firebase SDK.
- **Email Notifications**: Sent via SMTP to inactive users.
- **WebSocket Support**: Provides real-time updates for messaging using Socket.IO.

## Technologies Used
- **Node.js**: Backend platform for running microservices.
- **Express.js**: Web framework for building RESTful APIs.
- **RabbitMQ**: Message broker for communication between microservices.
- **Socket.IO**: WebSocket support for real-time messaging.
- **MongoDB**: NoSQL database for storing user and chat data.
- **Firebase SDK**: For push notifications.
- **SMTP**: Used for sending email notifications.
- **Docker**: Containerization of services for easy deployment and scalability.

## Architecture Flow

The architecture flow of the chat app is as follows:

1. **User Registration/Login**:
   - Users interact with the **User-Service** to register or log in.
   - **User-Service** communicates with **MongoDB** to store and retrieve user information.
   
2. **Real-time Messaging**:
   - Users send and receive messages via the **Chat-Service**.
   - **Chat-Service** handles message storage in **MongoDB** and uses **Socket.IO** for real-time communication.
   - Messages are queued and managed by **RabbitMQ** for reliable delivery.

3. **Notifications**:
   - **Notification-Service** checks user status.
   - If the user is online, notifications are sent using **Firebase SDK**.
   - If the user is offline, an email notification is sent via **SMTP**.


