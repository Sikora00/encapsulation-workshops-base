import { DatabaseId } from '../../common/types/id.type';
import { Snapshotting } from '../../common/interfaces/snapshotable.interface';
import ToBuyProduct, { ToBuyProductSnapshot } from './ToBuyProduct';

export interface ShopProductSnapshot extends ToBuyProductSnapshot {
  sku: string;
  shopId?: DatabaseId;
  quantity: number;
}

export default class ShopProduct
  extends ToBuyProduct
  implements Snapshotting<ShopProductSnapshot>
{
  private readonly shopId?: DatabaseId;
  private readonly sku: string;

  constructor(
    id: DatabaseId,
    name: string,
    quantity: number,
    price: number,
    sku: string,
    shopId?: DatabaseId,
  ) {
    super(id, name, quantity, price);
    this.sku = sku;
    this.shopId = shopId;
  }

  public toSnapshot() {
    return {
      ...super.toSnapshot(),
      sku: this.sku,
      shopId: this.shopId,
      quantity: this.stock,
    };
  }

  public isSkuEqual(product: ShopProduct): boolean {
    return this.sku === product.sku;
  }

  static fromSnapshot(snapshot: ShopProductSnapshot): ShopProduct {
    return new ShopProduct(
      snapshot.id,
      snapshot.name,
      snapshot.stock,
      snapshot.price,
      snapshot.sku,
      snapshot.shopId,
    );
  }
}
