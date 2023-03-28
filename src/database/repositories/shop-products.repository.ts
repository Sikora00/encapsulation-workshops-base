import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import ShopProductEntity from '../entities/shop-product.entity';

@Injectable()
export class ShopProductRepository<Model> extends AbstractRepository<
  ShopProductEntity,
  Model
> {
  constructor(dataSource: DataSource) {
    super(ShopProductEntity, dataSource);
  }
}
