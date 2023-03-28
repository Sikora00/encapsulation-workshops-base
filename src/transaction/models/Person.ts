import Wallet, { WalletSnapshot } from './Wallet';
import { Snapshotting } from '../../common/interfaces/snapshotable.interface';
import { DatabaseId } from '../../common/types/id.type';

export interface PersonSnapshot {
  id?: DatabaseId;

  name: string;
  wallet: WalletSnapshot;
}

export default class Person implements Snapshotting<PersonSnapshot> {
  private readonly id?: DatabaseId;
  private readonly name: string;
  private cash: number;
  private wallet: Wallet;

  constructor(
    id: DatabaseId,
    name: string,
    wallet: Wallet = new Wallet(undefined),
    cash = 0,
  ) {
    this.name = name;
    this.wallet = wallet;
    this.id = id;
    this.cash = cash;
  }

  public howMuchCash(): number {
    return this.cash;
  }

  public withdrawMoneyFromWallet(amount: number): Person {
    this.wallet.withdraw(amount);
    this.cash += amount;

    return this;
  }

  public toSnapshot(): PersonSnapshot {
    return {
      name: this.name,
      wallet: this.wallet.toSnapshot(),
      id: this.id,
    };
  }
}
