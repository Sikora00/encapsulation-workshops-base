import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import PersonEntity from '../database/entities/person.entity';
import WalletEntity from '../database/entities/wallet.entity';
import PersonProductEntity from '../database/entities/person-products.entity';
import ProductEntity from '../database/entities/product.entity';
import ToBuyProduct from './logic/ToBuyProduct';
import { SavePersonAndProduct } from '../database/transactions/save-person-and-product.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(PersonProductEntity)
    private readonly personProductRepository: Repository<PersonProductEntity>,
    private readonly savePersonAndProduct: SavePersonAndProduct,
  ) {}

  async withdrawMoney(id: number, amount: number) {
    const personEntity = await this.personRepository.findOne({
      where: { id },
    });

    if (!personEntity) {
      throw new Error('Person not found.');
    }

    const person = personEntity.toModel();

    person.withdrawMoneyFromWallet(amount);

    const updatedPersonEntity = new PersonEntity();
    updatedPersonEntity.toEntity(person);

    return await this.personRepository.save(updatedPersonEntity);
  }

  async buyProduct(personId: number, productId: number, amount: number) {
    const personEntity = await this.personRepository.findOne({
      where: { id: personId },
    });

    if (!personEntity) throw new Error('Person not found.');

    const productEntity = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!productEntity) throw new Error('Product not found.');

    const wallet = personEntity.wallet.toModel();

    const toBuyProduct = new ToBuyProduct(
      productEntity.name,
      productEntity.stock,
      productEntity.cost,
    );

    const purchasedProduct = toBuyProduct.sell(amount);
    purchasedProduct.executeTransaction(wallet);
    personEntity.wallet = WalletEntity.toEntity(wallet);

    return await this.savePersonAndProduct.run({
      person: personEntity.toModel(),
      purchasedProduct: purchasedProduct,
      product: productEntity,
    });
  }
}
