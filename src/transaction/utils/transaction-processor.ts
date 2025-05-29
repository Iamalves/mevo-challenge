import * as CSV from 'csv-string';
import { TransactionResponse } from '../dto/transaction-reponse';
import { TransactionFile } from '../dto/transaction-file';

export class TransactionProcessor {
  static process(fileTransaction: string): TransactionResponse {
    const MAX_AMOUNT = 5000000;
    const MIN_AMOUNT = 0;
    const parsedCsv = CSV.parse(fileTransaction, { output: 'objects' });

    const response: TransactionResponse = {
      validTransactions: {
        total: 0,
        suspicios: [] as TransactionFile[],
        valid: [] as TransactionFile[],
      },
      invalidTransactions: {
        total: 0,
        duplicated: [] as TransactionFile[],
        negated: [] as TransactionFile[],
      },
    };

    const seenIds = new Set<string>();

    parsedCsv.forEach((transaction) => {
      const { from, to, amount: amountStr } = transaction;
      const amount = Number(amountStr);
      const parsedTransaction: TransactionFile = { from, to, amount };
      const transactionId = `${from}-${to}-${amount}`;

      if (amount === MIN_AMOUNT) {
        response.invalidTransactions.negated.push(parsedTransaction);
      } else if (amount > MAX_AMOUNT) {
        response.validTransactions.suspicios.push(parsedTransaction);
      } else if (seenIds.has(transactionId)) {
        response.invalidTransactions.duplicated.push(parsedTransaction);
      } else {
        seenIds.add(transactionId);
        response.validTransactions.valid.push(parsedTransaction);
      }
    });

    response.validTransactions.total =
      response.validTransactions.suspicios.length +
      response.validTransactions.valid.length;

    response.invalidTransactions.total =
      response.invalidTransactions.negated.length +
      response.invalidTransactions.duplicated.length;

    return response;
  }
}
