import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './transaction/constants/connections';

@Module({
  imports: [TransactionModule, MongooseModule.forRoot(MONGO_CONNECTION)],
})
export class AppModule {}
