import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Person from '../database/entities/person.entity';
import Product from '../database/entities/product.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async withdrawMoney(id: number, amount: number) {
    try {
      const personFromDbWithWallet = await this.personRepository.findOneBy({
        id,
      });

      personFromDbWithWallet.withdrawMoneyFromWallet(amount);

      return this.personRepository.save(personFromDbWithWallet);
    } catch (e) {
      return { message: e.message };
    }
  }

  async buyProduct(personId: number, productId: number) {
    try {
      const personFromDbWithWallet = await this.personRepository.findOneBy({
        id: personId,
      });

      const productFromDb = await this.productRepository.findOneBy({
        id: productId,
      });

      personFromDbWithWallet.buyProductUsingWallet(productFromDb);

      return this.personRepository.save(personFromDbWithWallet);
    } catch (e) {
      console.log(e);
      return { message: e.message };
    }
  }
}
