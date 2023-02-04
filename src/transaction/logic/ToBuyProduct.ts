import { Product } from './Product';
import PurchasedProduct from './PurchasedProduct';

export default class ToBuyProduct extends Product {
  constructor(name: string, quantity: number, price: number) {
    super(name, quantity, price);
  }

  sell(quantity: number): PurchasedProduct {
    if (this.isQuantityEnough(quantity)) {
      this.removeFromStock(quantity);
      const cost = this.calculateCost(quantity);
      return new PurchasedProduct(this.name, quantity, cost);
    } else {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }
  }

  private isQuantityEnough(quantity: number) {
    return this.stock >= quantity;
  }

  private removeFromStock(quantity: number) {
    if (this.isQuantityEnough(quantity)) {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }

    this.stock -= quantity;
  }
}
