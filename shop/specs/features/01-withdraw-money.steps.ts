import { defineFeature, loadFeature } from 'jest-cucumber';
import Wallet from '../../../src/Wallet';
import Person from '../../../src/Person';
import Bank from '../../../src/Bank';

const feature = loadFeature('shop/specs/features/01-withdraw-money.feature');

defineFeature(feature, (test) => {
  let wallet: Wallet;
  let person: Person;
  let cashMachine: Bank;

  beforeEach(() => {
    wallet = new Wallet();
    person = new Person('John', 0);
    cashMachine = new Bank();
    wallet.addMoney(5);
  });

  test('Withdraw money from the wallet', ({ given, when, then, and }) => {
    given('There is a wallet with $5', () => {
      expect(wallet.getBalance()).toBe(5);
    });

    when('I withdraw the money $2 from the wallet', () => {
      cashMachine.fromWalletToCash(2, person, wallet);
    });

    then('I have $2 in money', () => {
      expect(person.getCash()).toBe(2);
    });

    and('$3 is left in the wallet', () => {
      expect(wallet.getBalance()).toBe(3);
    });
  });

  test('Can not withdraw money from the wallet if there is not enough founds', ({
    given,
    when,
    then,
  }) => {
    let error: Error;
    given('There is a wallet with $5', () => {
        expect(wallet.getBalance()).toBe(5);
    });

    when('I withdraw the money $6 from the wallet', () => {
      try {
        cashMachine.fromWalletToCash(6, person, wallet);
      } catch (e) {
        error = e.message;
      }
    });

    then('I see message "You have not enough money in your wallet."', () => {
      expect(error).toBe('You have not enough money in your wallet.');
    });
  });
});
