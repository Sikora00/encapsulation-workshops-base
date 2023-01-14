import Person from './person.entity';
import Product from './product.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import Wallet from './wallet.entity';

@Entity()
export class PersonProducts extends Product {
  @Column()
  private cost: number;

  @ManyToOne((type) => Person, (person) => person.products) person: Person;

  static create(name: string, quantity: number, cost: number): PersonProducts {
    return Object.assign(new PersonProducts(), { name, quantity, cost });
  }

  executeTransaction(wallet: Wallet): void {
    wallet.withdraw(this.cost);
  }

  depositProfit(wallet: Wallet): void {
    wallet.deposit(this.cost);
  }
}
