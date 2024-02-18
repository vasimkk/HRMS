import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ required: true })
  employeeNo: String;

  @Prop({ required: true })
  cardNo: String;

  @Prop({ required: true })
  fullName: String;

  @Prop({ required: true })
  fatherName: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  presentAddress: String;

  @Prop({ required: true })
  permanentAddress: String;

  @Prop({ required: true })
  city: String;

  @Prop({ required: true })
  pincode: String;

  @Prop({ required: true })
  companyName: String;
}

export type EmployeeDocument = Employee & Document;
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
