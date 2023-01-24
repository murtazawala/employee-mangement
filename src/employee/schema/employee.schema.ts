import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../common/repository/abstract.schema';

@Schema({ versionKey: false })
export class Employee extends AbstractDocument {
  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String })
  last_name: string;

  @Prop({ type: 'Number' })
  phoneNumber: number;

  @Prop({ type: 'String' })
  email: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
