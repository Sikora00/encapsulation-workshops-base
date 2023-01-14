import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Person from '../database/entities/person.entity';
import Wallet from '../database/entities/wallet.entity';
import { PersonProducts } from '../database/entities/person-products.entity';
import Product from '../database/entities/person.entity';

@Module({
  providers: [PersonService],
  imports: [
    TypeOrmModule.forFeature([Person, Wallet, PersonProducts, Product]),
  ],
  controllers: [PersonController],
})
export class PersonModule {}
