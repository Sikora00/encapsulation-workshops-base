import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import PersonEntity from '../database/entities/person.entity';
import Person from './logic/Person';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async withdrawMoney(id: number, amount: number) {
    try {
      const personEntity = await this.personRepository.findOne({
        where: { id },
      });

      if (!personEntity) throw new Error('Person not found.');

      const person = Person.createFromEntity(personEntity);

      person.withdrawMoneyFromWallet(amount);

      const updatedPersonEntity = person.toEntity();
      return await this.personRepository.save(updatedPersonEntity);
    } catch (error) {
      return new HttpException(error.message, 400);
    }
  }
}
