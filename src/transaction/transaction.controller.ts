import { Body, Controller, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly personService: TransactionService) {}

  @Post('/persons/:personId/withdraw-money')
  withdrawMoney(
    @Param('personId') personId: string,
    @Body('amount') amount: number,
  ) {
    return this.personService.withdrawMoney(parseInt(personId), amount);
  }
}
