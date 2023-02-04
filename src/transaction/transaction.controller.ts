import { Body, Controller, HttpException, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/persons/:personId/withdraw-money')
  async withdrawMoney(
    @Param('personId') personId: string,
    @Body('amount') amount: number,
  ) {
    try {
      return await this.transactionService.withdrawMoney(
        parseInt(personId),
        amount,
      );
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Post('/persons/:personId/products/:productId/buy')
  async buyProduct(
    @Param('personId') personId: string,
    @Param('productId') productId: string,
    @Body('amount') amount: number,
  ) {
    try {
      return await this.transactionService.buyProduct(
        parseInt(personId),
        parseInt(productId),
        amount,
      );
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
