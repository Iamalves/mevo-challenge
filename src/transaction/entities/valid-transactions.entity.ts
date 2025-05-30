import { Prop, Schema } from '@nestjs/mongoose';
import { TransactionFile } from '../dtos/transaction-file.dto';

@Schema({ _id: false })
export class ValidTransactions {
  @Prop()
  total: number;

  @Prop({ type: [TransactionFile] })
  valid: TransactionFile[];

  @Prop({ type: [TransactionFile] })
  suspicios: TransactionFile[];
}
