# GlucosAlt Backend API# GlucosAlt Backend API# GlucosAlt Backend API# GlucosAlt Backend API# GlucosAlt Backend API<p align="center">



Real-time health monitoring system backend built with NestJS. Tracks heart rate, SpO2, BMI, and diet data from ESP32 sensors.



## Quick StartA NestJS-based backend API for the GlucosAlt health monitoring system, providing real-time health metrics tracking, BMI calculations, diet logging, and PPG (Photoplethysmography) data analytics.



```bash

# Install dependencies

npm install## FeaturesA NestJS-based backend API for the GlucosAlt health monitoring system, providing real-time health metrics tracking, BMI calculations, diet logging, and PPG (Photoplethysmography) data analytics.



# Configure environment

cp .env.example .env

# Edit .env with your credentials- **Health Metrics Monitoring**: Real-time heart rate and SpO2 tracking with Server-Sent Events (SSE)



# Run development server- **PPG Data Storage**: Raw PPG waveform data (IR and Red) for advanced analytics

npm run start:dev

```- **BMI Tracking**: Body Mass Index calculation and historical tracking with sync functionality## FeaturesA NestJS-based backend API for the GlucosAlt health monitoring system, providing real-time health metrics tracking, BMI calculations, diet logging, and PPG (Photoplethysmography) data analytics.  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>



Server runs at: `http://localhost:3067`- **Diet Management**: Food database and meal logging with nutritional information



## Prerequisites- **User Authentication**: JWT-based authentication with Supabase



- Node.js 18+- **Time-Series Database**: InfluxDB integration for efficient health metrics storage

- PostgreSQL (Supabase)

- InfluxDB 2.x- **IoT Integration**: ESP32 sensor data ingestion and processing- **Health Metrics Monitoring**: Real-time heart rate and SpO2 tracking with Server-Sent Events (SSE)

- ESP32 with MAX30102 sensor



## Environment Setup

## Prerequisites- **PPG Data Storage**: Raw PPG waveform data (IR and Red) for advanced analytics

Create `.env` file:



```env

# Server- Node.js 18+ and npm- **BMI Tracking**: Body Mass Index calculation and historical tracking with sync functionality## 🚀 FeaturesNestJS backend API for GlucosAlt health monitoring system with ESP32 integration.</p>

PORT=3067

- PostgreSQL (via Supabase)

# Supabase (PostgreSQL)

SUPABASE_URL=https://your-project.supabase.co- InfluxDB 2.x- **Diet Management**: Food database and meal logging with nutritional information

SUPABASE_SERVICE_KEY=your-service-key

SUPABASE_ANON_KEY=your-anon-key- ESP32 with MAX30102 sensor (for data collection)

JWT_SECRET=your-jwt-secret

- **User Authentication**: JWT-based authentication with Supabase

# InfluxDB (Time-series)

INFLUXDB_URL=http://localhost:8086## Installation

INFLUXDB_TOKEN=your-influxdb-token

INFLUXDB_ORG=east- **Time-Series Database**: InfluxDB integration for efficient health metrics storage

INFLUXDB_BUCKET=health_metrics

1. **Clone the repository**:

# CORS

FRONTEND_URL=http://localhost:3066```bash- **IoT Integration**: ESP32 sensor data ingestion and processing- **Health Metrics Monitoring**: Real-time heart rate and SpO2 tracking with Server-Sent Events (SSE)

```

git clone <repository-url>

## Database Setup

cd GlucosAlt/backend

1. **Run PostgreSQL migration**:

```bash```

psql -h your-db-host -U postgres -d postgres -f migrations/001_initial_schema.sql

```## Prerequisites- **PPG Data Storage**: Raw PPG waveform data (IR and Red) for advanced analytics



2. **Seed sample data** (optional):2. **Install dependencies**:

```bash

npm run seed```bash

```

npm install

## API Endpoints

```- Node.js 18+ and npm- **BMI Tracking**: Body Mass Index calculation and historical tracking with sync functionality## 🏗️ Architecture[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

### Authentication



**Register**

```http3. **Configure environment variables**:- PostgreSQL (via Supabase)

POST /auth/register

{

  "email": "user@example.com",

  "password": "password",Create a `.env` file in the backend directory:- InfluxDB 2.x- **Diet Management**: Food database and meal logging with nutritional information

  "name": "John Doe",

  "age": 25,

  "gender": "male",

  "height": 1.75```env- ESP32 with MAX30102 sensor (for data collection)

}

```# Server Configuration



**Login**PORT=3067- **User Authentication**: JWT-based authentication with Supabase[circleci-url]: https://circleci.com/gh/nestjs/nest

```http

POST /auth/login

{

  "email": "user@example.com",# Supabase Configuration## Installation

  "password": "password"

}SUPABASE_URL=https://your-project.supabase.co

```

SUPABASE_SERVICE_KEY=your-service-key- **Time-Series Database**: InfluxDB integration for efficient health metrics storage

### Health Metrics

SUPABASE_ANON_KEY=your-anon-key

**Post Data** (from ESP32)

```httpJWT_SECRET=your-jwt-secret1. **Clone the repository**:

POST /health/metrics

{

  "device_id": "ESP32_001",

  "user_id": "user-uuid",# InfluxDB Configuration```bash- **IoT Integration**: ESP32 sensor data ingestion and processing- **NestJS**: TypeScript backend framework

  "heart_rate": 75,

  "blood_oxygen": 98,INFLUXDB_URL=http://localhost:8086

  "ppg_ir": [65000, 65100, ...],  // Optional: 100 samples

  "ppg_red": [32000, 32100, ...]  // Optional: 100 samplesINFLUXDB_TOKEN=your-influxdb-tokengit clone <repository-url>

}

```INFLUXDB_ORG=east



**Get Latest**INFLUXDB_BUCKET=health_metricscd GlucosAlt/backend

```http

GET /health/latest/:userId

```

# CORS Configuration```

**Stream Real-time** (SSE)

```httpFRONTEND_URL=http://localhost:3066

GET /health/stream/:userId

``````## 📋 Prerequisites- **InfluxDB**: Time-series database for health metrics (heart rate, SpO2)  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>



**Get Statistics**

```http

GET /health/stats/:userId?days=74. **Set up the database**:2. **Install dependencies**:

```



**Get PPG Data** (for analytics)

```httpRun the SQL migrations in `migrations/001_initial_schema.sql`:```bash

GET /health/ppg/:userId?start=-24h&limit=100

```



### BMI Management```bashnpm install



**Create Record**# Connect to your Supabase project and run the migration

```http

POST /bmipsql -h your-db-host -U postgres -d postgres -f migrations/001_initial_schema.sql```- Node.js 18+ and npm- **Supabase**: PostgreSQL for relational data (users, BMI, diet)    <p align="center">

{

  "user_id": "user-uuid",```

  "weight": 75.5

}

```

*BMI calculated automatically from user's height*5. **Seed the database** (optional):



**Get Latest**```bash3. **Configure environment variables**:- PostgreSQL (via Supabase)

```http

GET /bmi/latest/:userIdnpm run seed

```

```

**Get History**

```http

GET /bmi/user/:userId

```## Running the ApplicationCreate a `.env` file in the backend directory:- InfluxDB 2.x- **TypeScript**: Full type safety<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>



**Sync All Records** (recalculates all BMI)

```http

PUT /bmi/:userId/sync### Development Mode

```

```bash

### Diet Tracking

npm run start:dev```env- ESP32 with MAX30102 sensor (for data collection)

**Log Meal**

```http```

POST /diet

{# Server Configuration

  "user_id": "user-uuid",

  "meal_type": "breakfast",### Production Mode

  "food_name": "Oatmeal",

  "calories": 158,```bashPORT=3067<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

  "carbs": 27,

  "protein": 6,npm run build

  "fat": 3.2

}npm run start:prod

```

```

**Get Records**

```http# Supabase Configuration## 🛠️ Installation

GET /diet/user/:userId?startDate=2025-10-01&endDate=2025-10-27

```### Watch Mode



**Get Statistics**```bashSUPABASE_URL=https://your-project.supabase.co

```http

GET /diet/stats/:userId?days=7npm run start:debug

```

```SUPABASE_SERVICE_KEY=your-service-key## 📦 Installation<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

## Database Schema



### PostgreSQL Tables

The API will be available at `http://localhost:3067`SUPABASE_ANON_KEY=your-anon-key

**users** - User accounts and profiles

- id, email, name, age, gender, height



**bmi_records** - BMI history## API EndpointsJWT_SECRET=your-jwt-secret1. **Clone the repository**:

- id, user_id, weight, bmi, recorded_at



**diet_records** - Meal logs

- id, user_id, meal_type, food_name, calories, carbs, protein, fat, recorded_at### Authentication



**food_database** - Food nutrition data

- id, name, calories, carbs, protein, fat, serving_size

#### Register User# InfluxDB Configuration```bash<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

### InfluxDB Measurements

```http

**health_metrics** - Heart rate & SpO2

- Tags: user_id, device_idPOST /auth/registerINFLUXDB_URL=http://localhost:8086

- Fields: heart_rate, blood_oxygen

Content-Type: application/json

**ppg_raw** - Raw sensor data for analytics

- Tags: user_id, device_idINFLUXDB_TOKEN=your-influxdb-tokengit clone <repository-url>

- Fields: ppg_ir, ppg_red, sample_count

{

## ESP32 Integration

  "email": "user@example.com",INFLUXDB_ORG=east

### Hardware Connections

```  "password": "secure-password",

MAX30102 Sensor:

  VCC  → ESP32 3.3V  "name": "John Doe",INFLUXDB_BUCKET=health_metricscd GlucosAlt/backend```bash<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>

  GND  → ESP32 GND

  SDA  → ESP32 GPIO 21  "age": 25,

  SCL  → ESP32 GPIO 22

```  "gender": "male",



### Configuration  "height": 1.75

Use the improved firmware: `ESP32_IMPROVED.ino`

}# CORS Configuration```

```cpp

const char* apiUrl = "https://api-glucosalt.heretichydra.xyz/health/metrics";```

const char* userId = "64a6f31f-68c4-4122-b406-55dc2d75703e";

const char* deviceId = "ESP32_001";FRONTEND_URL=http://localhost:3066

```

#### Login

### Features

- Auto finger detection (IR > 50000)```http```npm install<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>

- 3-second stabilization delay

- 100Hz sampling (100 samples/second)POST /auth/login

- Sends every 250ms

- Default values on sensor failureContent-Type: application/json



## Project Structure



```{4. **Set up the database**:2. **Install dependencies**:

backend/

├── src/  "email": "user@example.com",

│   ├── auth/         # JWT authentication

│   ├── bmi/          # BMI calculations  "password": "secure-password"

│   ├── diet/         # Meal tracking

│   ├── health/       # Health metrics & PPG}

│   ├── influxdb/     # Time-series service

│   ├── supabase/     # PostgreSQL service```Run the SQL migrations in `migrations/001_initial_schema.sql`:```bash```<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>

│   ├── users/        # User management

│   └── seeds/        # Sample data

├── migrations/       # SQL schema

└── test/            # Tests### Health Metrics

```



## Validation Rules

#### Post Health Metric (from ESP32)```bashnpm install

**Heart Rate**: 0-300 BPM (relaxed for development)

**Blood Oxygen**: 0-100% (relaxed for development)```http



*Normal ranges: HR 60-100 BPM, SpO2 95-100%*POST /health/metrics# Connect to your Supabase project and run the migration



## BMI CalculationContent-Type: application/json



```psql -h your-db-host -U postgres -d postgres -f migrations/001_initial_schema.sql```  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>

BMI = weight(kg) / height²(m)

```{



**Important**: Height must be in meters (e.g., 1.75, not 175)  "device_id": "ESP32_001",```



**Categories**:  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

- Underweight: < 18.5

- Normal: 18.5-24.9  "heart_rate": 75,

- Overweight: 25-29.9

- Obese: ≥ 30  "blood_oxygen": 98,



## Testing  "ppg_ir": [65000, 65100, 65200, ...],5. **Seed the database** (optional):



```bash  "ppg_red": [32000, 32100, 32200, ...]

# Unit tests

npm run test}```bash3. **Configure environment variables**:## ⚙️ Configuration    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>



# E2E tests```

npm run test:e2e

npm run seed

# Coverage

npm run test:cov**Note**: `ppg_ir` and `ppg_red` are optional 100-sample arrays for analytics.

```

```

**Manual test**:

```bash#### Get Latest Health Metric

# Test POST endpoint

curl -X POST http://localhost:3067/health/metrics \```http

  -H "Content-Type: application/json" \

  -d '{"device_id":"ESP32_001","user_id":"YOUR_ID","heart_rate":75,"blood_oxygen":98}'GET /health/latest/:userId



# Test SSE stream```## Running the ApplicationCreate a `.env` file in the backend directory:  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>

curl -N http://localhost:3067/health/stream/YOUR_ID

```



## Troubleshooting#### Stream Real-time Health Metrics (SSE)



**BMI shows 0.0?**```http

- Check height is in meters (1.75, not 175)

- Run: `PUT /bmi/:userId/sync`GET /health/stream/:userId### Development Mode



**InfluxDB connection fails?**```

- Check: `influx ping`

- Verify token and org in `.env````bash

- Ensure bucket exists: `influx bucket list`

#### Get Health Statistics

**No data in stream?**

- Check InfluxDB has data for user```httpnpm run start:dev```env1. Copy `.env.example` to `.env`:</p>

- Data might be older than default -1h range

GET /health/stats/:userId?days=7

**ESP32 sensor issues?**

- See: `SENSOR_TROUBLESHOOTING.md```````

- Check finger placement

- Adjust LED brightness



## Deployment#### Get PPG Raw Data# Server Configuration



### Production Checklist```http

- [ ] Set production environment variables

- [ ] Run database migrationsGET /health/ppg/:userId?start=-24h&limit=100### Production Mode

- [ ] Configure InfluxDB retention policies

- [ ] Enable HTTPS/SSL```

- [ ] Add rate limiting

- [ ] Set up monitoring/logging```bashPORT=3067```bash  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)



### Docker (Optional)**Query Parameters**:

```dockerfile

FROM node:18-alpine- `start`: Time range (e.g., `-24h`, `-7d`), default: `-24h`npm run build

WORKDIR /app

COPY package*.json ./- `limit`: Maximum records to return, default: `100`

RUN npm ci --only=production

COPY . .npm run start:prod

RUN npm run build

EXPOSE 3067**Response**:

CMD ["npm", "run", "start:prod"]

``````json```



## Security[



- JWT authentication with bcrypt password hashing  {# Supabase Configurationcp .env.example .env  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

- Supabase service role for admin operations

- CORS configured for frontend only    "timestamp": "2025-10-27T10:30:00Z",

- Environment variables for secrets

    "device_id": "ESP32_001",### Watch Mode

## Tech Stack

    "sample_count": 100,

- **NestJS 11** - Backend framework

- **PostgreSQL** - User data (via Supabase)    "ppg_ir": [65000, 65100, ...],```bashSUPABASE_URL=https://your-project.supabase.co

- **InfluxDB 2.x** - Time-series metrics

- **TypeScript** - Type safety    "ppg_red": [32000, 32100, ...]

- **JWT** - Authentication

  }npm run start:debug

## License

]

MIT

``````SUPABASE_SERVICE_KEY=your-service-key```

## Support



- Issues: GitHub Issues

- Sensor help: See `SENSOR_TROUBLESHOOTING.md`### BMI Management

- Contact: [Your Contact]



## Credits

#### Create BMI RecordThe API will be available at `http://localhost:3067`SUPABASE_ANON_KEY=your-anon-key

- NestJS Framework

- Supabase```http

- InfluxDB

- Sparkfun MAX30102 LibraryPOST /bmi

- Maxim Integrated SpO2 Algorithm

Content-Type: application/json

## API EndpointsJWT_SECRET=your-jwt-secret## Description

{

  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

  "weight": 75.5

}### Authentication

```



**Note**: BMI is calculated automatically using the user's height from their profile.

#### Register User# InfluxDB Configuration2. Update environment variables in `.env`

#### Get Latest BMI

```http```http

GET /bmi/latest/:userId

```POST /auth/registerINFLUXDB_URL=http://localhost:8086



#### Get User BMI HistoryContent-Type: application/json

```http

GET /bmi/user/:userIdINFLUXDB_TOKEN=your-influxdb-token[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

```

{

#### Sync BMI Records

```http  "email": "user@example.com",INFLUXDB_ORG=east

PUT /bmi/:userId/sync

```  "password": "secure-password",



Recalculates all BMI records based on current user height. Useful after updating height in profile.  "name": "John Doe",INFLUXDB_BUCKET=health_metrics## 🗄️ Database Setup



**Response**:  "age": 25,

```json

{  "gender": "male",

  "message": "Successfully synced 62 BMI records",

  "updated": [  "height": 1.75

    {

      "recorded_at": "2025-10-01T00:00:00Z",}# CORS Configuration## Project setup

      "weight": 75.2,

      "oldBmi": 0,```

      "newBmi": 24.29

    }FRONTEND_URL=http://localhost:3066

  ]

}#### Login

```

```http```### Supabase (PostgreSQL)

### Diet Management

POST /auth/login

#### Create Diet Record

```httpContent-Type: application/json

POST /diet

Content-Type: application/json



{{4. **Set up the database**:1. Create a Supabase project at https://supabase.com```bash

  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

  "meal_type": "breakfast",  "email": "user@example.com",

  "food_name": "Oatmeal",

  "calories": 158,  "password": "secure-password"

  "carbs": 27,

  "protein": 6,}

  "fat": 3.2

}```Run the SQL migrations in `migrations/001_initial_schema.sql`:2. Run migration: `migrations/001_initial_schema.sql`$ npm install

```



#### Get User Diet Records

```http### Health Metrics

GET /diet/user/:userId?startDate=2025-10-01&endDate=2025-10-27

```



#### Get Diet Statistics#### Post Health Metric (from ESP32)```bash```

```http

GET /diet/stats/:userId?days=7```http

```

POST /health/metrics# Connect to your Supabase project and run the migration

### User Management

Content-Type: application/json

#### Get User Profile

```httppsql -h your-db-host -U postgres -d postgres -f migrations/001_initial_schema.sql### InfluxDB

GET /users/:id

```{



#### Update User Profile  "device_id": "ESP32_001",```

```http

PATCH /users/:id  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

Content-Type: application/json

  "heart_rate": 75,1. Install InfluxDB v2.x## Compile and run the project

{

  "name": "John Doe",  "blood_oxygen": 98,

  "height": 1.75,

  "age": 26,  "ppg_ir": [65000, 65100, 65200, ...],5. **Seed the database** (optional):

  "gender": "male"

}  "ppg_red": [32000, 32100, 32200, ...]

```

}```bash2. Create bucket: `health_metrics`

## Database Schema

```

### PostgreSQL (Supabase)

npm run seed

**users**

- `id` (UUID, Primary Key)**Note**: `ppg_ir` and `ppg_red` are optional 100-sample arrays for analytics.

- `email` (String, Unique)

- `name` (String)```3. Generate API token```bash

- `age` (Integer)

- `gender` (String)#### Get Latest Health Metric

- `height` (Decimal) - Height in meters

- `created_at` (Timestamp)```http



**bmi_records**GET /health/latest/:userId

- `id` (UUID, Primary Key)

- `user_id` (UUID, Foreign Key → users)```## 🚦 Running the Application# development

- `weight` (Decimal) - Weight in kilograms

- `bmi` (Decimal)

- `recorded_at` (Timestamp)

#### Stream Real-time Health Metrics (SSE)

**diet_records**

- `id` (UUID, Primary Key)```http

- `user_id` (UUID, Foreign Key → users)

- `meal_type` (String) - breakfast, lunch, dinner, snackGET /health/stream/:userId### Development Mode## 🌱 Seed Database$ npm run start

- `food_name` (String)

- `calories` (Decimal)```

- `carbs` (Decimal)

- `protein` (Decimal)```bash

- `fat` (Decimal)

- `recorded_at` (Timestamp)#### Get Health Statistics



**food_database**```httpnpm run start:dev

- `id` (Serial, Primary Key)

- `name` (String, Unique)GET /health/stats/:userId?days=7

- `calories` (Decimal)

- `carbs` (Decimal)``````

- `protein` (Decimal)

- `fat` (Decimal)

- `serving_size` (String)

#### Get PPG Raw Data```bash# watch mode

### InfluxDB

```http

**health_metrics** measurement

- Tags: `user_id`, `device_id`GET /health/ppg/:userId?start=-24h&limit=100### Production Mode

- Fields: `heart_rate`, `blood_oxygen`

- Timestamp: Automatic```



**ppg_raw** measurement```bashnpm run seed$ npm run start:dev

- Tags: `user_id`, `device_id`

- Fields: `ppg_ir` (JSON string), `ppg_red` (JSON string), `sample_count`**Query Parameters**:

- Timestamp: Automatic

- `start`: Time range (e.g., `-24h`, `-7d`), default: `-24h`npm run build

## Configuration

- `limit`: Maximum records to return, default: `100`

### Validation Rules

npm run start:prod```

Health metrics validation (relaxed for development):

- **Heart Rate**: 0-300 BPM (normal resting: 60-100 BPM)**Response**:

- **Blood Oxygen**: 0-100% (normal: 95-100%)

```json```

These ranges allow collecting data even with imperfect sensor readings for analytics purposes.

[

### BMI Calculation

  {# production mode

BMI is calculated using the formula:

```    "timestamp": "2025-10-27T10:30:00Z",

BMI = weight(kg) / height²(m)

```    "device_id": "ESP32_001",### Watch Mode



**Important**: Height must be stored in meters, not centimeters.    "sample_count": 100,



Categories:    "ppg_ir": [65000, 65100, ...],```bashCreates 4 test users with 30 days of data.$ npm run start:prod

- Underweight: BMI < 18.5

- Normal weight: BMI 18.5-24.9    "ppg_red": [32000, 32100, ...]

- Overweight: BMI 25-29.9

- Obese: BMI ≥ 30  }npm run start:debug



## Testing]



### Run Unit Tests`````````

```bash

npm run test

```

### BMI Management

### Run E2E Tests

```bash

npm run test:e2e

```#### Create BMI RecordThe API will be available at `http://localhost:3067`## 🚀 Running



### Test Coverage```http

```bash

npm run test:covPOST /bmi

```

Content-Type: application/json

### Manual API Testing

## 📡 API Endpoints## Run tests

Test health metrics endpoint:

```bash{

curl -X POST http://localhost:3067/health/metrics \

  -H "Content-Type: application/json" \  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

  -d '{

    "device_id": "ESP32_001",  "weight": 75.5

    "user_id": "YOUR_USER_ID",

    "heart_rate": 75,}### Authentication```bash

    "blood_oxygen": 98

  }'```

```



Test SSE stream:

```bash**Note**: BMI is calculated automatically using the user's height from their profile.

curl -N http://localhost:3067/health/stream/YOUR_USER_ID

```#### Register Usernpm run start:dev```bash



## Data Seeding#### Get Latest BMI



The seed script populates the database with sample data for development:```http```http



```bashGET /bmi/latest/:userId

npm run seed

``````POST /auth/register```# unit tests



This creates:

- 30 food items in the food database

- 31 days of BMI records (with realistic weight variations)#### Get User BMI HistoryContent-Type: application/json

- 93 diet records (3 meals per day for 31 days)

- 8 days of health metrics (every 30 minutes)```http



**Target User**:GET /bmi/user/:userId$ npm run test

- ID: `64a6f31f-68c4-4122-b406-55dc2d75703e`

- Email: `rifkyari@gmail.com````

- Height: 1.75m

- Age: 23{

- Gender: male

#### Sync BMI Records

## ESP32 Integration

```http  "email": "user@example.com",API: http://localhost:3000

### Hardware Setup

PUT /bmi/:userId/sync

1. **MAX30102 Sensor Connections**:

   - VCC → ESP32 3.3V```  "password": "secure-password",

   - GND → ESP32 GND

   - SDA → ESP32 GPIO 21

   - SCL → ESP32 GPIO 22

Recalculates all BMI records based on current user height. Useful after updating height in profile.  "name": "John Doe",# e2e tests

2. **Upload Firmware**:

   - Use the improved code in `ESP32_IMPROVED.ino`

   - Configure WiFi credentials and API endpoint

   - Upload to ESP32 via Arduino IDE**Response**:  "age": 25,



3. **Features**:```json

   - Automatic finger detection (IR threshold: 50000)

   - 3-second stabilization period{  "gender": "male",## 📡 API Endpoints$ npm run test:e2e

   - PPG data collection (100 samples @ 100Hz)

   - Sends data every 250ms  "message": "Successfully synced 62 BMI records",

   - Default values when readings are invalid

  "updated": [  "height": 1.75

### API Configuration in ESP32

    {

```cpp

const char* apiUrl = "https://api-glucosalt.heretichydra.xyz/health/metrics";      "recorded_at": "2025-10-01T00:00:00Z",}

const char* userId = "64a6f31f-68c4-4122-b406-55dc2d75703e";

const char* deviceId = "ESP32_001";      "weight": 75.2,

```

      "oldBmi": 0,```

## Troubleshooting

      "newBmi": 24.29

### Common Issues

    }See full documentation in code comments.# test coverage

1. **BMI shows 0.0**:

   - Check user height is in meters (1.75) not centimeters (175)  ]

   - Run sync endpoint: `PUT /bmi/:userId/sync`

}#### Login

2. **InfluxDB connection fails**:

   - Verify InfluxDB is running: `influx ping````

   - Check token and organization in `.env`

   - Ensure bucket exists: `influx bucket list````http$ npm run test:cov



3. **SSE stream returns null**:### Diet Management

   - Verify data exists in InfluxDB for the user

   - Check time range (data might be older than default -1h)POST /auth/login



4. **ESP32 sensor invalid readings**:#### Create Diet Record

   - See `SENSOR_TROUBLESHOOTING.md` in root directory

   - Ensure proper finger placement```httpContent-Type: application/json### Key Endpoints```

   - Check LED brightness settings

POST /diet

### Debug Endpoints

Content-Type: application/json

Check system health:

```bash

curl http://localhost:3067/health/debug/:userId

```{{- `POST /health/metrics` - ESP32 sensor data



## Project Structure  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",



```  "meal_type": "breakfast",  "email": "user@example.com",

backend/

├── src/  "food_name": "Oatmeal",

│   ├── auth/              # Authentication module

│   │   ├── auth.controller.ts  "calories": 158,  "password": "secure-password"- `GET /health/metrics/:userId` - Query metrics## Deployment

│   │   ├── auth.service.ts

│   │   ├── dto/           # Login/Register DTOs  "carbs": 27,

│   │   └── guards/        # JWT auth guard

│   ├── bmi/               # BMI tracking module  "protein": 6,}

│   │   ├── bmi.controller.ts

│   │   ├── bmi.service.ts  "fat": 3.2

│   │   └── dto/

│   ├── diet/              # Diet management module}```- `POST /bmi` - Log BMI

│   │   ├── diet.controller.ts

│   │   ├── diet.service.ts```

│   │   └── dto/

│   ├── health/            # Health metrics module

│   │   ├── health.controller.ts

│   │   ├── health.service.ts#### Get User Diet Records

│   │   └── dto/

│   ├── influxdb/          # InfluxDB service```http### Health Metrics- `POST /diet` - Log foodWhen you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

│   │   ├── influxdb.module.ts

│   │   └── influxdb.service.tsGET /diet/user/:userId?startDate=2025-10-01&endDate=2025-10-27

│   ├── supabase/          # Supabase service

│   │   ├── supabase.module.ts```

│   │   └── supabase.service.ts

│   ├── users/             # User management module

│   │   ├── users.controller.ts

│   │   ├── users.service.ts#### Get Diet Statistics#### Post Health Metric (from ESP32)- `GET /users` - User management

│   │   └── dto/

│   ├── seeds/             # Database seeding```http

│   │   └── seed.ts

│   ├── app.module.ts      # Main application moduleGET /diet/stats/:userId?days=7```http

│   └── main.ts            # Application entry point

├── migrations/            # SQL migrations```

├── test/                  # E2E tests

├── ESP32_IMPROVED.ino     # Improved ESP32 firmwarePOST /health/metricsIf you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

├── package.json

└── tsconfig.json### User Management

```

Content-Type: application/json

## Security

#### Get User Profile

- JWT-based authentication

- Password hashing with bcrypt```http## 🔌 ESP32 Example

- Service role key for Supabase admin operations

- CORS configured for frontend originGET /users/:id

- Environment variables for sensitive data

```{

## Deployment



### Production Considerations

#### Update User Profile  "device_id": "ESP32_001",```bash

1. **Environment Variables**: Set all production values

2. **Database Migration**: Run migrations before deployment```http

3. **InfluxDB**: Use persistent storage, configure retention policies

4. **SSL/TLS**: Enable HTTPS for API endpointsPATCH /users/:id  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

5. **Rate Limiting**: Consider adding rate limiting for public endpoints

6. **Monitoring**: Set up logging and health checksContent-Type: application/json



### Docker Deployment (Optional)  "heart_rate": 75,```json$ npm install -g @nestjs/mau



```dockerfile{

FROM node:18-alpine

WORKDIR /app  "name": "John Doe",  "blood_oxygen": 98,

COPY package*.json ./

RUN npm ci --only=production  "height": 1.75,

COPY . .

RUN npm run build  "age": 26,  "ppg_ir": [65000, 65100, 65200, ...],POST /health/metrics$ mau deploy

EXPOSE 3067

CMD ["npm", "run", "start:prod"]  "gender": "male"

```

}  "ppg_red": [32000, 32100, 32200, ...]

## License

```

[Your License Here]

}{```

## Contributing

## Database Schema

1. Fork the repository

2. Create a feature branch```

3. Commit your changes

4. Push to the branch### PostgreSQL (Supabase)

5. Open a Pull Request

  "device_id": "ESP32_001",

## Support

**users**

For issues and questions:

- See `SENSOR_TROUBLESHOOTING.md` for sensor issues- `id` (UUID, Primary Key)**Note**: `ppg_ir` and `ppg_red` are optional 100-sample arrays for analytics.

- Check GitHub Issues

- Contact: [Your Contact Info]- `email` (String, Unique)



## Acknowledgments- `name` (String)  "user_id": "uuid",With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.



- NestJS Framework- `age` (Integer)

- Supabase for PostgreSQL

- InfluxDB for time-series data- `gender` (String)#### Get Latest Health Metric

- MAX30102 sensor library by Sparkfun

- Maxim Integrated for SpO2 algorithm- `height` (Decimal) - Height in meters


- `created_at` (Timestamp)```http  "heart_rate": 75,



**bmi_records**GET /health/latest/:userId

- `id` (UUID, Primary Key)

- `user_id` (UUID, Foreign Key → users)```  "blood_oxygen": 98.5## Resources

- `weight` (Decimal) - Weight in kilograms

- `bmi` (Decimal)

- `recorded_at` (Timestamp)

#### Stream Real-time Health Metrics (SSE)}

**diet_records**

- `id` (UUID, Primary Key)```http

- `user_id` (UUID, Foreign Key → users)

- `meal_type` (String) - breakfast, lunch, dinner, snackGET /health/stream/:userId```Check out a few resources that may come in handy when working with NestJS:

- `food_name` (String)

- `calories` (Decimal)```

- `carbs` (Decimal)

- `protein` (Decimal)

- `fat` (Decimal)

- `recorded_at` (Timestamp)#### Get Health Statistics



**food_database**```http## 📚 Tech Stack- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

- `id` (Serial, Primary Key)

- `name` (String, Unique)GET /health/stats/:userId?days=7

- `calories` (Decimal)

- `carbs` (Decimal)```- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

- `protein` (Decimal)

- `fat` (Decimal)

- `serving_size` (String)

#### Get PPG Raw Data- NestJS 11- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

### InfluxDB

```http

**health_metrics** measurement

- Tags: `user_id`, `device_id`GET /health/ppg/:userId?start=-24h&limit=100- InfluxDB 2.x- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

- Fields: `heart_rate`, `blood_oxygen`

- Timestamp: Automatic```



**ppg_raw** measurement- Supabase- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

- Tags: `user_id`, `device_id`

- Fields: `ppg_ir` (JSON string), `ppg_red` (JSON string), `sample_count`**Query Parameters**:

- Timestamp: Automatic

- `start`: Time range (e.g., `-24h`, `-7d`), default: `-24h`- TypeScript- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

## Configuration

- `limit`: Maximum records to return, default: `100`

### Validation Rules

- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

Health metrics validation (relaxed for development):

- **Heart Rate**: 0-300 BPM (normal resting: 60-100 BPM)**Response**:- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

- **Blood Oxygen**: 0-100% (normal: 95-100%)

```json

These ranges allow collecting data even with imperfect sensor readings for analytics purposes.

[## Support

### BMI Calculation

  {

BMI is calculated using the formula:

```    "timestamp": "2025-10-27T10:30:00Z",Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

BMI = weight(kg) / height²(m)

```    "device_id": "ESP32_001",



**Important**: Height must be stored in meters, not centimeters.    "sample_count": 100,## Stay in touch



Categories:    "ppg_ir": [65000, 65100, ...],

- Underweight: BMI < 18.5

- Normal weight: BMI 18.5-24.9    "ppg_red": [32000, 32100, ...]- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

- Overweight: BMI 25-29.9

- Obese: BMI ≥ 30  }- Website - [https://nestjs.com](https://nestjs.com/)



## Testing]- Twitter - [@nestframework](https://twitter.com/nestframework)



### Run Unit Tests```

```bash

npm run test## License

```

### BMI Management

### Run E2E Tests

```bashNest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

npm run test:e2e

```#### Create BMI Record

```http

### Test CoveragePOST /bmi

```bashContent-Type: application/json

npm run test:cov

```{

  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

### Manual API Testing  "weight": 75.5

}

Test health metrics endpoint:```

```bash

curl -X POST http://localhost:3067/health/metrics \**Note**: BMI is calculated automatically using the user's height from their profile.

  -H "Content-Type: application/json" \

  -d '{#### Get Latest BMI

    "device_id": "ESP32_001",```http

    "user_id": "YOUR_USER_ID",GET /bmi/latest/:userId

    "heart_rate": 75,```

    "blood_oxygen": 98

  }'#### Get User BMI History

``````http

GET /bmi/user/:userId

Test SSE stream:```

```bash

curl -N http://localhost:3067/health/stream/YOUR_USER_ID#### Sync BMI Records

``````http

PUT /bmi/:userId/sync

## Data Seeding```



The seed script populates the database with sample data for development:Recalculates all BMI records based on current user height. Useful after updating height in profile.



```bash**Response**:

npm run seed```json

```{

  "message": "Successfully synced 62 BMI records",

This creates:  "updated": [

- 30 food items in the food database    {

- 31 days of BMI records (with realistic weight variations)      "recorded_at": "2025-10-01T00:00:00Z",

- 93 diet records (3 meals per day for 31 days)      "weight": 75.2,

- 8 days of health metrics (every 30 minutes)      "oldBmi": 0,

      "newBmi": 24.29

**Target User**:    }

- ID: `64a6f31f-68c4-4122-b406-55dc2d75703e`  ]

- Email: `rifkyari@gmail.com`}

- Height: 1.75m```

- Age: 23

- Gender: male### Diet Management



## ESP32 Integration#### Create Diet Record

```http

### Hardware SetupPOST /diet

Content-Type: application/json

1. **MAX30102 Sensor Connections**:

   - VCC → ESP32 3.3V{

   - GND → ESP32 GND  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

   - SDA → ESP32 GPIO 21  "meal_type": "breakfast",

   - SCL → ESP32 GPIO 22  "food_name": "Oatmeal",

  "calories": 158,

2. **Upload Firmware**:  "carbs": 27,

   - Use the improved code in `ESP32_IMPROVED.ino`  "protein": 6,

   - Configure WiFi credentials and API endpoint  "fat": 3.2

   - Upload to ESP32 via Arduino IDE}

```

3. **Features**:

   - Automatic finger detection (IR threshold: 50000)#### Get User Diet Records

   - 3-second stabilization period```http

   - PPG data collection (100 samples @ 100Hz)GET /diet/user/:userId?startDate=2025-10-01&endDate=2025-10-27

   - Sends data every 250ms```

   - Default values when readings are invalid

#### Get Diet Statistics

### API Configuration in ESP32```http

GET /diet/stats/:userId?days=7

```cpp```

const char* apiUrl = "https://api-glucosalt.heretichydra.xyz/health/metrics";

const char* userId = "64a6f31f-68c4-4122-b406-55dc2d75703e";### User Management

const char* deviceId = "ESP32_001";

```#### Get User Profile

```http

## TroubleshootingGET /users/:id

```

### Common Issues

#### Update User Profile

1. **BMI shows 0.0**:```http

   - Check user height is in meters (1.75) not centimeters (175)PATCH /users/:id

   - Run sync endpoint: `PUT /bmi/:userId/sync`Content-Type: application/json



2. **InfluxDB connection fails**:{

   - Verify InfluxDB is running: `influx ping`  "name": "John Doe",

   - Check token and organization in `.env`  "height": 1.75,

   - Ensure bucket exists: `influx bucket list`  "age": 26,

  "gender": "male"

3. **SSE stream returns null**:}

   - Verify data exists in InfluxDB for the user```

   - Check time range (data might be older than default -1h)

## 🗄️ Database Schema

4. **ESP32 sensor invalid readings**:

   - See `SENSOR_TROUBLESHOOTING.md` in root directory### PostgreSQL (Supabase)

   - Ensure proper finger placement

   - Check LED brightness settings**users**

- `id` (UUID, Primary Key)

### Debug Endpoints- `email` (String, Unique)

- `name` (String)

Check system health:- `age` (Integer)

```bash- `gender` (String)

curl http://localhost:3067/health/debug/:userId- `height` (Decimal) - Height in meters

```- `created_at` (Timestamp)



## Project Structure**bmi_records**

- `id` (UUID, Primary Key)

```- `user_id` (UUID, Foreign Key → users)

backend/- `weight` (Decimal) - Weight in kilograms

├── src/- `bmi` (Decimal)

│   ├── auth/              # Authentication module- `recorded_at` (Timestamp)

│   │   ├── auth.controller.ts

│   │   ├── auth.service.ts**diet_records**

│   │   ├── dto/           # Login/Register DTOs- `id` (UUID, Primary Key)

│   │   └── guards/        # JWT auth guard- `user_id` (UUID, Foreign Key → users)

│   ├── bmi/               # BMI tracking module- `meal_type` (String) - breakfast, lunch, dinner, snack

│   │   ├── bmi.controller.ts- `food_name` (String)

│   │   ├── bmi.service.ts- `calories` (Decimal)

│   │   └── dto/- `carbs` (Decimal)

│   ├── diet/              # Diet management module- `protein` (Decimal)

│   │   ├── diet.controller.ts- `fat` (Decimal)

│   │   ├── diet.service.ts- `recorded_at` (Timestamp)

│   │   └── dto/

│   ├── health/            # Health metrics module**food_database**

│   │   ├── health.controller.ts- `id` (Serial, Primary Key)

│   │   ├── health.service.ts- `name` (String, Unique)

│   │   └── dto/- `calories` (Decimal)

│   ├── influxdb/          # InfluxDB service- `carbs` (Decimal)

│   │   ├── influxdb.module.ts- `protein` (Decimal)

│   │   └── influxdb.service.ts- `fat` (Decimal)

│   ├── supabase/          # Supabase service- `serving_size` (String)

│   │   ├── supabase.module.ts

│   │   └── supabase.service.ts### InfluxDB

│   ├── users/             # User management module

│   │   ├── users.controller.ts**health_metrics** measurement

│   │   ├── users.service.ts- Tags: `user_id`, `device_id`

│   │   └── dto/- Fields: `heart_rate`, `blood_oxygen`

│   ├── seeds/             # Database seeding- Timestamp: Automatic

│   │   └── seed.ts

│   ├── app.module.ts      # Main application module**ppg_raw** measurement

│   └── main.ts            # Application entry point- Tags: `user_id`, `device_id`

├── migrations/            # SQL migrations- Fields: `ppg_ir` (JSON string), `ppg_red` (JSON string), `sample_count`

├── test/                  # E2E tests- Timestamp: Automatic

├── ESP32_IMPROVED.ino     # Improved ESP32 firmware

├── package.json## 🔧 Configuration

└── tsconfig.json

```### Validation Rules



## SecurityHealth metrics validation (relaxed for development):

- **Heart Rate**: 0-300 BPM (normal resting: 60-100 BPM)

- JWT-based authentication- **Blood Oxygen**: 0-100% (normal: 95-100%)

- Password hashing with bcrypt

- Service role key for Supabase admin operationsThese ranges allow collecting data even with imperfect sensor readings for analytics purposes.

- CORS configured for frontend origin

- Environment variables for sensitive data### BMI Calculation



## DeploymentBMI is calculated using the formula:

```

### Production ConsiderationsBMI = weight(kg) / height²(m)

```

1. **Environment Variables**: Set all production values

2. **Database Migration**: Run migrations before deployment**Important**: Height must be stored in meters, not centimeters.

3. **InfluxDB**: Use persistent storage, configure retention policies

4. **SSL/TLS**: Enable HTTPS for API endpointsCategories:

5. **Rate Limiting**: Consider adding rate limiting for public endpoints- Underweight: BMI < 18.5

6. **Monitoring**: Set up logging and health checks- Normal weight: BMI 18.5-24.9

- Overweight: BMI 25-29.9

### Docker Deployment (Optional)- Obese: BMI ≥ 30



```dockerfile## 🧪 Testing

FROM node:18-alpine

WORKDIR /app### Run Unit Tests

COPY package*.json ./```bash

RUN npm ci --only=productionnpm run test

COPY . .```

RUN npm run build

EXPOSE 3067### Run E2E Tests

CMD ["npm", "run", "start:prod"]```bash

```npm run test:e2e

```

## License

### Test Coverage

[Your License Here]```bash

npm run test:cov

## Contributing```



1. Fork the repository### Manual API Testing

2. Create a feature branch

3. Commit your changesTest health metrics endpoint:

4. Push to the branch```bash

5. Open a Pull Requestcurl -X POST http://localhost:3067/health/metrics \

  -H "Content-Type: application/json" \

## Support  -d '{

    "device_id": "ESP32_001",

For issues and questions:    "user_id": "YOUR_USER_ID",

- See `SENSOR_TROUBLESHOOTING.md` for sensor issues    "heart_rate": 75,

- Check GitHub Issues    "blood_oxygen": 98

- Contact: [Your Contact Info]  }'

```

## Acknowledgments

Test SSE stream:

- NestJS Framework```bash

- Supabase for PostgreSQLcurl -N http://localhost:3067/health/stream/YOUR_USER_ID

- InfluxDB for time-series data```

- MAX30102 sensor library by Sparkfun

- Maxim Integrated for SpO2 algorithm## 📊 Data Seeding


The seed script populates the database with sample data for development:

```bash
npm run seed
```

This creates:
- 30 food items in the food database
- 31 days of BMI records (with realistic weight variations)
- 93 diet records (3 meals per day for 31 days)
- 8 days of health metrics (every 30 minutes)

**Target User**:
- ID: `64a6f31f-68c4-4122-b406-55dc2d75703e`
- Email: `rifkyari@gmail.com`
- Height: 1.75m
- Age: 23
- Gender: male

## 🔌 ESP32 Integration

### Hardware Setup

1. **MAX30102 Sensor Connections**:
   - VCC → ESP32 3.3V
   - GND → ESP32 GND
   - SDA → ESP32 GPIO 21
   - SCL → ESP32 GPIO 22

2. **Upload Firmware**:
   - Use the improved code in `ESP32_IMPROVED.ino`
   - Configure WiFi credentials and API endpoint
   - Upload to ESP32 via Arduino IDE

3. **Features**:
   - Automatic finger detection (IR threshold: 50000)
   - 3-second stabilization period
   - PPG data collection (100 samples @ 100Hz)
   - Sends data every 250ms
   - Default values when readings are invalid

### API Configuration in ESP32

```cpp
const char* apiUrl = "https://api-glucosalt.heretichydra.xyz/health/metrics";
const char* userId = "64a6f31f-68c4-4122-b406-55dc2d75703e";
const char* deviceId = "ESP32_001";
```

## 🐛 Troubleshooting

### Common Issues

1. **BMI shows 0.0**:
   - Check user height is in meters (1.75) not centimeters (175)
   - Run sync endpoint: `PUT /bmi/:userId/sync`

2. **InfluxDB connection fails**:
   - Verify InfluxDB is running: `influx ping`
   - Check token and organization in `.env`
   - Ensure bucket exists: `influx bucket list`

3. **SSE stream returns null**:
   - Verify data exists in InfluxDB for the user
   - Check time range (data might be older than default -1h)

4. **ESP32 sensor invalid readings**:
   - See `SENSOR_TROUBLESHOOTING.md` in root directory
   - Ensure proper finger placement
   - Check LED brightness settings

### Debug Endpoints

Check system health:
```bash
curl http://localhost:3067/health/debug/:userId
```

## 📝 Project Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── dto/           # Login/Register DTOs
│   │   └── guards/        # JWT auth guard
│   ├── bmi/               # BMI tracking module
│   │   ├── bmi.controller.ts
│   │   ├── bmi.service.ts
│   │   └── dto/
│   ├── diet/              # Diet management module
│   │   ├── diet.controller.ts
│   │   ├── diet.service.ts
│   │   └── dto/
│   ├── health/            # Health metrics module
│   │   ├── health.controller.ts
│   │   ├── health.service.ts
│   │   └── dto/
│   ├── influxdb/          # InfluxDB service
│   │   ├── influxdb.module.ts
│   │   └── influxdb.service.ts
│   ├── supabase/          # Supabase service
│   │   ├── supabase.module.ts
│   │   └── supabase.service.ts
│   ├── users/             # User management module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   ├── seeds/             # Database seeding
│   │   └── seed.ts
│   ├── app.module.ts      # Main application module
│   └── main.ts            # Application entry point
├── migrations/            # SQL migrations
├── test/                  # E2E tests
├── ESP32_IMPROVED.ino     # Improved ESP32 firmware
├── package.json
└── tsconfig.json
```

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Service role key for Supabase admin operations
- CORS configured for frontend origin
- Environment variables for sensitive data

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Set all production values
2. **Database Migration**: Run migrations before deployment
3. **InfluxDB**: Use persistent storage, configure retention policies
4. **SSL/TLS**: Enable HTTPS for API endpoints
5. **Rate Limiting**: Consider adding rate limiting for public endpoints
6. **Monitoring**: Set up logging and health checks

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3067
CMD ["npm", "run", "start:prod"]
```

## 📄 License

[Your License Here]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions:
- See `SENSOR_TROUBLESHOOTING.md` for sensor issues
- Check GitHub Issues
- Contact: [Your Contact Info]

## 🙏 Acknowledgments

- NestJS Framework
- Supabase for PostgreSQL
- InfluxDB for time-series data
- MAX30102 sensor library by Sparkfun
- Maxim Integrated for SpO2 algorithm
