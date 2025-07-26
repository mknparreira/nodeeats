# Node Eats

The Node Eats is a project for education purposes developed by myself and aims to demonstrate practical applications of Node.JS using Express in order to building a robust and scalable food delivery solution while offering hands-on experience with modern software practices and technologies.

This project aims to provide a practical learning experience by covering essential components of a food delivery system, including:

- **Infrastructure Setup**: Implementing an API Gateway with Kong, using RabbitMQ for messaging, Redis for caching, Kubernetes for container orchestration, and MongoDB for data storage.
- **Core Resources**: Developing several resources such as <HERE>.
- **API Enhancements**: Focusing on security, resilience, and scalability improvements.
- **Monitoring and Documentation**: Implementing tracing, monitoring and documenting the API with OpenAPI specification (Swagger).
- **Future features**: Planning for additional features and improvements.

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

I chose Express with TypeScript because it is very usual, especially in Serverless environments such as AWS Serveless, for companies to use Node.JS with just Express and TypeScript. This approach allows for more flexibility and a simpler structure, which is often preferred in serverless architectures where lightweight and efficient code is key.

## Packages Installed

| Package                           | Description                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Express                           | Fast, minimal web framework for building APIs and web applications in Node.js.                                 |
| Typescript                        | Typed superset of JavaScript that compiles to plain JavaScript, improving code safety and maintainability.     |
| Jest                              | JavaScript testing framework for unit and integration tests with built-in mocking capabilities.                |
| Tsnode                            | Executes TypeScript code directly in Node.js, allowing TypeScript files to run without precompiling.           |
| Nodemon                           | Automatically restarts the Node.js application when file changes are detected, improving development workflow. |
| Prettier                          | Opinionated code formatter that ensures consistent style across a codebase.                                    |
| Eslint                            | Linter for JavaScript and TypeScript, enforcing coding standards and detecting issues in code.                 |
| Eslint-config-prettier            | Disables ESLint rules that conflict with Prettier, allowing both tools to work together seamlessly.            |
| Eslint-plugin-prettier            | Integrates Prettier into ESLint, so code formatting issues are reported as ESLint errors.                      |
| Eslint-plugin-import              | Enforces best practices for managing imports, including sorting and resolving module paths.                    |
| Ts Jest                           | A Jest transformer that enables running TypeScript tests within Jest.                                          |
| Typescript-eslint                 | ESLint plugin and parser for TypeScript, allowing TypeScript-specific linting rules.                           |
| Supertest                         | HTTP assertion library for testing APIs, used to simulate requests and validate responses.                     |
| Dotenv                            | Loads environment variables from a .env file.                                                                  |
| Tsconfig-paths                    | Enables TypeScript path aliases resolution at runtime.                                                         |
| Eslint-import-resolver-typescript | Helps ESLint resolve TypeScript paths correctly.                                                               |
| Mongoose                          | ODM (Object Data Modeling) library for MongoDB, providing schema validation and query building.                |
| Reflect-metadata                  | Required for decorators in TypeScript, especially for dependency injection with tsyringe.                      |
| Tsyringe                          | Lightweight dependency injection container for TypeScript.                                                     |
| Http-status-codes                 | Provides named constants for HTTP status codes, improving code readability                                     |

# 5. Resources

All resources, including repository, service, module, model, handlers and so on.

| Resource     | Description                                                                                          | Status  |
| ------------ | ---------------------------------------------------------------------------------------------------- | ------- |
| User         | Manages user registration, editing, and viewing information such as name, email, and authentication. | done    |
| Restaurant   | Manages restaurant details, menu offerings, opening hours, and availability status.                  | ongoing |
| Menu         | Handles menu items for restaurants, including categories and product descriptions                    |         |
| Category     | Organizes and classifies restaurants and menu items into categories.                                 |         |
| Order        | Handles the creation, updating, and tracking of food delivery orders, including order status.        |         |
| Payment      | Processes payments and manages payment methods.                                                      |         |
| Delivery     | Coordinates delivery logistics, including assigning couriers and real-time tracking.                 |         |
| Review       | Enables users to leave feedback and ratings for restaurants and delivery experiences.                |         |
| Notification | Sends order updates, promotions, and other alerts to users.                                          |         |

# 6. Enhance API Security

| Package | Description                                                                      |
| ------- | -------------------------------------------------------------------------------- |
| Helmet  | API protection against vulnerabilities in order to inject security HTTP Headers. |
| CORS    | Enables CORS support to allow requests for another origins                       |

# 7. Setup Kubernetes

TBD

# 8. Enhance API Resilience

In this phase, I will implement some strategies to improve the resilience of APIs, ensuring they can handle with failures and recover effectively. I will adopting the following strategies and tools:

- Implement Circuit Breaker using Circuit Breaker package in Kong API Gateway.
- Implement Circuit Breaker.
- Implement retries e backoff.
- Configure timeout into the entire services in Kong API Gateway
- Implement Fallback Pattern.
- Implement Bulkheads.
- Implement Active Health Checks in Kong API Gateway
- Implement Failover strategies with Kubernetes (replicaSet)

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
