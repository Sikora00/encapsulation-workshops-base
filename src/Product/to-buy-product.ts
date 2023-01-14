import Product from './product';
import PurchasedProduct from './purchased-product';

export default class ToBuyProduct extends Product {
  private sku: string;
  private price: number;

  constructor(name: string, quantity: number, price: number, sku: string) {
    super(name, quantity);
    this.price = price;
    this.sku = sku;
  }

  private calculateCost(quantity: number): number {
    return this.price * quantity;
  }

  sell(quantity: number): PurchasedProduct {
    if (this.isQuantityEnough(quantity)) {
      this.removeFromStock(quantity);
      const cost = this.calculateCost(quantity);
      const purchasedProduct = new PurchasedProduct(this.name, quantity, cost);

      return purchasedProduct;
    } else {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }
  }

  equalSku(product: ToBuyProduct): boolean {
    return this.sku === product.sku;
  }
}
