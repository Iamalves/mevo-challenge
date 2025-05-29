import {
  InvalidTransactions,
  Transaction,
  ValidTransactions,
} from './entities/transaction.entity';

export class FilePresenter {
  constructor(private transaction: Transaction) {}

  toJSON() {
    return {
      fileName: this.transaction.file,
      InvalidTransactions: this.transaction.invalidTransactions,
      ValidTransactions: this.transaction.validTransactions,
    };
  }
}
