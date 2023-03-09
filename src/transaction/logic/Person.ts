import Wallet from './Wallet';

export default class Person {
  private id?: number;
  private name: string;
  private cash: number;
  private wallet: Wallet;

  constructor(
    name: string,
    cash = 0,
    wallet: Wallet = new Wallet(),
    id?: number,
  ) {
    this.name = name;
    this.cash = cash;
    this.wallet = wallet;
    this.id = id;
  }

  public withdrawMoneyFromWallet(amount: number): Person {
    this.wallet.withdraw(amount);
    this.cash += amount;

    return this;
  }

  public toSnapshot() {
    return {
      name: this.name,
      cash: this.cash,
      wallet: this.wallet,
      id: this.id,
    };
  }
}
