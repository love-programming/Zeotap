# Rule Engine with Abstract Syntax Tree (AST)

## Project Overview

The Rule Engine with AST is a simple 3-tier application designed to determine user eligibility based on various attributes such as age, department, income, and spend. The application employs an Abstract Syntax Tree (AST) to represent conditional rules, enabling dynamic creation, combination, and modification of these rules.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Data Structure](#data-structure)
- [Sample Rules](#sample-rules)
- [Test Cases](#test-cases)
- [Bonus Features](#bonus-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- Dynamic creation of rules using a user-friendly interface.
- Evaluation of user eligibility based on defined rules.
- Ability to combine multiple rules efficiently.
- Error handling for invalid rule formats.
- Validation of attributes and modification of existing rules.

## Technologies Used

- **Node.js**: Backend server
- **Express.js**: API framework
- **PostgreSQL**: Database for storing rules and metadata
- **JavaScript**: Programming language for development

## Installation Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

## Dependencies

This project requires the following dependencies:

axios: ^1.7.7 - Promise-based HTTP client for the browser and Node.js.
cors: ^2.8.5 - Middleware for enabling Cross-Origin Resource Sharing.
express: ^4.21.1 - Fast, unopinionated, minimalist web framework for Node.js.
node-cron: ^3.0.3 - A task scheduler for Node.js to run cron jobs.
pg: ^8.13.0 - Non-blocking PostgreSQL client for Node.js.
pg-hstore: ^2.3.4 - A module for serializing and deserializing JSON data to hstore format for PostgreSQL.
sequelize: ^6.37.4 - A promise-based Node.js ORM for relational databases.

## Development Dependencies

nodemon: ^3.1.7 - A utility that will monitor for any changes in your source and automatically restart your server.
prettier: ^3.3.3 - An opinionated code formatter for consistent code style.

## You can install all the dependencies by running:

npm install

### Steps to Set Up

1.  **Clone the Repository**

    ```bash
    git clone <your-github-repo-url>
    cd <your-repo-folder>

    ```

2.  Install Dependencies

    # npm install

3.  Create the PostgreSQL Database

    Open your PostgreSQL command line or use a tool like pgAdmin and run the following command to create the database:

    # CREATE DATABASE weather_db;

4.  Configure Environment Variables

    Create a .env file in the root directory and add your database configuration and OpenWeatherMap API key:

        DB_NAME=weather_db
        DB_USER=postgres
        DB_PASSWORD=postgres
        DB_HOST=localhost

5.  Start the Application
    # npm start
