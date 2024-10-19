import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { configuration } from '@app/config/configuration';
import { validate } from '@app/config/env.validation';
import pinoConfig from '@app/config/pino.logger.config';

import { GlobalExceptionFilter } from '@app/shared/filters/global-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], validate }),
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => pinoConfig,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
