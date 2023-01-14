import { ShopGoods } from './shop-goods.entity';
import Wallet from './wallet.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonProducts } from './person-products.entity';

@Entity()
class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Wallet)
  @JoinColumn()
  wallet: Wallet;

  @OneToMany((type) => ShopGoods, (shopGood) => shopGood.shop)
  shopGoods: ShopGoods[];

  static create(id: number, wallet: Wallet, shopGoods: ShopGoods[]): Shop {
    return Object.assign(new Shop(), { id, wallet, shopGoods });
  }

  addShopGoods(shopGoods: ShopGoods): void {
    this.shopGoods.push(shopGoods);
  }

  removeShopGoods(shopGoods: ShopGoods): void {
    this.shopGoods = this.shopGoods.filter((p) => p !== shopGoods);
  }

  sellProduct(product: ShopGoods, quantity: number): PersonProducts {
    const shopGoods = this.findProductBySku(product);
    const purchasedProduct = shopGoods.sell(quantity);
    purchasedProduct.depositProfit(this.wallet);

    return purchasedProduct;
  }

  findProductBySku(product: ShopGoods): ShopGoods {
    const shopGoods = this.shopGoods.find((p) => p.equalSku(product));

    if (!shopGoods) {
      throw new Error('Shop has not this product');
    }

    return shopGoods;
  }
}

export default Shop;
