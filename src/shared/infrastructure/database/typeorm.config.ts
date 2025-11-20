import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('typeorm-config', () => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    cli: {
      migrationsDir: 'src/database/migrations',
    },

    synchronize: false,
    logging: process.env.DB_LOGGING === 'true',

    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  } as DataSourceOptions;
});
