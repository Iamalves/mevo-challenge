export class TransactionResponse {
  totaolOfValidTransactions: number;
  invalidTransactions: {
    total: number;
    motivos: [];
  };
}
