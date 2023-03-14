import { Product } from './Product';
import PurchasedProduct from './PurchasedProduct';
import { DatabaseId } from '../../common/types/id.type';

export default class ToBuyProduct extends Product {
  constructor(id: DatabaseId, name: string, quantity: number, price: number) {
    super(id, name, quantity, price);
  }

  sell(quantity: number): PurchasedProduct {
    this.throwErrorIfQuantityIsNotEnough(quantity);

    this.removeFromStock(quantity);
    const cost = this.calculateCost(quantity);
    return new PurchasedProduct(this.id, this.name, quantity, cost);
  }

  private throwErrorIfQuantityIsNotEnough(quantity: number) {
    if (!this.isQuantityEnough(quantity)) {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }
  }

  private isQuantityEnough(quantity: number) {
    return this.stock >= quantity;
  }

  private removeFromStock(quantity: number) {
    this.throwErrorIfQuantityIsNotEnough(quantity);

    this.stock -= quantity;
  }
}
