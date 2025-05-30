import { Transaction } from '../entities/transaction.entity';

export class FindTransactionPresenter {
  constructor(private transaction: Transaction) {}

  toJSON() {
    return {
      file: this.transaction.file,
      validTransactions: {
        total: this.transaction.validTransactions?.total ?? 0,
        suspicios: this.transaction.validTransactions?.suspicios?.length ?? 0,
        valid: this.transaction.validTransactions?.valid?.length ?? 0,
      },
      invalidTransactions: {
        duplicated:
          this.transaction.invalidTransactions?.totalOfDuplicated ?? 0,
        negated: this.transaction.invalidTransactions?.totalOfNegated ?? 0,
      },
    };
  }
}
