# Chat Server

Welcome to the Chat Server project! This application is built with Node.js and TypeScript, utilizing a microservices architecture that incorporates RabbitMQ for messaging and Socket.IO for real-time communication. The project is containerized using Docker, making it easy to deploy and manage.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Features

- User registration and login functionality.
- Real-time messaging between users.
- Message delivery confirmation and retrieval.
- Microservices architecture for scalability.
- Communication via RabbitMQ for message brokering.
- WebSocket support using Socket.IO for real-time updates.
- Containerization with Docker for easy deployment.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **TypeScript**: Superset of JavaScript that adds static types.
- **RabbitMQ**: Message broker for handling communication between microservices.
- **Socket.IO**: Library for real-time web applications enabling bidirectional communication between clients and servers.
- **Docker**: Platform for developing, shipping, and running applications in containers.

## Architecture

The application consists of two main services:

1. **User Service**: Handles user registration, login, and management.
2. **Chat Service**: Manages message sending and retrieval between users.

Both services communicate through RabbitMQ, ensuring decoupled interactions and scalability.


## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- Docker
- Docker Compose

