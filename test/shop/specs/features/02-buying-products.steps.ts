// import { defineFeature, loadFeature } from 'jest-cucumber';
// import Person from 'src/person/Person';
// import ToBuyProduct from 'src/product/to-buy-product';
// import Wallet from 'src/wallet/wallet';

// const feature = loadFeature('shop/specs/features/02-buying-products.feature');

// defineFeature(feature, (test) => {
//   let product: ToBuyProduct;
//   let person: Person;
//   let wallet;

//   test('Customer by product he is afford to.', ({ given, when, then, and }) => {
//     given('There is a product called "red apple" that cost $1', () => {
//       product = new ToBuyProduct('red apple', 1, 1, 'sku');
//       wallet = new Wallet(10);
//     });

//     and('I am "John Doe"', () => {
//       person = new Person('John Doe', 0, wallet);

//       expect(person).toMatchObject({ name: 'John Doe' });
//     });

//     and('I have $10 in my wallet', () => {
//       expect(wallet).toMatchObject({ balance: 10 });
//     });

//     when('I buy this product', () => {
//       person.buyProductUsingWallet(product);
//     });

//     then('I have this product on my products list', () => {
//       expect(person.productList).toMatchObject({
//         products: [product],
//       });
//     });

//     and('I have $9 left in the wallet', () => {
//       expect(wallet).toMatchObject({ balance: 9 });
//     });
//   });

//   test('Customer can not buy product when he have not enough money', ({
//     given,
//     when,
//     then,
//     and,
//   }) => {
//     let error: string;

//     given('There is a product called "yellow pear" that cost $2', () => {
//       product = new ToBuyProduct('yellow pear', 1, 2, 'sku');
//     });

//     and('I am "John Doe"', () => {
//       wallet = new Wallet(1);
//       person = new Person('John Doe', 0, wallet);
//       expect(person).toMatchObject({ name: 'John Doe' });
//     });

//     and('I have $1 in my wallet', () => {
//       expect(wallet).toMatchObject({ balance: 1 });
//     });

//     when('I buy this product', () => {
//       try {
//         person.buyProductUsingWallet(product);
//       } catch (e) {
//         error = e.message;
//       }
//     });

//     then('I see message "You have not enough money to buy it"', () => {
//       expect(person.productList).toMatchObject({
//         products: [],
//       });
//       expect(error).toBe('You have not enough money to buy it');
//       expect(wallet).toMatchObject({ balance: 1 });
//     });
//   });
// });
