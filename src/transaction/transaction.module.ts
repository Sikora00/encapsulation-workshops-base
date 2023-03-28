import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PersonEntity from '../database/entities/person.entity';
import WalletEntity from '../database/entities/wallet.entity';
import PersonProductEntity from '../database/entities/person-products.entity';
import ProductEntity from '../database/entities/product.entity';
import { SavePersonAndProduct } from '../database/transactions/save-person-and-product.service';
import { PersonRepository } from '../database/repositories/person.repository';
import { ProductRepository } from '../database/repositories/product.repository';
import { WalletRepository } from '../database/repositories/wallet.repository';
import { PersonProductsRepository } from '../database/repositories/person-products.repository';
import ShopEntity from '../database/entities/shop.entity';
import ShopProductEntity from '../database/entities/shop-product.entity';
import { ShopProductRepository } from '../database/repositories/shop-products.repository';
import { ShopRepository } from '../database/repositories/shop.repository';
import { SaveAfterShopTransactionData } from '../database/transactions/save-after-shop-transaction-data';

@Module({
  providers: [
    TransactionService,
    SavePersonAndProduct,
    SaveAfterShopTransactionData,
    PersonRepository,
    PersonProductsRepository,
    ProductRepository,
    WalletRepository,
    ShopProductRepository,
    ShopRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      PersonEntity,
      WalletEntity,
      PersonProductEntity,
      ProductEntity,
      ShopEntity,
      ShopProductEntity,
    ]),
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
