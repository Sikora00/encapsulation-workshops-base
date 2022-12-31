import { defineFeature, loadFeature } from 'jest-cucumber';
import Wallet from '../../../src/Wallet';
import Person from '../../../src/Person';

const feature = loadFeature('shop/specs/features/01-withdraw-money.feature');

defineFeature(feature, (test) => {
  let wallet: Wallet;
  let person: Person;

  beforeEach(() => {
    wallet = new Wallet(5);
    person = new Person('John', 0, wallet);
  });

  test('Withdraw money from the wallet', ({ given, when, then, and }) => {
    given('There is a wallet with $5', () => {
    });

    when('I withdraw the money $2 from the wallet', () => {
      person.withdrawMoneyFromWallet(2);
    });

    then('I have $2 in money', () => {
      expect(person).toMatchObject({ cash: 2 })
    });

    and('$3 is left in the wallet', () => {
      expect(wallet).toMatchObject({ balance: 3 });
    });
  });

  test('Can not withdraw money from the wallet if there is not enough founds', ({
    given,
    when,
    then,
  }) => {
    let error: Error;
    given('There is a wallet with $5', () => {
    });

    when('I withdraw the money $6 from the wallet', () => {
      try {
        person.withdrawMoneyFromWallet(6);
      } catch (e) {
        error = e.message;
      }
    });

    then('I see message "You have not enough money in your wallet."', () => {
      expect(error).toBe('You have not enough money in your wallet.');
      expect(wallet).toMatchObject({ balance: 5});
      expect(person).toMatchObject({ cash: 0 });
    });
  });
});
