import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Person from '../database/entities/person.entity';
import { Repository } from 'typeorm';
import { ShopGoods } from 'src/database/entities/shop-goods.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Person)
    private readonly shopGoodsRepository: Repository<ShopGoods>,
  ) {}

  async withdrawMoney(id: number, amount: number) {
    try {
      const personFromDbWithWallet = await this.personRepository.findOneBy({
        id,
      });

      personFromDbWithWallet.withdrawMoneyFromWallet(amount);

      return this.personRepository.save(personFromDbWithWallet);
    } catch (e) {
      return { message: e.message };
    }
  }

  async buyProduct(personId: number, productId: number) {
    try {
      const personFromDbWithWallet = await this.personRepository.findOneBy({
        id: personId,
      });

      const productFromDb = await this.shopGoodsRepository.findOneBy({
        id: productId,
      });

      personFromDbWithWallet.buyProductUsingWallet(productFromDb);

      return this.personRepository.save(personFromDbWithWallet);
    } catch (e) {
      return { message: e.message };
    }
  }
}
