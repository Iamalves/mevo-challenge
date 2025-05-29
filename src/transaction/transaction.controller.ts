import {
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePresenter } from './assets.presenter';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000000000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return await this.transactionService.process(file);
  }

  @Get(':fileName')
  async findOne(@Param('fileName') fileName: string) {
    const file = await this.transactionService.findTransactionByFile(fileName);

    if (file) {
      return new FilePresenter(file);
    }
  }
}
