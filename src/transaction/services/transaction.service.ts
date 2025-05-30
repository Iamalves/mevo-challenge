import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionProcessor } from '../utils/transaction-processor';
import { Transaction } from '../entities/transaction.entity';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionSchema: Model<Transaction>,
  ) {}

  async process(fileTransaction: Express.Multer.File): Promise<TransactionDto> {
    try {
      const buffer = fileTransaction.buffer.toString();
      const response = TransactionProcessor.process(buffer);

      const responseWithFileName: TransactionDto = {
        ...response,
        file: `${Date.now()}-${fileTransaction.originalname}`,
      };

      const createdTransaction = new this.transactionSchema(
        responseWithFileName,
      );
      await createdTransaction.save();

      return responseWithFileName;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findTransactionByFile(file: string): Promise<Transaction | null> {
    const response = await this.transactionSchema.findOne({ file });
    return response;
  }
}
