import {
  BadRequestException,
  Controller,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindTransactionPresenter } from '../presenters/find-transaction.presenter';
import { ALLOW_FILE_TYPES } from '../constants/allowed-file-types';
import { UploadTransactionPresenter } from '../presenters/upload-transaction.presenter';

@Controller('/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000000000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!ALLOW_FILE_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid mimetype: ${file.mimetype}`);
    }

    const transaction = await this.transactionService.process(file);
    return new UploadTransactionPresenter(transaction);
  }

  @Get(':fileName')
  async findOne(@Param('fileName') fileName: string) {
    const file = await this.transactionService.findTransactionByFile(fileName);

    if (!file) {
      throw new NotFoundException(`Transaction file "${fileName}" not found`);
    }

    return new FindTransactionPresenter(file);
  }
}
