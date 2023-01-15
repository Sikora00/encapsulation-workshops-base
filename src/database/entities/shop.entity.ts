import Wallet from './wallet.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './product.entity';

@Entity()
class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Wallet)
  @JoinColumn()
  wallet: Wallet;

  @ManyToMany((type) => Product, { cascade: true, eager: true })
  @JoinTable()
  products: Product[];

  static create(id: number, wallet: Wallet, products: Product[]): Shop {
    return Object.assign(new Shop(), { id, wallet, products });
  }

  addShopGoods(products: Product): void {
    this.products.push(products);
  }

  removeShopGoods(products: Product): void {
    this.products = this.products.filter((p) => p !== products);
  }

  sellProduct(product: Product, quantity: number): Product {
    const products = this.findProductBySku(product);
    const purchasedProduct = products.sell(quantity);
    purchasedProduct.depositProfit(this.wallet);

    return purchasedProduct;
  }

  findProductBySku(product: Product): Product {
    const products = this.products.find((p) => p.equalSku(product));

    if (!products) {
      throw new Error('Shop has not this product');
    }

    return products;
  }
}

export default Shop;
