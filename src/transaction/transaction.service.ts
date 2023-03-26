import { Injectable } from '@nestjs/common';
import ToBuyProduct from './models/ToBuyProduct';
import { SavePersonAndProduct } from '../database/transactions/save-person-and-product.service';
import { PersonProduct } from './models/PersonProduct';
import Person from './models/Person';
import { PersonRepository } from '../database/repositories/person.repository';
import { ProductRepository } from '../database/repositories/product.repository';
import { Product } from './models/Product';
import { WalletRepository } from '../database/repositories/wallet.repository';
import Wallet from './models/Wallet';
import { PersonProductsRepository } from '../database/repositories/person-products.repository';
import ShopProduct from './models/ShopProduct';
import { ShopProductRepository } from '../database/repositories/shop-products.repository';
import Shop from './models/Shop';
import { ShopRepository } from '../database/repositories/shop.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly personRepository: PersonRepository<Person>,
    private readonly walletRepository: WalletRepository<Wallet>,
    private readonly productRepository: ProductRepository<Product>,
    private readonly personProductRepository: PersonProductsRepository<PersonProduct>,
    private readonly savePersonAndProduct: SavePersonAndProduct,
    private readonly shopProductRepository: ShopProductRepository<ShopProduct>,
    private readonly shopRepository: ShopRepository<Shop>,
  ) {}

  async withdrawMoney(id: number, amount: number) {
    const person = await this.personRepository.findOneModelOrFail({
      where: { id },
    });

    person.withdrawMoneyFromWallet(amount);
    await this.personRepository.saveModel(person);

    return {
      cash: person.howMuchCash(),
      wallet: person.toSnapshot().wallet,
    };
  }

  async buyProduct(walletId: number, productId: number, amount: number) {
    const product = await this.productRepository.findOneModelOrFail({
      where: { id: productId },
    });

    const wallet = await this.walletRepository.findOneModelOrFail({
      where: { id: walletId },
    });

    const productSnapshot = product.toSnapshot();
    const toBuyProduct = new ToBuyProduct(
      productSnapshot.id,
      productSnapshot.name,
      productSnapshot.stock,
      productSnapshot.price,
    );

    const purchasedProduct = toBuyProduct.sell(amount);
    purchasedProduct.executeTransaction(wallet);

    const person = await this.personRepository.findOneModelOrFail({
      where: { wallet: { id: walletId } },
    });

    const personProduct = new PersonProduct(
      undefined,
      purchasedProduct,
      person,
      amount,
    );

    return await this.savePersonAndProduct.run({
      wallet: wallet.toSnapshot(),
      personProduct: personProduct.toSnapshot(),
    });
  }

  async buyShopProduct(walletId: number, shopId: number, productId: number) {
    const wallet = await this.walletRepository.findOneModelOrFail({
      where: { id: walletId },
    });

    const shop = await this.shopRepository.findOneModelOrFail({
      relations: ['products', 'products.product', 'wallet'],
      where: {
        id: shopId,
      },
    });

    const shopProduct = await this.shopProductRepository.findOneModelOrFail({
      relations: ['product'],
      where: { product: { id: productId } },
    });

    const purchasedProduct = shop.sellProduct(shopProduct, 1);
    purchasedProduct.executeTransaction(wallet);

    await this.walletRepository.saveModel(wallet);
    await this.shopProductRepository.saveModel(shopProduct);
    await this.shopRepository.saveModel(shop);

    return {
      status: 'success',
    };
  }
}
