import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('shop/specs/features/02-buying-products.feature');

defineFeature(feature, (test) => {
  test('Customer by product he is afford to.', ({ given, when, then, and }) => {
    given('There is a product called "red apple" that cost $1', () => {
    });

    and('I am "John Doe"', () => {
    });

    and('I have $10 in my wallet', () => {
    });

    when('I buy this product', () => {
    });

    then('I have this product on my products list', () => {
    });

    and('I have $9 left in the wallet', () => {
    });
  });

  test('Customer can not buy product when he have not enough money', ({
    given,
    when,
    then,
    and,
  }) => {
    given('There is a product called "yellow pear" that cost $2', () => {
    });

    and('I am "John Doe"', () => {
    });

    and('I have $1 in my wallet', () => {
    });

    when('I buy this product', () => {
    });

    then('I see message "You have not enough money to buy it"', () => {
    });
  });
});
