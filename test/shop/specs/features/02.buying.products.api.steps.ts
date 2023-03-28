import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';

import { defineFeature, loadFeature } from 'jest-cucumber';

import { Repository } from 'typeorm';

import * as supertest from 'supertest';

import PersonEntity from '../../../../src/database/entities/person.entity';
import WalletEntity from '../../../../src/database/entities/wallet.entity';
import { TransactionModule } from '../../../../src/transaction/transaction.module';
import PersonProductEntity from '../../../../src/database/entities/person-products.entity';
import ProductEntity from '../../../../src/database/entities/product.entity';
import setupSqliteModule from './utils/db/sqlite';

const feature = loadFeature(
  'test/shop/specs/features/02-buying-products.feature',
);

defineFeature(feature, (test) => {
  let app: INestApplication;
  let agent;
  let personRepository: Repository<PersonEntity>;
  let productRepository: Repository<ProductEntity>;
  let personProductRepository: Repository<PersonProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TransactionModule,
        setupSqliteModule([
          WalletEntity,
          PersonEntity,
          ProductEntity,
          PersonProductEntity,
        ]),
      ],
    }).compile();

    app = await module.createNestApplication();

    agent = supertest.agent(app.getHttpServer());
    await app.init();

    personRepository = module.get('PersonEntityRepository');
    productRepository = module.get('ProductEntityRepository');
    personProductRepository = module.get('PersonProductEntityRepository');
  });

  test('Customer by product he is afford to.', ({ given, when, then, and }) => {
    let response;
    let person: PersonEntity;
    let product: ProductEntity;

    afterAll(async () => {
      await personRepository.delete(person.id);
      await productRepository.delete(product.id);
      await personProductRepository.clear();
    });

    given('There is a product called "red apple" that cost $1', async () => {
      product = new ProductEntity();
      product.name = 'red apple';
      product.cost = 1;

      product = await productRepository.save(product);
    });

    and('I am "John Doe"', async () => {
      person = await personRepository.save({
        name: 'John Doe',
        wallet: {
          balance: 10,
        },
        cash: 0,
      });
      expect(person).toMatchObject({ name: 'John Doe' });
    });

    and('I have $10 in my wallet', () => {
      expect(person.wallet).toMatchObject({ balance: 10 });
    });

    when('I buy this product', async () => {
      response = await agent
        .post(
          `/transactions/wallets/${person.wallet.id}/products/${product.id}/buy`,
        )
        .send({
          amount: 1,
        });
    });

    then('I have this product on my products list', () => {
      expect(response.body).toMatchObject({
        personId: person.id,
        productId: product.id,
      });
    });

    and('I have $9 left in the wallet', () => {
      expect(response.body.person.wallet).toMatchObject({ balance: 9 });
    });
  });

  test('Customer can not buy product when he have not enough money', ({
    given,
    when,
    then,
    and,
  }) => {
    let response;
    let person: PersonEntity;
    let product: ProductEntity;

    given('There is a product called "yellow pear" that cost $2', async () => {
      product = await productRepository.save({
        name: 'yellow pear',
        cost: 2,
        stock: 1,
      });
    });

    and('I am "John Doe"', async () => {
      person = await personRepository.save({
        name: 'John Doe',
        wallet: {
          balance: 1,
        },
        cash: 0,
      });
    });

    and('I have $1 in my wallet', () => {
      expect(person.wallet).toMatchObject({ balance: 1 });
    });

    when('I buy this product', async () => {
      response = await agent
        .post(
          `/transactions/wallets/${person.wallet.id}/products/${product.id}/buy`,
        )
        .send({
          amount: 1,
        });
    });

    then('I see message "You have not enough money to buy it"', () => {
      expect(response.body.message).toBe('You have not enough money to buy it');
    });
  });
});
