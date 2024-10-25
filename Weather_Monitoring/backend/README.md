# Real-Time Weather Processing System

## Overview

This project is a Real-Time Data Processing System designed to monitor weather conditions using data from the [OpenWeatherMap API](https://openweathermap.org/). The system continuously retrieves weather data, processes it, and provides summarized insights with rollups and aggregates.

## Objectives

- Monitor weather conditions for major metros in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
- Provide daily weather summaries with average, maximum, and minimum temperatures, as well as the dominant weather condition.
- Set up alerting thresholds for specific weather conditions.

## Features

- Continuous data retrieval from OpenWeatherMap API at configurable intervals (default: every 5 minutes).
- Daily weather summaries stored in a database for further analysis.
- User-configurable alert thresholds for temperature and weather conditions.
- Visualization of daily summaries and triggered alerts.

## Data Source

The system retrieves the following parameters from the OpenWeatherMap API:

- **Main:** Main weather condition (e.g., Rain, Snow, Clear)
- **Temp:** Current temperature in Celsius
- **Feels Like:** Perceived temperature in Celsius
- **Dt:** Time of the data update (Unix timestamp)

## Installation Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

### Prerequisites

- Node.js
- A free API key from OpenWeatherMap

## Dependencies

This project requires the following dependencies:

### Main Dependencies

- **axios**: ^1.7.7 - Promise-based HTTP client for the browser and Node.js.
- **cors**: ^2.8.5 - Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: ^16.4.5 - Module to load environment variables from a `.env` file into `process.env`.
- **express**: ^4.21.1 - Fast, unopinionated, minimalist web framework for Node.js.
- **node-cron**: ^3.0.3 - A simple cron-like job scheduler for Node.js.
- **pg**: ^8.13.0 - PostgreSQL client for Node.js.
- **pg-hstore**: ^2.3.4 - A module to serialize and deserialize JSON data in PostgreSQL.
- **sequelize**: ^6.37.4 - Promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server.

### Development Dependencies

- **nodemon**: ^3.1.7 - A utility that monitors for changes in your source and automatically restarts your server.
- **prettier**: ^3.3.3 - An opinionated code formatter.

### Setup

## **Clone the Repository**

    ```bash
    git clone <your-github-repo-url>
    cd <your-repo-folder>

    ```

## Install Dependencies

     npm install

## Create the PostgreSQL Database

    Open your PostgreSQL command line or use a tool like pgAdmin and run the following command to create the database:

     CREATE DATABASE weather_db;

## Configure Environment Variables

    Create a .env file in the root directory and add your database configuration and OpenWeatherMap API key:

        DB_NAME=weather_db
        DB_USER=postgres
        DB_PASSWORD=postgres
        DB_HOST=localhost

## Start the Application

    npm start

## Usage

    The system retrieves weather data every 5 minutes (configurable).
