import { defineFeature, DefineStepFunction, loadFeature } from "jest-cucumber";
import Shop from "../../../src/Shop";
import Person from "../../../src/Person";
import Wallet from "../../../src/Wallet";
import ToBuyProduct from "../../../src/Product/ToBuyProduct";

const feature = loadFeature("shop/specs/features/03-shop-for-products.feature");

defineFeature(feature, (test) => {
  let product: ToBuyProduct;
  let shop: Shop;
  let person: Person;
  let wallet: Wallet;
  let error: Error;

  const givenThereIsRedApply = (given: DefineStepFunction) => {
    given('There is "red apple" with sku "1" and the price $1', () => {
      product = new ToBuyProduct("red apple", 1, 1, "sku");
    });
  };

  const andThereIsAShop = (and: DefineStepFunction) => {
    and("There is a shop with $0 on the bank account", () => {
      wallet = new Wallet(0);
      shop = new Shop([], wallet);

      expect(wallet).toMatchObject({ balance: 0 });
    });
  };

  test("Sell products to customers", ({ given, when, then, and }) => {
    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given("There is a shop with 1 red apple in the stock", () => {
      const shopGood = new ToBuyProduct("red apple", 1, 1, "sku");

      shop.addShopGoods(shopGood);
    });

    and("I am a customer", () => {
      wallet = new Wallet(10);
      person = new Person("John Doe", 0, wallet);

      expect(person).toMatchObject({ name: "John Doe" });
    });

    when("I buy red apple from the shop", () => {
      person.buyProductFromShop(product, shop);
    });

    then("Shop have $1 on the bank account", () => {
      expect(shop).toMatchObject({
        wallet: { balance: 1 },
      });
    });

    and("Shop have 0 red apples in the stock", () => {
      expect(shop.findProductBySku(product)).toMatchObject({
        quantity: 0,
      });
    });
  });

  test("Can not buy if product is out of stock", ({
    given,
    when,
    then,
    and,
  }) => {
    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given("There is a shop with 0 red apples in the stock", () => {
      const toBuyProduct = new ToBuyProduct("red apple", 0, 1, "sku");
      shop = new Shop([toBuyProduct], wallet);
    });

    and("I am a customer", () => {
      wallet = new Wallet(10);
      person = new Person("John Doe", 0, wallet);

      expect(person).toMatchObject({ name: "John Doe" });
    });

    when("I buy red apple from the shop", () => {
      try {
        person.buyProductFromShop(product, shop);
      } catch (e) {
        error = e;
      }
    });

    then(
      'I see error "There is no red apple available right now to buy"',
      () => {
        expect(error.message).toBe(
          "There is no red apple available right now to buy"
        );
      }
    );
  });
});
