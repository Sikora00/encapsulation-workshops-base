import { PrimaryGeneratedColumn, Column } from 'typeorm';

export default abstract class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

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
