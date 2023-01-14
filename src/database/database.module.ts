import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonProducts } from './entities/person-products.entity';
import Person from './entities/person.entity';
import Product from './entities/product.entity';
import { ShopGoods } from './entities/shop-goods.entity';
import Shop from './entities/shop.entity';
import Wallet from './entities/wallet.entity';

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
        entities: [Person, Shop, Product, ShopGoods, Wallet, PersonProducts],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}