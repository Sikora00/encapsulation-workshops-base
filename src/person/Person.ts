import ToBuyProduct from '../product/to-buy-product';
import ProductList from '../product/product-list';
import Shop from '../shop/shop';
import Wallet from '../wallet/wallet';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class Person {
  private name: string;
  private cash: number;
  private wallet: Wallet;

  public productList: ProductList;

  constructor(
    name: string,
    cash = 0,
    wallet: Wallet = new Wallet(),
    productList: ProductList = new ProductList(),
  ) {
    this.name = name;
    this.cash = cash;
    this.productList = productList;
    this.wallet = wallet;
  }

  withdrawMoneyFromWallet(amount: number): Person {
    this.wallet.withdraw(amount);
    this.cash += amount;

    return this;
  }

  buyProductUsingWallet(product: ToBuyProduct): void {
    try {
      const purchasedProduct = product.sell(1);
      purchasedProduct.executeTransaction(this.wallet);
    } catch (e) {
      throw new Error('You have not enough money to buy it');
    }

    this.productList.addProduct(product);
  }

  buyProductFromShop(product: ToBuyProduct, shop: Shop): void {
    const purchasedProduct = shop.sellProduct(product, 1);
    purchasedProduct.executeTransaction(this.wallet);

    this.productList.addProduct(product);
  }
}
