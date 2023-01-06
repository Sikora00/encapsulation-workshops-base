export default class Product {
  protected name: string;
  protected quantity: number;

  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }

  protected removeFromStock(quantity: number): void {
    if (this.quantity < quantity) {
      throw new Error(`There is no ${this.name} available right now to buy`);
    }

    this.quantity -= quantity;
  }

  protected isQuantityEnough(quantity: number): boolean {
    return this.quantity >= quantity;
  }
}
