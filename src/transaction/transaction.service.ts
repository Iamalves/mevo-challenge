import { Injectable } from '@nestjs/common';
import { TransactionResponse } from './dto/transaction-reponse';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionProcessor } from './utils/transaction-processor';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionSchema: Model<Transaction>,
  ) {}

  async process(
    fileTransaction: Express.Multer.File,
  ): Promise<TransactionResponse> {
    try {
      const buffer = fileTransaction.buffer.toString();
      const response = TransactionProcessor.process(buffer);

      const createdTransaction = new this.transactionSchema({
        ...response,
        file: fileTransaction.originalname,
      });
      await createdTransaction.save();

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findTransactionByFile(file: string) {
    const reponse = await this.transactionSchema.findOne({ file });
    return reponse;
  }
}
