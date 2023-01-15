import Wallet from './wallet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Shop from './shop.entity';
import Product from './product.entity';

@Entity()
class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cash: number;

  @OneToOne((type) => Wallet, { cascade: true, eager: true })
  @JoinColumn()
  wallet: Wallet;

  @ManyToMany(() => Product, { cascade: true, eager: true })
  @JoinTable()
  products: Product[];

  static create(name: string, cash: number, wallet: Wallet): Person {
    return Object.assign(new Person(), { name, cash, wallet });
  }

  withdrawMoneyFromWallet(amount: number): Person {
    this.wallet.withdraw(amount);
    this.cash += amount;

    return this;
  }

  buyProductUsingWallet(product: Product): void {
    try {
      const purchasedProduct = product.sell(1);
      purchasedProduct.executeTransaction(this.wallet);

      this.products.push(Product.createFromObject(product));
    } catch (e) {
      throw new Error('You have not enough money to buy it');
    }
  }

  buyProductFromShop(product: Product, shop: Shop): void {
    const purchasedProduct = shop.sellProduct(product, 1);
    purchasedProduct.executeTransaction(this.wallet);

    this.products.push(Product.createFromObject(product));
  }
}

export default Person;
