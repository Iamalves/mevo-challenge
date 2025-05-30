import * as CSV from 'csv-string';
import { TransactionDto } from '../dtos/transaction.dto';
import { TransactionFile } from '../dtos/transaction-file.dto';

export class TransactionProcessor {
  static process(fileTransaction: string): TransactionDto {
    const MAX_AMOUNT = 5000000;
    const MIN_AMOUNT = 0;
    const parsedCsv = CSV.parse(fileTransaction, { output: 'objects' });

    const response: TransactionDto = {
      validTransactions: {
        total: 0,
        suspicios: [] as TransactionFile[],
        valid: [] as TransactionFile[],
      },
      invalidTransactions: {
        duplicated: 0,
        negated: 0,
      },
      file: '',
    };

    const seenIds = new Set<string>();

    parsedCsv.forEach((transaction) => {
      const { from, to, amount: amountStr } = transaction;
      const amount = Number(amountStr);
      const parsedTransaction: TransactionFile = { from, to, amount };
      const transactionId = `${from}-${to}-${amount}`;

      if (amount < MIN_AMOUNT) {
        response.invalidTransactions.negated++;
      } else if (amount > MAX_AMOUNT) {
        response.validTransactions.suspicios.push(parsedTransaction);
      } else if (seenIds.has(transactionId)) {
        response.invalidTransactions.duplicated++;
      } else {
        seenIds.add(transactionId);
        response.validTransactions.valid.push(parsedTransaction);
      }
    });

    response.validTransactions.total =
      response.validTransactions.suspicios.length +
      response.validTransactions.valid.length;

    return response;
  }
}
