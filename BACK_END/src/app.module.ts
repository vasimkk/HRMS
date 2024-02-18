import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { EmployeeModule } from './modules/employee.module';
import { CompanyModule } from './modules/company.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://hrms:HVgSJNOZx2BODP7k@cluster0.dreeyoo.mongodb.net/hrms?retryWrites=true&w=majority'),
   // MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    EmployeeModule,
    CompanyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
