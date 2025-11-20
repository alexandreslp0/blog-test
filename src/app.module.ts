import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { InfrastructureModule } from './shared/infrastructure/infrastructure.module';
import { UsersModule } from './modules/users/users.module';
import { AllExceptionsFilter } from './shared/common/filters/all-exception.filter';
import { LoggerMiddleware } from './shared/common/middlares/logger.middleware';
import typeormConfig from './shared/infrastructure/database/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),

    InfrastructureModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
        }),
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
