import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import ShopEntity from '../entities/shop.entity';

@Injectable()
export class ShopRepository<Model> extends AbstractRepository<
  ShopEntity,
  Model
> {
  constructor(dataSource: DataSource) {
    super(ShopEntity, dataSource);
  }
}
