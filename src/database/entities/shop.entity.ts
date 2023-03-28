import { ToEntity, ToModel } from '../../common/interfaces/model.interface';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Shop, { ShopSnapshot } from '../../transaction/models/Shop';
import WalletEntity from './wallet.entity';
import ShopProductEntity from './shop-product.entity';
import ShopProduct from '../../transaction/models/ShopProduct';

@Entity({
  name: 'shop',
})
class ShopEntity
  extends BaseEntity
  implements ToModel<Shop>, ToEntity<ShopEntity>
{
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => WalletEntity, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  wallet: WalletEntity;

  @OneToMany(() => ShopProductEntity, (shopProduct) => shopProduct.shop, {
    cascade: ['insert', 'update'],
  })
  products: ShopProductEntity[];

  public toModel(): Shop {
    return new Shop(
      this.id,
      this.products.map((product) => product.toModel()),
      this.wallet.toModel(),
    );
  }

  toEntity(shopSnapshot: ShopSnapshot): ShopEntity {
    const shopEntity = new ShopEntity();

    shopEntity.id = shopSnapshot.id;
    shopEntity.wallet = new WalletEntity().toEntity(shopSnapshot.wallet);
    shopEntity.products = shopSnapshot.products.map((product) => {
      return new ShopProductEntity().toEntity(
        ShopProduct.fromSnapshot(product),
      );
    });

    return shopEntity;
  }
}

export default ShopEntity;
