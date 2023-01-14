import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { WalletModule } from './wallet/wallet.module';
import { PersonModule } from './person/person.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ShopGoodsModule } from './shop-goods/shop-goods.module';
import { PersonProductsModule } from './person-products/person-products.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ProductModule,
    ShopModule,
    WalletModule,
    PersonModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    ShopGoodsModule,
    PersonProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
