import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import Product from '../../../src/Product';
import Shop from '../../../src/Shop';
import ShopGoods from '../../../src/ShopGoods';
import Person from '../../../src/Person';
import Wallet from '../../../src/Wallet';

const feature = loadFeature('shop/specs/features/03-shop-for-products.feature');

defineFeature(feature, (test) => {
  let product: Product;
  let shop: Shop;
  let person: Person;
  let wallet: Wallet;
  let error: Error;

  const givenThereIsRedApply = (given: DefineStepFunction) => {
    given('There is "red apple" with sku "1" and the price $1', () => {
      product = new Product('red apple', 1, "1");
      expect (product.getName()).toBe('red apple');
      expect (product.getSku()).toBe("1");
    });
  };

  const andThereIsAShop = (and: DefineStepFunction) => {
    and('There is a shop with $0 on the bank account', () => {
      shop = new Shop();

      expect(shop.getWallet().getBalance()).toBe(0);
    });
  };

  test('Sell products to customers', ({ given, when, then, and }) => {
    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given('There is a shop with 1 red apple in the stock', () => {
      const shopGood = new ShopGoods(product.getName(), product.getPrice(), product.getSku(), 1);

      shop.addShopGoods(shopGood);
      expect(shop.getShopGoods()[0].getQuantity()).toBe(1);
    });

    and('I am a customer', () => {
      person = new Person('John Doe', 0);
      wallet = new Wallet();

      wallet.addMoney(10);
      expect(person.getName()).toBe('John Doe');
    });

    when('I buy red apple from the shop', () => {
      person.buyProductFromShopUsingWallet(product, shop, wallet);
    });

    then('Shop have $1 on the bank account', () => {
      expect(shop.getWallet().getBalance()).toBe(1);
    });

    and('Shop have 0 red apples in the stock', () => {
      expect(shop.getShopGoods()[0].getQuantity()).toBe(0);
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
    given('There is a shop with 0 red apples in the stock', () => {
      const shopGood = new ShopGoods(product.getName(), product.getPrice(), product.getSku(), 0);

      shop.addShopGoods(shopGood);
      expect(shop.getShopGoods()[0].getQuantity()).toBe(0);
    });

    and('I am a customer', () => {
      person = new Person('John Doe', 0);
      wallet = new Wallet();

      wallet.addMoney(10);
      expect(person.getName()).toBe('John Doe');
    });

    when('I buy red apple from the shop', () => {
      try {
        person.buyProductFromShopUsingWallet(product, shop, wallet);
      } catch (e) {
        error = e;
      }
    });

    then(
      'I see error "There is no red apple available right now to buy"',
      () => {
        expect(error.message).toBe(
          'There is no red apple available right now to buy'
        );
      }
    );
  });
});
