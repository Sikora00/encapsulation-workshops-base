import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import ProductEntity from '../entities/product.entity';

@Injectable()
export class ProductRepository<Model> extends AbstractRepository<
  ProductEntity,
  Model
> {
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource);
  }
}
