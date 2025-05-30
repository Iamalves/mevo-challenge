import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from '../services/transaction.service';
import { getModelToken } from '@nestjs/mongoose';
import { Transaction } from '../entities/transaction.entity';
import { VALID_AND_INVALID_TRANSACTIONS } from '../__mocks__/valid-and-invalid-transactions';

describe('TransactionController', () => {
  let controller: TransactionController;

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
      controllers: [TransactionController],
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process and save a transaction', async () => {
    const mockFile = {
      buffer: Buffer.from('mock content'),
      originalname: 'file.csv',
      mimetype: 'text/csv',
    } as Express.Multer.File;

    jest
      .spyOn(
        require('../utils/transaction-processor').TransactionProcessor,
        'process',
      )
      .mockReturnValue(VALID_AND_INVALID_TRANSACTIONS);

    const result = await controller.uploadFile(mockFile);

    expect(result).toHaveProperty('transaction');

    const expectedSavedObject = {
      ...VALID_AND_INVALID_TRANSACTIONS,
      file: expect.stringMatching(/file\.csv$/),
    };

    expect(mockTransactionModel).toHaveBeenCalledWith(expectedSavedObject);
    expect(mockTransactionModel().save).toHaveBeenCalled();
  });
});
