// 📁 src/shared/infrastructure/database/migration.config.ts
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'pass',
  database: process.env.DB_NAME || 'articles',

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/shared/infrastructure/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
