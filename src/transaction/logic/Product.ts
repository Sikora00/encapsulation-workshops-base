export abstract class Product {
  protected price: number;
  protected stock: number;
  protected name: string;

  protected constructor(name: string, stock: number, price: number) {
    this.name = name;
    this.stock = stock;
    this.price = price;
  }

  protected calculateCost(amount: number): number {
    return this.price * amount;
  }
}
