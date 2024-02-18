import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from '../controllers/company.controller';
import { CompanyService } from '../services/company.service';
import { Company, CompanySchema } from '../schemas/company.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
