import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class InvalidTransactions {
  @Prop()
  totalOfDuplicated: number;

  @Prop()
  totalOfNegated: number;
}
