import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  //api version prefix
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });

  app.use(helmet());
  app.enableCors();

  const configuration = app.get(ConfigService);
  const port = configuration.get<number>('app.port');
  await app.listen(port);
}
bootstrap();
