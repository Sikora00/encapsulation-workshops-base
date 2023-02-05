import Wallet from './Wallet';
import { Product } from './Product';

export default class PurchasedProduct extends Product {
  constructor(name: string, quantity: number, cost: number) {
    super(name, quantity, cost);
  }

  executeTransaction(wallet: Wallet): void {
    try {
      wallet.withdraw(this.price);
    } catch {
      throw new Error('You have not enough money to buy it');
    }
  }

  depositProfit(wallet: Wallet): void {
    wallet.deposit(this.price);
  }
}
