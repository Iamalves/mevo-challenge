import { TransactionFile } from './transaction-file.dto';

export class TransactionDto {
  file: string;
  validTransactions: {
    total: number;
    suspicios: TransactionFile[];
    valid: TransactionFile[];
  };
  invalidTransactions: {
    duplicated: number;
    negated: number;
  };
}
