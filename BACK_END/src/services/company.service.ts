import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async create(name: string): Promise<Company> {
    const createdCompany = new this.companyModel({ name });
    return createdCompany.save();
  }

  async update(id: string, name: string): Promise<Company> {
    return this.companyModel.findByIdAndUpdate(id, { name }, { new: true }).exec();
  }

  async remove(id: string): Promise<{ id: string }> {
    const deletedCompany = await this.companyModel.findByIdAndDelete(id).exec();
    if (!deletedCompany) {
      return null; // Company not found
    }
    return { id };
  }
}
