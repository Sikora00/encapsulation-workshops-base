import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('shop/specs/features/01-withdraw-money.feature');

defineFeature(feature, (test) => {
  test('Withdraw money from the wallet', ({ given, when, then, and }) => {
    given('There is a wallet with $5', () => {
    });

    when('I withdraw the money $2 from the wallet', () => {
    });

    then('I have $2 in money', () => {
    });

    and('$3 is left in the wallet', () => {
    });
  });

  test('Can not withdraw money from the wallet if there is not enough founds', ({
    given,
    when,
    then,
  }) => {
    given('There is a wallet with $5', () => {
    });

    when('I withdraw the money $6 from the wallet', () => {
    });

    then('I see message "You have not enough money in your wallet."', () => {
    });
  });
});
