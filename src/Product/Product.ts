export default abstract class Product {
  protected name: string;
  protected quantity: number;

  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }
}
