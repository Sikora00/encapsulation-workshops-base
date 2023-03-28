import { DatabaseId } from '../../common/types/id.type';
import { Snapshotting } from '../../common/interfaces/snapshotable.interface';

export interface ProductSnapshot {
  id?: DatabaseId;
  name: string;
  price: number;
}

export class Product implements Snapshotting<ProductSnapshot> {
  protected readonly id: DatabaseId;
  protected price: number;
  protected name: string;

  constructor(id: DatabaseId, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  protected calculateCost(amount: number): number {
    return this.price * amount;
  }

  toSnapshot(): ProductSnapshot {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
    };
  }
}
