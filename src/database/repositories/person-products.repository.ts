import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import PersonProductsEntity from '../entities/person-products.entity';
import PersonProductEntity from '../entities/person-products.entity';

@Injectable()
export class PersonProductsRepository<Model> extends AbstractRepository<
  PersonProductEntity,
  Model
> {
  constructor(dataSource: DataSource) {
    super(PersonProductsEntity, dataSource);
  }
}
