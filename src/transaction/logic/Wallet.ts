import WalletEntity from '../../database/entities/wallet.entity';

export default class Wallet {
  private balance: number;

  constructor(balance = 0) {
    this.balance = balance;
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

  static createFromEntity(walletEntity: WalletEntity): Wallet {
    return new Wallet(walletEntity.balance);
  }

  toEntity(): WalletEntity {
    const wallet = new WalletEntity();

    wallet.balance = this.balance;

    return wallet;
  }
}
