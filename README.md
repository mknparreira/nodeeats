# Node Eats

Node Eats is an educational project I developed to demostrate how I apply real-world Node.js practices using Express.

It focuses on building a robust and scalable food delivery platform while applying modern software architecture and engineering principles.

The goal is to provide a learning experience by applying all the concepts I have been learning to build modern and scalable application systems, including:

- **Infrastructure Setup**: Implementing an API Gateway with Kong, using RabbitMQ for messaging, Kubernetes for container orchestration, and MongoDB for data storage.
- **Core Resources**: Developing several core modules such as users, restaurants, orders, payments, notifications, and more.
- **API Enhancements**: Focusing on security, resilience, and scalability improvements.
- **Monitoring and Documentation**: Implementing tracing, monitoring and documenting the API with the OpenAPI specification (Swagger).

## Architecture

### RabbitMQ

For more details about how RabbitMQ is configured and used in this system, check the [RabbitMQ Configuration](rabbitmq/docs/rabbitmq.md).

### MongoDB

For more details about how MongoDB is configured and used in this system, check the [MongoDB Configuration](mongodb/docs/mongodb.md).

## Roadmap

The project will be divided into the following phases:

1. Setup API Gateway (**done**)
2. Setup RabbitMQ (**done**)
3. Setup MongoDB (**done**)
4. Setup TypeScript + Express Framework (**done**)
5. Resources (**ongoing**)
6. Enhance API Security
7. Setup Kubernetes
8. Enhance API Resilience
9. Enhance API Scalability
10. Enhance Perfomance
11. Monitoring & Tracing
12. The Open API Documentation
13. Future features

# 1. Setup API Gateway

## Features

| Package                                                                                        | Description                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Kong](https://konghq.com/products/kong-gateway)                                               | API Gateway                                                                                                                                                                                    |
| Authentication using JWT Kong Plugin                                                           | All APIs will only be accessed by a JWT token                                                                                                                                                  |
| [Request termination](https://docs.konghq.com/hub/kong-inc/request-termination/configuration/) | Implements rejection of unauthorized requests to implement a security policy that rejects any request not associated with a defined route. This is done by checking if the route is configured |
| [Response transformer](https://docs.konghq.com/hub/kong-inc/response-transformer/)             | Add HTTP Headers to avoid XSS and Clickjacking attacks                                                                                                                                         |
| [Docker](https://www.docker.com/)                                                              | It makes it easy to create, deploy, and run applications, portable containers that work the same everywhere                                                                                    |
| [CORS](https://docs.konghq.com/hub/kong-inc/cors/)                                             | Enable CORS. CORS allowing resources to be requested from another domain outside the domain from which the resource originated                                                                 |
| [Request transformer](https://docs.konghq.com/hub/kong-inc/request-transformer/)               | Add X-Request-ID (correlation-id) to all endpoints                                                                                                                                             |

# 2. Setup RabbitMQ

To set up RabbitMQ for this project, we've provided an automated shell script that configures the necessary exchanges, queues, and bindings. Follow the instructions below to get RabbitMQ up and running.

## Features

| Package                               | Description         |
| ------------------------------------- | ------------------- |
| [RabbitMQ](https://www.rabbitmq.com/) | AMQP Message Broker |

## Running the Setup Script

The setup script **setup-rabbitmq.sh** is designed to be executed automatically when the RabbitMQ container starts. This script performs the following actions:

- Waits for RabbitMQ to Start: The script waits until RabbitMQ's management API is available before proceeding with configuration.
- Creates an Admin User: A dedicated RabbitMQ admin user (rabbitmq_admin) is created with the specified password.
- Configures Exchanges, Queues, and Bindings: The script declares all necessary exchanges, queues, and bindings as required by the application.

**Environment Variables**

```env
RABBITMQ_USER: Username for the RabbitMQ admin user (default: rabbitmq_admin).
RABBITMQ_PASSWORD: Password for the RabbitMQ admin user (default: my_password).
RABBITMQ_HOST: Hostname for RabbitMQ (default: localhost).
RABBITMQ_PORT: Management API port (default: 15672).
WAIT_TIME: (default:10)
```

To override these defaults, you can set the environment variables in your .env file.

# 3. Setup MongoDB

The `setup-mongo.js` script is automatically executed when the MongoDB container is started, ensuring that all necessary collections and their validation rules are created.

Mongo Express allows easy inspection and management of MongoDB collections through a web interface.

## Features

| Package                             | Description     |
| ----------------------------------- | --------------- |
| [MongoDB](https://www.mongodb.com/) | NO SQL Database |

**Environment Variables**

```env
# MongoDB Configuration
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password

# Mongo Express Configuration
ME_CONFIG_MONGODB_ADMINUSERNAME=admin
ME_CONFIG_MONGODB_ADMINPASSWORD=password
ME_CONFIG_MONGODB_SERVER=mongodb

# Basic Auth Configuration for Mongo Express
ME_CONFIG_BASICAUTH_USERNAME=admin
ME_CONFIG_BASICAUTH_PASSWORD=qwert
```

To override these defaults, you can set the environment variables in your .env file.

# 4. Setup TypeScript + Express Framework

**First, why did I choose Express with TypeScript over NestJS?**

I chose Express with TypeScript because it’s commonly used in serverless environments — especially on platforms like AWS Lambda — where many companies adopt a simpler and more lightweight setup.
This combination offers greater flexibility and control over the structure, which aligns well with the needs of serverless architectures that prioritize minimal overhead and fast execution.

For more details about packages installed, check the [Packages installed](docs/packages.md).

# 5. Resources

All resources, including repository, service, module, model, handlers and so on.

| Resource     | Description                                                                                          | Status |
| ------------ | ---------------------------------------------------------------------------------------------------- | ------ |
| User         | Manages user registration, editing, and viewing information such as name, email, and authentication. | done   |
| Restaurant   | Manages restaurant details, menu offerings, opening hours, and availability status.                  | done   |
| Category     | Organizes and classifies restaurants and menu items into categories.                                 | done   |
| Menu         | Handles menu items for restaurants, including categories and product descriptions                    | done   |
| Order        | Handles the creation, updating, and tracking of food delivery orders, including order status.        |        |
| Payment      | Processes payments and manages payment methods.                                                      |        |
| Delivery     | Coordinates delivery logistics, including assigning couriers and real-time tracking.                 |        |
| Review       | Enables users to leave feedback and ratings for restaurants and delivery experiences.                |        |
| Notification | Sends order updates, promotions, and other alerts to users.                                          |        |

# 6. Enhance API Security

| Package                | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| CORS                   | Enables CORS support to allow requests for another origins.                      |
| Express Mongo Sanitize | Prevents MongoDB Operator Injection by sanitizing incoming data.                 |
| Helmet                 | API protection against vulnerabilities in order to inject security HTTP Headers. |
| XSS-Clean              | Protects against Cross-site Scripting (XSS) attacks by cleaning input.           |
| HPP                    | Prevents HTTP Parameter Pollution attacks.                                       |

# 7. Setup Kubernetes

This section describes how to containerize and orchestrate the services of Node Eats using Kubernetes, simulating a production-like environment commonly adopted in scalable, cloud-native architectures.

# 8. Enhance API Resilience

In this phase, I will implement some strategies to improve the resilience of APIs, ensuring they can handle with failures and recover effectively. I will adopting the following strategies and tools:

- Implement Circuit Breaker using Circuit Breaker package in Kong API Gateway.
- Implement retries e backoff.
- Configure timeout into the entire services in Kong API Gateway
- Implement Fallback Pattern.
- Implement Bulkheads.
- Implement Active Health Checks in Kong API Gateway (liveness prob)
- Implement Failover strategies with Kubernetes (using deployment with replicaSets, HPA)

# 9. Enhance API Scalability

To ensure API Scalability and can handle increasing demand effectively, I will adopting the following strategies and tools:

- Implement Load Balancing with Kubernetes
- Implement Rate Limiting Using the Kong Plugin

# 10. Enhance Perfomance

- Implement Caching with Redis
- Compressing response using Gzip

## Features

| Package          | Description                                       |
| ---------------- | ------------------------------------------------- |
| Kong Compression | Package to enable Kong to accept Gzip compression |
| Redis            | Caching system                                    |

# 11. Monitoring & Tracing

This phase I will integrating monitoring through the entire system to ensure visibility and performance management. The goal is to provide real-time insights, track system health, and identify potential issues early by monitoring various metrics, logs, and events across all services. This will help in maintaining system reliability and performance.

- Implement monitoring across all services (I haven´t chosen the application yet)
- Implement Distributed Tracing with Jaeger

# 12. The Open API Documentation

In this phase, the OpenAPI documentation will be created for every API within the project. This documentation will serve as a detailed reference with all available endpoints, request and response formats, and authentication methods by using the OpenAPI specifications.

- Provide The OpenAPI Documentation with [Swagger](https://swagger.io/) for synchronous APIs
- Provide [AsyncAPI](https://www.asyncapi.com/en) documentation for asynchronous APIs

# 13. Future features

| Feature / Application | Description                                 |
| --------------------- | ------------------------------------------- |
| Service Register      | Implements Service Register into Kubernetes |
| Jenkins               | Implements CI/CD with Jenkins               |
| Github Actions        | Add Github Actions                          |
