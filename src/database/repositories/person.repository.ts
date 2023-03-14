import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import PersonEntity from '../entities/person.entity';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class PersonRepository<Model> extends AbstractRepository<
  PersonEntity,
  Model
> {
  constructor(dataSource: DataSource) {
    super(PersonEntity, dataSource);
  }
}
