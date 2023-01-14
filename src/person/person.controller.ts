import { Body, Controller, Param, Post } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post('/:id/withdraw-money')
  withdrawMoney(@Param('id') id: string, @Body('amount') amount: number) {
    return this.personService.withdrawMoney(parseInt(id), amount);
  }
}
