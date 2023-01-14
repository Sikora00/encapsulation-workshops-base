import Wallet from '../wallet/Wallet';
import Product from './Product';

export default class PurchasedProduct extends Product {
  private cost: number;

  constructor(name: string, quantity: number, cost: number) {
    super(name, quantity);

    this.cost = cost;
  }

  executeTransaction(wallet: Wallet): void {
    wallet.withdraw(this.cost);
  }

  depositProfit(wallet: Wallet): void {
    wallet.deposit(this.cost);
  }
}
