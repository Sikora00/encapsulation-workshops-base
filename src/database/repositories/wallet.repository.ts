import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import WalletEntity from '../entities/wallet.entity';

@Injectable()
export class WalletRepository<Model> extends AbstractRepository<
  WalletEntity,
  Model
> {
  constructor(dataSource: DataSource) {
    super(WalletEntity, dataSource);
  }
}
