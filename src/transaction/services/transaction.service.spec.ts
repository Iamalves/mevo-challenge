import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { Transaction } from '../entities/transaction.entity';
import { MOCK_FILE } from '../__mocks__/csv';
import { VALID_AND_INVALID_TRANSACTIONS } from '../__mocks__/valid-and-invalid-transactions';

describe('TransactionService', () => {
  let service: TransactionService;

  const mockSave = jest.fn().mockResolvedValue(true);

  const mockTransactionModel = Object.assign(
    jest.fn().mockImplementation(() => ({
      save: mockSave,
    })),
    {
      findOne: jest.fn().mockResolvedValue(null),
    },
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process and save a transaction', async () => {
    jest
      .spyOn(
        require('../utils/transaction-processor').TransactionProcessor,
        'process',
      )
      .mockReturnValue({
        VALID_AND_INVALID_TRANSACTIONS,
      });

    const result = await service.process(MOCK_FILE);

    expect(result).toHaveProperty('file');
    expect(mockTransactionModel).toHaveBeenCalledWith(result);
    expect(mockTransactionModel().save).toHaveBeenCalled();
  });

  it('should find a transaction by file', async () => {
    const fileName = 'file.csv';
    const expectedTransaction = {
      file: fileName,
      VALID_AND_INVALID_TRANSACTIONS,
    };
    mockTransactionModel.findOne.mockResolvedValue(expectedTransaction);

    const result = await service.findTransactionByFile(fileName);
    expect(mockTransactionModel.findOne).toHaveBeenCalledWith({
      file: fileName,
    });
    expect(result).toEqual(expectedTransaction);
  });
});
