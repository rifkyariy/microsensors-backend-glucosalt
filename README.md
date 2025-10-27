# GlucosAlt Backend

This is the backend for GlucosAlt, a real-time health monitoring application. It's built with NestJS and handles data from ESP32-based sensors, user authentication, and data storage.

## Features

-   **Real-time Health Monitoring**: Ingests and streams heart rate and blood oxygen levels via Server-Sent Events (SSE).
-   **Time-Series Data**: Stores historical health data using InfluxDB.
-   **User & Diet Management**: Manages user profiles, BMI, and diet logs using Supabase (PostgreSQL).
-   **Authentication**: Secure JWT-based authentication.
-   **IoT Integration**: Receives data from ESP32 sensors with a MAX30102 sensor.

## Tech Stack

-   **Framework**: NestJS
-   **Language**: TypeScript
-   **Databases**:
    -   **PostgreSQL (Supabase)**: For relational data (users, diet, BMI).
    -   **InfluxDB**: For time-series health data (heart rate, SpO2, PPG).
-   **Authentication**: JWT

## Prerequisites

-   Node.js (v18 or newer)
-   npm or yarn
-   Docker (for databases) or access to Supabase and InfluxDB instances.

## Quick Start

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd GlucosAlt/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file and add your configuration. You can use `.env.example` as a template.

    ```env
    # Server
    PORT=3067

    # Supabase
    SUPABASE_URL=YOUR_SUPABASE_URL
    SUPABASE_SERVICE_KEY=YOUR_SUPABASE_SERVICE_KEY
    JWT_SECRET=YOUR_JWT_SECRET

    # InfluxDB
    INFLUXDB_URL=http://localhost:8086
    INFLUXDB_TOKEN=YOUR_INFLUXDB_TOKEN
    INFLUXDB_ORG=your-org
    INFLUXDB_BUCKET=health_metrics

    # Frontend URL for CORS
    FRONTEND_URL=http://localhost:3066
    ```

4.  **Run database migrations:**

    Apply the initial schema located in `migrations/001_initial_schema.sql` to your PostgreSQL database.

5.  **Run the application:**
    ```bash
    npm run start:dev
    ```
    The server will be running at `http://localhost:3067`.

## API Endpoints

Here are some of the key endpoints:

-   `POST /auth/register`: Create a new user.
-   `POST /auth/login`: Log in and get a JWT token.
-   `POST /health/metrics`: Endpoint for the ESP32 to send sensor data.
-   `GET /health/stream/:userId`: Real-time SSE stream of health data.
-   `GET /health/latest/:userId`: Get the most recent health metrics.
-   `POST /diet`: Log a new diet entry.
-   `GET /diet/user/:userId`: Get diet history for a user.

## Project Structure

```
.
├── src
│   ├── auth          # Authentication logic
│   ├── bmi           # BMI calculation
│   ├── diet          # Diet and nutrition tracking
│   ├── health        # Health metrics (HR, SpO2)
│   ├── influxdb      # InfluxDB service
│   ├── supabase      # Supabase service
│   ├── users         # User management
│   └── main.ts       # App entry point
├── migrations
│   └── 001_initial_schema.sql
├── ESP32_IMPROVED.ino  # Firmware for the sensor
└── package.json
```

## ESP32 Integration

The `ESP32_IMPROVED.ino` file contains the Arduino code for the sensor device. It's configured to read data from a MAX30102 sensor and send it to the `/health/metrics` endpoint.

For more details on sensor troubleshooting, see `SENSOR_TROUBLESHOOTING.md`.
