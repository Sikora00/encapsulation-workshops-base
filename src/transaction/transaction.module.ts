import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PersonEntity from '../database/entities/person.entity';
import WalletEntity from '../database/entities/wallet.entity';

@Module({
  providers: [TransactionService],
  imports: [TypeOrmModule.forFeature([PersonEntity, WalletEntity])],
  controllers: [TransactionController],
})
export class TransactionModule {}
