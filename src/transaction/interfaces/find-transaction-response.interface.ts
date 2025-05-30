export interface FindTransactionResponse {
  file: string;
  validTransactions: {
    total: number;
    suspicios: number;
    valid: number;
  };
  invalidTransactions: {
    duplicated: number;
    negated: number;
  };
}
