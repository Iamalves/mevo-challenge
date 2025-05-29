import { TransactionFile } from './transaction-file';

export class TransactionResponse {
  validTransactions: {
    total: number;
    suspicios: TransactionFile[];
    valid: TransactionFile[];
  };
  invalidTransactions: {
    total: number;
    duplicated: TransactionFile[];
    negated: TransactionFile[];
  };
}
