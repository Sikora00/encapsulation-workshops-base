import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { defineFeature, loadFeature } from 'jest-cucumber';

import { DataSource, Repository } from 'typeorm';

import * as supertest from 'supertest';

import { PersonController } from '../../../../src/person/person.controller';
import { PersonModule } from '../../../../src/person/person.module';
import Person from '../../../../src/database/entities/person.entity';
import Wallet from '../../../../src/database/entities/wallet.entity';
import Product from '../../../../src/database/entities/product.entity';

const feature = loadFeature(
  'test/shop/specs/features/02-buying-products.feature',
);

defineFeature(feature, (test) => {
  let controller: PersonController;
  let app: INestApplication;
  let agent;
  let personRepository: Repository<Person>;
  let walletRepository: Repository<Wallet>;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PersonModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'admin',
          password: 'admin',
          database: 'nestjs',
          entities: [Person, Wallet, Product],
          synchronize: false,
        }),
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
    app = await module.createNestApplication();

    agent = supertest.agent(app.getHttpServer());
    await app.init();

    personRepository = module.get('PersonRepository');
    walletRepository = module.get('WalletRepository');
    productRepository = module.get('ProductRepository');
  });

  test('Customer by product he is afford to.', ({ given, when, then, and }) => {
    let response;
    let person: Person;
    let product: Product;

    afterAll(async () => {
      await personRepository.delete(person.id);
      await walletRepository.delete(person.wallet.id);
    });

    given('There is a product called "red apple" that cost $1', async () => {
      product = new Product();
      product.name = 'red apple';
      product.price = 1;
      product.quantity = 1;
      product.sku = 'sku';

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
      response = await agent.post(
        `/person/${person.id}/product/${product.id}/buy`,
      );
    });

    then('I have this product on my products list', () => {
      expect(response.body).toMatchObject({
        products: [product],
      });
    });

    and('I have $9 left in the wallet', () => {
      expect(response.body).toMatchObject({ balance: 9 });
    });
  });

  test('Customer can not buy product when he have not enough money', ({
    given,
    when,
    then,
    and,
  }) => {
    let response;
    let person: Person;
    let product: Product;

    afterAll(async () => {
      await personRepository.delete(person.id);
      await walletRepository.delete(person.wallet.id);
      await productRepository.delete(product.id);
    });

    given('There is a product called "yellow pear" that cost $2', async () => {
      product = await productRepository.save({
        name: 'yellow pear',
        price: 2,
        quantity: 1,
        sku: 'sku',
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
      response = await agent.post(
        `/person/${person.id}/product/${product.id}/buy`,
      );
    });

    then('I see message "You have not enough money to buy it"', () => {
      expect(response.body.message).toBe('You have not enough money to buy it');
    });
  });
});
