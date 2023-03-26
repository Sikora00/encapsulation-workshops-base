import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import PersonEntity from '../../../../src/database/entities/person.entity';
import ProductEntity from '../../../../src/database/entities/product.entity';
import PersonProductEntity from '../../../../src/database/entities/person-products.entity';
import ShopProductEntity from '../../../../src/database/entities/shop-product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionModule } from '../../../../src/transaction/transaction.module';
import setupSqliteModule from './utils/db/sqlite';
import WalletEntity from '../../../../src/database/entities/wallet.entity';
import * as supertest from 'supertest';
import ShopEntity from '../../../../src/database/entities/shop.entity';

const feature = loadFeature(
  'test/shop/specs/features/03-shop-for-products.feature',
);

defineFeature(feature, (test) => {
  let app: INestApplication;
  let agent;
  let personRepository: Repository<PersonEntity>;
  let productRepository: Repository<ProductEntity>;
  let shopProductRepository: Repository<ShopProductEntity>;
  let shopRepository: Repository<ShopEntity>;
  let product: ProductEntity;
  let shop: ShopEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TransactionModule,
        setupSqliteModule([
          WalletEntity,
          PersonEntity,
          ProductEntity,
          PersonProductEntity,
          ShopProductEntity,
          ShopEntity,
        ]),
      ],
    }).compile();

    app = await module.createNestApplication();

    agent = supertest.agent(app.getHttpServer());
    await app.init();

    personRepository = module.get('PersonEntityRepository');
    productRepository = module.get('ProductEntityRepository');
    shopProductRepository = module.get('ShopProductEntityRepository');
    shopRepository = module.get('ShopEntityRepository');
  });

  const givenThereIsRedApply = (given: DefineStepFunction) => {
    given('There is "red apple" with sku "1" and the price $1', async () => {
      product = new ProductEntity();
      product.name = 'red apple';
      product.cost = 1;
      product.stock = 1;

      product = await productRepository.save(product);
    });
  };

  const andThereIsAShop = (and: DefineStepFunction) => {
    and('There is a shop with $0 on the bank account', async () => {
      shop = new ShopEntity();
      shop.wallet = new WalletEntity();
      shop.wallet.balance = 0;

      shop = await shopRepository.save(shop);
    });
  };

  test('Sell products to customers', ({ given, when, then, and }) => {
    let response;
    let person: PersonEntity;

    // afterAll(async () => {
    //   await personRepository.delete(person.id);
    //   await productRepository.delete(product.id);
    //   await personProductRepository.clear();
    //   await shopProductRepository.clear();
    // });
    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given('There is a shop with 1 red apple in the stock', () => {
      const shopProduct = new ShopProductEntity();
      shopProduct.product = product;
      shopProduct.shop = shop;
      shopProduct.sku = '1';

      shopProductRepository.save(shopProduct);
    });

    and('I am a customer', async () => {
      person = new PersonEntity();
      person.name = 'John Doe';
      person.wallet = new WalletEntity();
      person.wallet.balance = 10;
      person = await personRepository.save(person);
    });

    when('I buy red apple from the shop', async () => {
      response = await agent
        .post(`/transactions/wallets/${person.wallet.id}/shops/${shop.id}/buy`)
        .send({ productId: product.id })
        .then((res) => (response = res));

      expect(response.status).toBe(201);
      expect(response.body.status).toEqual('success');
    });

    then('Shop have $1 on the bank account', async () => {
      shop = await shopRepository.findOne({
        where: { id: shop.id },
        relations: ['wallet', 'products'],
      });
      expect(shop.wallet.balance).toBe(1);
    });

    and('Shop have 0 red apples in the stock', () => {
      expect(shop.products[0].quantity).toBe(0);
    });
  });

  test('Can not buy if product is out of stock', ({
    given,
    when,
    then,
    and,
  }) => {
    let response;
    let person: PersonEntity;

    givenThereIsRedApply(given);
    andThereIsAShop(and);
    given('There is a shop with 0 red apples in the stock', () => {
      const shopProduct = new ShopProductEntity();
      shopProduct.product = product;
      shopProduct.shop = shop;
      shopProduct.sku = '1';

      shopProductRepository.save(shopProduct);
    });

    and('I am a customer', async () => {
      person = new PersonEntity();
      person.name = 'John Doe';
      person.wallet = new WalletEntity();
      person.wallet.balance = 10;
      person = await personRepository.save(person);
    });

    when('I buy red apple from the shop', async () => {
      response = await agent
        .post(`/transactions/wallets/${person.wallet.id}/shops/${shop.id}/buy`)
        .send({ productId: product.id })
        .then((res) => (response = res));

      expect(response.status).toBe(201);
      expect(response.body.status).toEqual('failed');
    });

    then(
      'I see error "There is no red apple available right now to buy"',
      () => {
        expect(response.message).toBe(
          'There is no red apple available right now to buy',
        );
      },
    );
  });
});
