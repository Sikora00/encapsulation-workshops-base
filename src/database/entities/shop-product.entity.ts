import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductEntity from './product.entity';
import { ToEntity, ToModel } from '../../common/interfaces/model.interface';
import ShopProduct from '../../transaction/models/ShopProduct';
import ShopEntity from './shop.entity';

@Entity({
  name: 'shop-product',
})
class ShopProductEntity
  extends BaseEntity
  implements ToEntity<ShopProductEntity>, ToModel<ShopProduct>
{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  @Column()
  productId?: number;

  @ManyToOne(() => ShopEntity)
  @JoinColumn()
  shop: ShopEntity;

  @Column()
  sku?: string;

  @Column()
  shopId?: number;

  @Column()
  quantity?: number;

  public toEntity(shopProduct: ShopProduct): ShopProductEntity {
    const shopProductSnapshot = shopProduct.toSnapshot();

    this.productId = shopProductSnapshot.id;
    this.shopId = shopProductSnapshot.shopId;
    this.quantity = shopProductSnapshot.quantity;
    this.id = shopProductSnapshot.id;

    return this;
  }

  toModel(): ShopProduct {
    return new ShopProduct(
      this.id,
      this.product?.name,
      this.quantity,
      this.product?.cost,
      this.sku,
      this.shopId,
    );
  }
}

export default ShopProductEntity;
