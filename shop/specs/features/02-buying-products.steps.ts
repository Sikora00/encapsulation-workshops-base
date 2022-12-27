import { defineFeature, loadFeature } from 'jest-cucumber';
import Product from '../../../src/Product';
import Person from '../../../src/Person';
import Wallet from '../../../src/Wallet';

const feature = loadFeature('shop/specs/features/02-buying-products.feature');

defineFeature(feature, (test) => {
  let product: Product;
  let person: Person;

  test('Customer by product he is afford to.', ({ given, when, then, and }) => {
    given('There is a product called "red apple" that cost $1', () => {
      product = new Product('red apple', 1);
    });

    and('I am "John Doe"', () => {
      person = new Person('John Doe', 0);

      expect(person.getName()).toBe('John Doe');
    });

    and('I have $10 in my wallet', () => {
      person.addCash(10);

      expect(person.getCash()).toBe(10);
    });

    when('I buy this product', () => {
      person.buyProductUsingCash(product);
    });

    then('I have this product on my products list', () => {
      expect(person.getProductList().getProducts()).toContain(product);
    });

    and('I have $9 left in the wallet', () => {
      expect(person.getCash()).toBe(9);
    });
  });

  test('Customer can not buy product when he have not enough money', ({
    given,
    when,
    then,
    and,
  }) => {
    let error: string;

    given('There is a product called "yellow pear" that cost $2', () => {
      product = new Product('yellow pear', 2);
      expect(product.getName()).toBe('yellow pear');
    });     


    and('I am "John Doe"', () => {
      person = new Person('John Doe', 0);
      expect(person.getName()).toBe('John Doe');
    });

    and('I have $1 in my wallet', () => {
      person.addCash(1);
      expect(person.getCash()).toBe(1);
    });

    when('I buy this product', () => {
      try {
        person.buyProductUsingCash(product);

      } catch (e) {
        error = e.message;
      }
    });

    then('I see message "You have not enough money to buy it"', () => {
      expect(person.getProductList().getProducts()).not.toContain(product);
      expect(error).toBe('You have not enough money to buy it');
    });
  });
});
