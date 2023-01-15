import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import Wallet from './wallet.entity';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  sku: string;

  static create(
    name: string,
    quantity: number,
    price: number,
    sku: string,
  ): Product {
    return Object.assign(new Product(), { name, quantity, price, sku });
  }

  static createFromObject(product: Product): Product {
    return Object.assign(new Product(), product);
  }

  removeFromStock(quantity: number): void {
    if (this.quantity < quantity) {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }

    this.quantity -= quantity;
  }

  isQuantityEnough(quantity: number): boolean {
    return this.quantity >= quantity;
  }

  calculateCost(quantity: number): number {
    return this.price * quantity;
  }

  sell(quantity: number): Product {
    if (this.isQuantityEnough(quantity)) {
      this.removeFromStock(quantity);
      const cost = this.calculateCost(quantity);
      const purchasedProduct = Product.create(
        this.name,
        quantity,
        cost,
        this.sku,
      );

      return purchasedProduct;
    } else {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }
  }

  equalSku(product: Product): boolean {
    return this.sku === product.sku;
  }

  executeTransaction(wallet: Wallet): void {
    wallet.withdraw(this.price);
  }

  depositProfit(wallet: Wallet): void {
    wallet.deposit(this.price);
  }
}

export default Product;
