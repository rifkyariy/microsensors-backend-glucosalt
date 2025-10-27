import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  // Support multiple allowed frontend origins via FRONTEND_URLS (comma-separated)
  // or a single FRONTEND_URL. If none provided, default to http://localhost:3001.
  const frontendUrlsEnv = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:3001';
  const allowedOrigins = frontendUrlsEnv.split(',').map(u => u.trim()).filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g., server-to-server or curl with no Origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // For debugging: return error when origin not allowed
      return callback(new Error('CORS policy: Origin not allowed'), false);
    },
    credentials: true,
  });

  console.log('CORS allowed origins:', allowedOrigins);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();

