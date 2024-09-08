# NestJS Backend Project

## Overview

This project is a backend application built using NestJS. It provides user authentication and management functionality, utilizing PostgreSQL for data storage. The application is containerized using Docker and Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (version 20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29 or later)
- [Node.js](https://nodejs.org/) (version 20 or later)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (version 1.22 or later)

## Installation and Setup

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

### 2. Set Up Environment Variables

Create a .env file in the root directory of the project with the following content:

# Database configuration

DATABASE_TYPE=postgres
DATABASE_URL=postgres://postgres:postgres@postgres:5432/example_db
PGHOST=postgres
DATABASE_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=example_db
DATABASE_SYNCHRONIZE=true

# Environment configuration

NODE_ENV=development
JWT_SECRET=your-secret-key

### 3. Install Dependencies

Install the project dependencies using Yarn:

```bash
yarn install
```

### 4. Build and Run the Application with Docker

Use Docker Compose to build and start the application:

```bash
docker-compose up --build
```

This command will build the Docker images and start the PostgreSQL and NestJS containers.

To stop and remove the containers, use:

```bash
docker-compose down
```

### 5. Running the Application

To start the application in development mode, use:

```bash
yarn start:dev
```

For production, first build the application:

```bash
yarn build
yarn start:prod
```

### 6. Running Tests

To run the unit tests, use:

```bash
yarn test
```

For coverage information, use:

```bash
yarn test:cov
```

### 7. Swagger API Documentation

The application includes Swagger for API documentation. Once the application is running, you can access the Swagger documentation at:

```bash
http://localhost:3000/api/docs
```
