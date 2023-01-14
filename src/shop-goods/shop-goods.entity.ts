import { Product } from 'src/product/product.entity';
import Shop from 'src/shop/shop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class ShopGoods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToMany((type) => Product) @JoinTable() products: Product[];

  @ManyToOne((type) => Shop, (shop) => shop.shopGoods) shop: Shop;
}
