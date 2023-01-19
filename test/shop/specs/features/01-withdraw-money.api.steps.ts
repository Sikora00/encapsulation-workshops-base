import { Test, TestingModule } from '@nestjs/testing';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from '../../../../src/transaction/transaction.module';

import * as supertest from 'supertest';
import PersonEntity from '../../../../src/database/entities/person.entity';
import WalletEntity from '../../../../src/database/entities/wallet.entity';

const feature = loadFeature(
  'test/shop/specs/features/01-withdraw-money.feature',
);

defineFeature(feature, (test) => {
  let app: INestApplication;
  let agent;
  let personRepository: Repository<PersonEntity>;
  let walletRepository: Repository<WalletEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TransactionModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'admin',
          password: 'admin',
          database: 'nestjs',
          entities: [PersonEntity, WalletEntity],
          synchronize: false,
        }),
      ],
    }).compile();

    app = await module.createNestApplication();

    agent = supertest.agent(app.getHttpServer());
    await app.init();

    personRepository = module.get('PersonEntityRepository');
    walletRepository = module.get('WalletEntityRepository');
  });

  test('Withdraw money from the wallet', ({ given, when, then, and }) => {
    let response;
    let person: PersonEntity;

    afterAll(async () => {
      await personRepository.delete(person.id);
      await walletRepository.delete(person.wallet.id);
    });

    given('There is a wallet with $5', async () => {
      person = await personRepository.save({
        name: 'Test',
        wallet: {
          balance: 5,
        },
        cash: 0,
      });
    });

    when('I withdraw the money $2 from the wallet', async () => {
      response = await agent
        .post(`/transactions/persons/${person.id}/withdraw-money`)
        .send({ amount: 2 });
    });

    then('I have $2 in money', async () => {
      expect(response.body.cash).toBe(2);
    });

    and('$3 is left in the wallet', () => {
      expect(response.body.wallet.balance).toBe(3);
    });
  });

  test('Can not withdraw money from the wallet if there is not enough founds', ({
    given,
    when,
    then,
  }) => {
    let person: PersonEntity;
    let response;

    afterAll(async () => {
      await personRepository.delete(person.id);
      await walletRepository.delete(person.wallet.id);
    });

    given('There is a wallet with $5', async () => {
      person = await personRepository.save({
        name: 'Test',
        wallet: {
          balance: 5,
        },
        cash: 0,
      });
    });

    when('I withdraw the money $6 from the wallet', async () => {
      response = await agent
        .post(`/transactions/persons/${person.id}/withdraw-money`)
        .send({ amount: 6 });
    });

    then('I see message "You have not enough money in your wallet."', () => {
      expect(response.body.message).toBe(
        'You have not enough money in your wallet.',
      );
    });
  });
});
