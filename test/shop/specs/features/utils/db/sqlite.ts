import { TypeOrmModule } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setupSqliteModule = (entities: any[]) => {
  return TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    logging: false,
    migrationsRun: false,
    entities,
  });
};

export default setupSqliteModule;
