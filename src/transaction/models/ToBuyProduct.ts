import { Product, ProductSnapshot } from './Product';
import PurchasedProduct from './PurchasedProduct';
import { DatabaseId } from '../../common/types/id.type';
import { Snapshotting } from '../../common/interfaces/snapshotable.interface';

export type ToBuyProductSnapshot = ProductSnapshot;

export default class ToBuyProduct
  extends Product
  implements Snapshotting<ToBuyProductSnapshot>
{
  constructor(id: DatabaseId, name: string, price: number) {
    super(id, name, price);
  }

  sell(quantity: number): PurchasedProduct {
    const cost = this.calculateCost(quantity);
    return new PurchasedProduct(this.id, this.name, cost);
  }

  public toSnapshot() {
    return {
      ...super.toSnapshot(),
    };
  }
}
