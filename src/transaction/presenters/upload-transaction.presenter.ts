import { TransactionDto } from '../dtos/transaction.dto';

export class UploadTransactionPresenter {
  constructor(private readonly transaction: TransactionDto) {}

  toJSON() {
    return {
      file: this.transaction.file,
      validOperations: {
        valid: this.transaction.validTransactions.valid.length,
        suspicious: this.transaction.validTransactions.suspicios.length,
      },
      invalidSummary: {
        duplicated: this.transaction.invalidTransactions.duplicated,
        negated: this.transaction.invalidTransactions.negated,
      },
    };
  }
}
