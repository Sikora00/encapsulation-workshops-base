import Product from './product.entity';
import Shop from './shop.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PersonProducts } from './person-products.entity';

@Entity()
export class ShopGoods extends Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  sku: string;

  @ManyToOne((type) => Shop, (shop) => shop.shopGoods) shop: Shop;

  private calculateCost(quantity: number): number {
    return this.price * quantity;
  }

  sell(quantity: number): PersonProducts {
    if (this.isQuantityEnough(quantity)) {
      this.removeFromStock(quantity);
      const cost = this.calculateCost(quantity);
      const purchasedProduct = PersonProducts.create(this.name, quantity, cost);

      return purchasedProduct;
    } else {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }
  }

  equalSku(product: ShopGoods): boolean {
    return this.sku === product.sku;
  }
}
