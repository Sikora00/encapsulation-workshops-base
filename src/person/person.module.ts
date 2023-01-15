import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Person from '../database/entities/person.entity';
import Product from '../database/entities/product.entity';
import Wallet from '../database/entities/wallet.entity';

@Module({
  providers: [PersonService],
  imports: [TypeOrmModule.forFeature([Product, Person, Wallet])],
  controllers: [PersonController],
})
export class PersonModule {}
