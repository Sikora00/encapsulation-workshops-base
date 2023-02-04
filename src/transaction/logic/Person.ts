import PersonEntity from '../../database/entities/person.entity';
import Wallet from './Wallet';

export default class Person {
  private name: string;
  private cash: number;
  private wallet: Wallet;

  constructor(name: string, cash = 0, wallet: Wallet = new Wallet()) {
    this.name = name;
    this.cash = cash;
    this.wallet = wallet;
  }

  public withdrawMoneyFromWallet(amount: number): Person {
    this.wallet.withdraw(amount);
    this.cash += amount;

    return this;
  }

  public toEntity(): PersonEntity {
    const personEntity = new PersonEntity();
    personEntity.name = this.name;
    personEntity.cash = this.cash;
    personEntity.wallet = this.wallet.toEntity();

    return personEntity;
  }
}
