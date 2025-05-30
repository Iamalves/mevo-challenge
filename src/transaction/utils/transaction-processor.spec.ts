import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Transaction } from '../entities/transaction.entity';
import { TransactionProcessor } from './transaction-processor';

describe('TransactionProcessor', () => {
  let processor: TransactionProcessor;

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
        TransactionProcessor,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    processor = module.get<TransactionProcessor>(TransactionProcessor);
  });

  it('should be defined', () => {
    expect(processor).toBeDefined();
  });
});
