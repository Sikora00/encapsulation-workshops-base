import { DatabaseId } from '../../common/types/id.type';
import { Snapshotting } from '../../common/interfaces/snapshotable.interface';
import ToBuyProduct, { ToBuyProductSnapshot } from './ToBuyProduct';
import PurchasedProduct from './PurchasedProduct';

export interface ShopProductSnapshot extends ToBuyProductSnapshot {
  sku: string;
  shopId?: DatabaseId;
  stock: number;
}

export default class ShopProduct
  extends ToBuyProduct
  implements Snapshotting<ShopProductSnapshot>
{
  private readonly shopId?: DatabaseId;
  private readonly sku: string;
  private stock: number;

  constructor(
    id: DatabaseId,
    name: string,
    stock: number,
    price: number,
    sku: string,
    shopId?: DatabaseId,
  ) {
    super(id, name, price);
    this.sku = sku;
    this.shopId = shopId;
    this.stock = stock;
  }

  public toSnapshot() {
    return {
      ...super.toSnapshot(),
      sku: this.sku,
      shopId: this.shopId,
      stock: this.stock,
    };
  }

  public isIdEqual(productId: number): boolean {
    return productId === this.id;
  }

  private throwErrorIfQuantityIsNotEnough(quantity: number) {
    if (!this.isQuantityEnough(quantity)) {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }
  }

  sell(quantity: number): PurchasedProduct {
    this.throwErrorIfQuantityIsNotEnough(quantity);

    this.removeFromStock(quantity);
    const cost = this.calculateCost(quantity);
    return new PurchasedProduct(this.id, this.name, cost);
  }

  private isQuantityEnough(quantity: number) {
    return this.stock >= quantity;
  }

  private isInStock() {
    return this.stock > 0;
  }

  public throwErrorIfNotInStock() {
    if (!this.isInStock()) {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }
  }

  private removeFromStock(quantity: number) {
    this.throwErrorIfQuantityIsNotEnough(quantity);

    this.stock -= quantity;
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
