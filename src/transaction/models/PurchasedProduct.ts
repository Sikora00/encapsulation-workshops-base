import Wallet from './Wallet';
import { Product } from './Product';
import { Snapshotting } from '../../common/interfaces/snapshotable.interface';
import { DatabaseId } from '../../common/types/id.type';

export interface PurchasedProductSnapshot {
  id?: DatabaseId;
  name: string;
  stock: number;
  price: number;
}
export default class PurchasedProduct
  extends Product
  implements Snapshotting<PurchasedProductSnapshot>
{
  constructor(id: DatabaseId, name: string, quantity: number, cost: number) {
    super(id, name, quantity, cost);
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

  public toSnapshot() {
    return {
      id: this.id,
      name: this.name,
      stock: this.stock,
      price: this.price,
    };
  }
}
