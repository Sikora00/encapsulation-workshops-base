import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import Shop from '../../../src/Shop';
import Person from '../../../src/Person';
import Wallet from '../../../src/Wallet';
import ProductDTO from '../../../src/dtos/ProductDTO';
import ShopGoodsDTO from '../../../src/dtos/ShopGoodsDTO';

const feature = loadFeature('shop/specs/features/03-shop-for-products.feature');

defineFeature(feature, (test) => {
  let product: ProductDTO;
  let shop: Shop;
  let person: Person;
  let wallet: Wallet;
  let error: Error;

  const givenThereIsRedApply = (given: DefineStepFunction) => {
    given('There is "red apple" with sku "1" and the price $1', () => {
      product = new ProductDTO('red apple', 1, "1");
    });
  };

  const andThereIsAShop = (and: DefineStepFunction) => {
    and('There is a shop with $0 on the bank account', () => {
      wallet = new Wallet(0);
      shop = new Shop([], wallet);

      expect(wallet).toMatchObject({ balance: 0 });
    });
  };

  test('Sell products to customers', ({ given, when, then, and }) => {
    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given('There is a shop with 1 red apple in the stock', () => {
      const shopGood = new ShopGoodsDTO(product.name, product.price, product.sku, 1);

      shop.addShopGoods(shopGood);
    });

    and('I am a customer', () => {
      wallet = new Wallet(10);
      person = new Person('John Doe', 0, wallet);

      expect(person).toMatchObject({ name: 'John Doe' });
    });

    when('I buy red apple from the shop', () => {
      person.buyProductFromShopUsingWallet(product, shop, wallet);
    });

    then('Shop have $1 on the bank account', () => {
      expect(shop).toMatchObject({
        wallet: { balance: 1 },
      });
    });

    and('Shop have 0 red apples in the stock', () => {
      expect(shop.findProductBySku(product.sku)).toMatchObject({
        quantity: 0,
      });
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
      const shopGood = new ShopGoodsDTO(product.name, product.price, product.sku, 0);
      shop = new Shop([shopGood], wallet);
    });

    and('I am a customer', () => {
      wallet = new Wallet(10);
      person = new Person('John Doe', 0, wallet);

      expect(person).toMatchObject({ name: 'John Doe' });
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
