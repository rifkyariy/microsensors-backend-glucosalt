# GlucosAlt Backend API# GlucosAlt Backend API# GlucosAlt Backend API<p align="center">



A NestJS-based backend API for the GlucosAlt health monitoring system, providing real-time health metrics tracking, BMI calculations, diet logging, and PPG (Photoplethysmography) data analytics.



## FeaturesA NestJS-based backend API for the GlucosAlt health monitoring system, providing real-time health metrics tracking, BMI calculations, diet logging, and PPG (Photoplethysmography) data analytics.  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>



- **Health Metrics Monitoring**: Real-time heart rate and SpO2 tracking with Server-Sent Events (SSE)

- **PPG Data Storage**: Raw PPG waveform data (IR and Red) for advanced analytics

- **BMI Tracking**: Body Mass Index calculation and historical tracking with sync functionality## 🚀 FeaturesNestJS backend API for GlucosAlt health monitoring system with ESP32 integration.</p>

- **Diet Management**: Food database and meal logging with nutritional information

- **User Authentication**: JWT-based authentication with Supabase

- **Time-Series Database**: InfluxDB integration for efficient health metrics storage

- **IoT Integration**: ESP32 sensor data ingestion and processing- **Health Metrics Monitoring**: Real-time heart rate and SpO2 tracking with Server-Sent Events (SSE)



## Prerequisites- **PPG Data Storage**: Raw PPG waveform data (IR and Red) for advanced analytics



- Node.js 18+ and npm- **BMI Tracking**: Body Mass Index calculation and historical tracking with sync functionality## 🏗️ Architecture[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

- PostgreSQL (via Supabase)

- InfluxDB 2.x- **Diet Management**: Food database and meal logging with nutritional information

- ESP32 with MAX30102 sensor (for data collection)

- **User Authentication**: JWT-based authentication with Supabase[circleci-url]: https://circleci.com/gh/nestjs/nest

## Installation

- **Time-Series Database**: InfluxDB integration for efficient health metrics storage

1. **Clone the repository**:

```bash- **IoT Integration**: ESP32 sensor data ingestion and processing- **NestJS**: TypeScript backend framework

git clone <repository-url>

cd GlucosAlt/backend

```

## 📋 Prerequisites- **InfluxDB**: Time-series database for health metrics (heart rate, SpO2)  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

2. **Install dependencies**:

```bash

npm install

```- Node.js 18+ and npm- **Supabase**: PostgreSQL for relational data (users, BMI, diet)    <p align="center">



3. **Configure environment variables**:- PostgreSQL (via Supabase)



Create a `.env` file in the backend directory:- InfluxDB 2.x- **TypeScript**: Full type safety<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>



```env- ESP32 with MAX30102 sensor (for data collection)

# Server Configuration

PORT=3067<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>



# Supabase Configuration## 🛠️ Installation

SUPABASE_URL=https://your-project.supabase.co

SUPABASE_SERVICE_KEY=your-service-key## 📦 Installation<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

SUPABASE_ANON_KEY=your-anon-key

JWT_SECRET=your-jwt-secret1. **Clone the repository**:



# InfluxDB Configuration```bash<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

INFLUXDB_URL=http://localhost:8086

INFLUXDB_TOKEN=your-influxdb-tokengit clone <repository-url>

INFLUXDB_ORG=east

INFLUXDB_BUCKET=health_metricscd GlucosAlt/backend```bash<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>



# CORS Configuration```

FRONTEND_URL=http://localhost:3066

```npm install<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>



4. **Set up the database**:2. **Install dependencies**:



Run the SQL migrations in `migrations/001_initial_schema.sql`:```bash```<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>



```bashnpm install

# Connect to your Supabase project and run the migration

psql -h your-db-host -U postgres -d postgres -f migrations/001_initial_schema.sql```  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>

```



5. **Seed the database** (optional):

```bash3. **Configure environment variables**:## ⚙️ Configuration    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>

npm run seed

```



## Running the ApplicationCreate a `.env` file in the backend directory:  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>



### Development Mode

```bash

npm run start:dev```env1. Copy `.env.example` to `.env`:</p>

```

# Server Configuration

### Production Mode

```bashPORT=3067```bash  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

npm run build

npm run start:prod

```

# Supabase Configurationcp .env.example .env  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

### Watch Mode

```bashSUPABASE_URL=https://your-project.supabase.co

npm run start:debug

```SUPABASE_SERVICE_KEY=your-service-key```



The API will be available at `http://localhost:3067`SUPABASE_ANON_KEY=your-anon-key



## API EndpointsJWT_SECRET=your-jwt-secret## Description



### Authentication



#### Register User# InfluxDB Configuration2. Update environment variables in `.env`

```http

POST /auth/registerINFLUXDB_URL=http://localhost:8086

Content-Type: application/json

INFLUXDB_TOKEN=your-influxdb-token[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

{

  "email": "user@example.com",INFLUXDB_ORG=east

  "password": "secure-password",

  "name": "John Doe",INFLUXDB_BUCKET=health_metrics## 🗄️ Database Setup

  "age": 25,

  "gender": "male",

  "height": 1.75

}# CORS Configuration## Project setup

```

FRONTEND_URL=http://localhost:3066

#### Login

```http```### Supabase (PostgreSQL)

POST /auth/login

Content-Type: application/json



{4. **Set up the database**:1. Create a Supabase project at https://supabase.com```bash

  "email": "user@example.com",

  "password": "secure-password"

}

```Run the SQL migrations in `migrations/001_initial_schema.sql`:2. Run migration: `migrations/001_initial_schema.sql`$ npm install



### Health Metrics



#### Post Health Metric (from ESP32)```bash```

```http

POST /health/metrics# Connect to your Supabase project and run the migration

Content-Type: application/json

psql -h your-db-host -U postgres -d postgres -f migrations/001_initial_schema.sql### InfluxDB

{

  "device_id": "ESP32_001",```

  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

  "heart_rate": 75,1. Install InfluxDB v2.x## Compile and run the project

  "blood_oxygen": 98,

  "ppg_ir": [65000, 65100, 65200, ...],5. **Seed the database** (optional):

  "ppg_red": [32000, 32100, 32200, ...]

}```bash2. Create bucket: `health_metrics`

```

npm run seed

**Note**: `ppg_ir` and `ppg_red` are optional 100-sample arrays for analytics.

```3. Generate API token```bash

#### Get Latest Health Metric

```http

GET /health/latest/:userId

```## 🚦 Running the Application# development



#### Stream Real-time Health Metrics (SSE)

```http

GET /health/stream/:userId### Development Mode## 🌱 Seed Database$ npm run start

```

```bash

#### Get Health Statistics

```httpnpm run start:dev

GET /health/stats/:userId?days=7

``````



#### Get PPG Raw Data```bash# watch mode

```http

GET /health/ppg/:userId?start=-24h&limit=100### Production Mode

```

```bashnpm run seed$ npm run start:dev

**Query Parameters**:

- `start`: Time range (e.g., `-24h`, `-7d`), default: `-24h`npm run build

- `limit`: Maximum records to return, default: `100`

npm run start:prod```

**Response**:

```json```

[

  {# production mode

    "timestamp": "2025-10-27T10:30:00Z",

    "device_id": "ESP32_001",### Watch Mode

    "sample_count": 100,

    "ppg_ir": [65000, 65100, ...],```bashCreates 4 test users with 30 days of data.$ npm run start:prod

    "ppg_red": [32000, 32100, ...]

  }npm run start:debug

]

`````````



### BMI Management



#### Create BMI RecordThe API will be available at `http://localhost:3067`## 🚀 Running

```http

POST /bmi

Content-Type: application/json

## 📡 API Endpoints## Run tests

{

  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

  "weight": 75.5

}### Authentication```bash

```



**Note**: BMI is calculated automatically using the user's height from their profile.

#### Register Usernpm run start:dev```bash

#### Get Latest BMI

```http```http

GET /bmi/latest/:userId

```POST /auth/register```# unit tests



#### Get User BMI HistoryContent-Type: application/json

```http

GET /bmi/user/:userId$ npm run test

```

{

#### Sync BMI Records

```http  "email": "user@example.com",API: http://localhost:3000

PUT /bmi/:userId/sync

```  "password": "secure-password",



Recalculates all BMI records based on current user height. Useful after updating height in profile.  "name": "John Doe",# e2e tests



**Response**:  "age": 25,

```json

{  "gender": "male",## 📡 API Endpoints$ npm run test:e2e

  "message": "Successfully synced 62 BMI records",

  "updated": [  "height": 1.75

    {

      "recorded_at": "2025-10-01T00:00:00Z",}

      "weight": 75.2,

      "oldBmi": 0,```

      "newBmi": 24.29

    }See full documentation in code comments.# test coverage

  ]

}#### Login

```

```http$ npm run test:cov

### Diet Management

POST /auth/login

#### Create Diet Record

```httpContent-Type: application/json### Key Endpoints```

POST /diet

Content-Type: application/json



{{- `POST /health/metrics` - ESP32 sensor data

  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

  "meal_type": "breakfast",  "email": "user@example.com",

  "food_name": "Oatmeal",

  "calories": 158,  "password": "secure-password"- `GET /health/metrics/:userId` - Query metrics## Deployment

  "carbs": 27,

  "protein": 6,}

  "fat": 3.2

}```- `POST /bmi` - Log BMI

```



#### Get User Diet Records

```http### Health Metrics- `POST /diet` - Log foodWhen you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

GET /diet/user/:userId?startDate=2025-10-01&endDate=2025-10-27

```



#### Get Diet Statistics#### Post Health Metric (from ESP32)- `GET /users` - User management

```http

GET /diet/stats/:userId?days=7```http

```

POST /health/metricsIf you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

### User Management

Content-Type: application/json

#### Get User Profile

```http## 🔌 ESP32 Example

GET /users/:id

```{



#### Update User Profile  "device_id": "ESP32_001",```bash

```http

PATCH /users/:id  "user_id": "64a6f31f-68c4-4122-b406-55dc2d75703e",

Content-Type: application/json

  "heart_rate": 75,```json$ npm install -g @nestjs/mau

{

  "name": "John Doe",  "blood_oxygen": 98,

  "height": 1.75,

  "age": 26,  "ppg_ir": [65000, 65100, 65200, ...],POST /health/metrics$ mau deploy

  "gender": "male"

}  "ppg_red": [32000, 32100, 32200, ...]

```

}{```

## Database Schema

```

### PostgreSQL (Supabase)

  "device_id": "ESP32_001",

**users**

- `id` (UUID, Primary Key)**Note**: `ppg_ir` and `ppg_red` are optional 100-sample arrays for analytics.

- `email` (String, Unique)

- `name` (String)  "user_id": "uuid",With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

- `age` (Integer)

- `gender` (String)#### Get Latest Health Metric

- `height` (Decimal) - Height in meters

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
