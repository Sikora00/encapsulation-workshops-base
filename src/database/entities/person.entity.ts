import { PersonProducts } from './person-products.entity';
import Wallet from './wallet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopGoods } from './shop-goods.entity';
import Shop from './shop.entity';

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

  @OneToMany(
    (type) => PersonProducts,
    (personProduct) => personProduct.person,
    {
      cascade: true,
    },
  )
  products: PersonProducts[];

  static create(name: string, cash: number, wallet: Wallet): Person {
    return Object.assign(new Person(), { name, cash, wallet });
  }

  withdrawMoneyFromWallet(amount: number): Person {
    this.wallet.withdraw(amount);
    this.cash += amount;

    return this;
  }

  buyProductUsingWallet(product: ShopGoods): void {
    try {
      const purchasedProduct = product.sell(1);
      purchasedProduct.executeTransaction(this.wallet);

      this.products.push(
        PersonProducts.create(product.name, product.quantity, product.price),
      );
    } catch (e) {
      throw new Error('You have not enough money to buy it');
    }
  }

  buyProductFromShop(product: ShopGoods, shop: Shop): void {
    const purchasedProduct = shop.sellProduct(product, 1);
    purchasedProduct.executeTransaction(this.wallet);

    this.products.push(
      PersonProducts.create(product.name, product.quantity, product.price),
    );
  }
}

export default Person;
