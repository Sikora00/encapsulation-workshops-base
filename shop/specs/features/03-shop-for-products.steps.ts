import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';

const feature = loadFeature('shop/specs/features/03-shop-for-products.feature');

defineFeature(feature, (test) => {

  const givenThereIsRedApply = (given: DefineStepFunction) => {
    given('There is "red apple" with sku "1" and the price $1', () => {
    });
  };

  const andThereIsAShop = (and: DefineStepFunction) => {
    and('There is a shop with $0 on the bank account', () => {
    });
  };

  test('Sell products to customers', ({ given, when, then, and }) => {

    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given('There is a shop with 1 red apple in the stock', () => {
    });

    and('I am a customer', () => {
    });

    when('I buy red apple from the shop', () => {
    });

    then('Shop have $1 on the bank account', () => {
    });

    and('Shop have 0 red apples in the stock', () => {
    });
  });

  test('Can not buy if product is out of stock', ({
    given,
    when,
    then,
    and,
  }) => {
    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given('There is a shop with 0 red apples in the stock', () => {});

    and('I am a customer', () => {
    });

    when('I buy red apple from the shop', () => {
    });

    then(
      'I see error "There is no red apple available right now to buy"',
      () => {
      }
    );
  });
});
