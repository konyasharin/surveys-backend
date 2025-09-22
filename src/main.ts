import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { VERCEL_SWAGGER_FIX_OPTIONS } from './shared/constants';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const apiPrefix = process.env.API_PREFIX ?? '';
  const swaggerPrefix = process.env.SWAGGER_PREFIX ?? 'swagger';
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? 'http://localhost';

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix(apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('Surveys API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    swaggerPrefix,
    app,
    documentFactory,
    VERCEL_SWAGGER_FIX_OPTIONS,
  );

  await app.listen(port);

  logger.log(`Server started at ${host}:${port}/`);
  logger.log(
    `Api available at ${host}:${port}/${apiPrefix ? `${apiPrefix}/` : ''}`,
  );
  logger.log(`Swagger available at ${host}:${port}/${swaggerPrefix}/`);
}
bootstrap();
