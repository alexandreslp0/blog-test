import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { BcryptHashService } from './services/bcrypt-hash.service';
import { JwtTokenService } from './services/jwt-token.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN', '1d'),
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  providers: [
    {
      provide: 'HashService',
      useClass: BcryptHashService,
    },
    {
      provide: 'TokenService',
      useClass: JwtTokenService,
    },
  ],
  exports: ['HashService', 'TokenService', DatabaseModule],
})
export class InfrastructureModule {}
