import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ValidTransactions } from './valid-transactions.entity';
import { InvalidTransactions } from './invalid-transactions.entity';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ unique: true, index: true })
  file: string;

  @Prop()
  validTransactions: ValidTransactions;

  @Prop()
  invalidTransactions: InvalidTransactions;

  createdAt!: Date;
  updatedAt!: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
