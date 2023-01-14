import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';

const feature = loadFeature('shop/specs/features/01-withdraw-money.feature');

const setUpData = () => {
  //TODO: implement
};

defineFeature(feature, (test) => {
  const id = 1;

  const agent = supertest('http://localhost:3000');

  beforeEach(() => {
    setUpData();
  });

  test('Withdraw money from the wallet', ({ given, when, then, and }) => {
    let response;

    given('There is a wallet with $5', () => {
      // pass
    });

    when('I withdraw the money $2 from the wallet', async () => {
      await agent.post(`/person/${id}/withdraw-money`).send({ amount: 2 });
    });

    then('I have $2 in money', async () => {
      response = await agent.get(`/person/${id}/cash`);
    });

    and('$3 is left in the wallet', () => {
      expect(response.body.walletBalance).toBe(3);
      expect(response.body.cash).toBe(2);
    });
  });

  test('Can not withdraw money from the wallet if there is not enough founds', ({
    given,
    when,
    then,
  }) => {
    let error: Error;
    given('There is a wallet with $5', () => {
      setUpData();
    });

    when('I withdraw the money $6 from the wallet', async () => {
      try {
        await agent.post(`/person/${id}/withdraw-money`).send({ amount: 6 });
      } catch (e) {
        error = e.message;
      }
    });

    then('I see message "You have not enough money in your wallet."', () => {
      expect(error).toBe('You have not enough money in your wallet.');
    });
  });
});
