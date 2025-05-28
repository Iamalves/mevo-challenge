import { Injectable } from '@nestjs/common';
import * as CSV from 'csv-string';
import { TransactionResponse } from './dto/transaction-reponse';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import * as fs from 'fs';

@Injectable()
export class TransactionService {
  process(fileTransaction: string): void {
    console.log(fileTransaction);
    const maximumAmountForTransacion = 5000000;
    const parsedCsv = CSV.parse(fileTransaction, ';');
    // const fileTransactionRead =
    console.log(parsedCsv);

    const seen = new Set<String[]>();

    for (let i = 0; i < parsedCsv.length; i++) {
      // parsedCsv[0] =

      const amount = parsedCsv[i + 1][2];
      if (Number(amount) === 0) 'invalid';
      else if (Number(amount) > maximumAmountForTransacion) 'suspeita';
      else if (seen.has(parsedCsv[i + 1])) 'duplicada';
      else {
        seen.add(parsedCsv[i + 1]);
      }
    }

    // return;
  }
}

//Valores Suspeitos: válidas para inclusão no banco de dados.

//Um resumo das operações não validadas (com o motivo da invalidade) deve ser gerado e armazenado no banco de dados juntamente com o nome do arquivo.
