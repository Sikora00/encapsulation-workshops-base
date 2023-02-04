import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import PersonEntity from './entities/person.entity';
import WalletEntity from './entities/wallet.entity';
import ProductEntity from './entities/product.entity';
import PersonProductEntity from './entities/person-products.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          PersonEntity,
          WalletEntity,
          ProductEntity,
          PersonProductEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
