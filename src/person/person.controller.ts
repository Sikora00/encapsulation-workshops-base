import { Body, Controller, Param, Post } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post('/:personId/withdraw-money')
  withdrawMoney(
    @Param('personId') personId: string,
    @Body('amount') amount: number,
  ) {
    return this.personService.withdrawMoney(parseInt(personId), amount);
  }

  @Post('/:personId/product/:productId/buy')
  buyProduct(
    @Param('personId') personId: string,
    @Param('personId') productId: string,
  ) {
    return this.personService.buyProduct(
      parseInt(personId),
      parseInt(productId),
    );
  }
}
