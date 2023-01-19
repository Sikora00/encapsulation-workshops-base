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

  withdrawMoneyFromWallet(amount: number): Person {
    this.wallet.withdraw(amount);
    this.cash += amount;

    return this;
  }

  static createFromEntity(personEntity: PersonEntity): Person {
    return new Person(
      personEntity.name,
      personEntity.cash,
      Wallet.createFromEntity(personEntity.wallet),
    );
  }

  toEntity(): PersonEntity {
    const person = new PersonEntity();
    const wallet = this.wallet.toEntity();

    person.name = this.name;
    person.cash = this.cash;
    person.wallet = wallet;

    return person;
  }
}
