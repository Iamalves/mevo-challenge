import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TransactionFile } from '../dto/transaction-file';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ _id: false })
export class InvalidTransactions {
  @Prop()
  total: number;

  @Prop({ type: [TransactionFile] })
  duplicated: TransactionFile[];

  @Prop({ type: [TransactionFile] })
  negated: TransactionFile[];
}

@Schema({ _id: false })
export class ValidTransactions {
  @Prop()
  total: number;

  @Prop({ type: [TransactionFile] })
  suspicios: TransactionFile[];
}

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: [ValidTransactions] })
  validTransactions: ValidTransactions;

  @Prop({ type: InvalidTransactions })
  invalidTransactions: InvalidTransactions;

  @Prop({ unique: true, index: true })
  file: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
