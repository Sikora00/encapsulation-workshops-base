import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Wallet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public balance: number;

  static create(balance = 0) {
    return Object.assign(new Wallet(), { balance });
  }

  withdraw(amount: number): Wallet {
    if (this.balance < amount) {
      throw new Error('You have not enough money in your wallet.');
    }

    this.balance -= amount;

    return this;
  }

  deposit(amount: number): Wallet {
    this.balance += amount;
    return this;
  }
}

export default Wallet;
