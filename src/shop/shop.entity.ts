import { ShopGoods } from 'src/shop-goods/shop-goods.entity';
import Wallet from 'src/wallet/wallet.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Shop {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne((type) => Wallet)
  @JoinColumn()
  public wallet: number;

  @OneToMany((type) => ShopGoods, (shopGood) => shopGood.shop)
  shopGoods: ShopGoods[];
}

export default Shop;
