import Wallet from './Wallet';
import { Product } from './Product';

export default class PurchasedProduct extends Product {
  constructor(name: string, quantity: number, cost: number) {
    super(name, quantity, cost);
  }

  executeTransaction(wallet: Wallet): void {
    wallet.withdraw(this.price);
  }

  depositProfit(wallet: Wallet): void {
    wallet.deposit(this.price);
  }
}
