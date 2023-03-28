import { Snapshotting } from '../../common/interfaces/snapshotable.interface';
import { DatabaseId } from '../../common/types/id.type';

export interface WalletSnapshot {
  id?: number;
  balance: number;
}

export default class Wallet implements Snapshotting<WalletSnapshot> {
  private readonly id?: DatabaseId;
  private balance: number;

  constructor(id: DatabaseId, balance = 0) {
    this.balance = balance;
    this.id = id;
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

  toSnapshot(): WalletSnapshot {
    return {
      balance: this.balance,
      id: this.id,
    };
  }
}
