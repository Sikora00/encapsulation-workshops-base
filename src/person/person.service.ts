import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Person from '../database/entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
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
}
