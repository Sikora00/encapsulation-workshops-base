export default class Wallet {
  private id?: number;
  private balance: number;

  constructor(balance = 0, id?: number) {
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

  toSnapshot() {
    return {
      balance: this.balance,
      id: this.id,
    };
  }
}
