import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from '../schemas/employee.schema';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import * as xlsx from 'xlsx';
import { ImportEmployeeDto } from 'src/dto/import-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async create(CreateEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(CreateEmployeeDto);
    return createdEmployee.save();
  }

  async update(id: string, updateEmployeeDto: any) {
    console.log(id, updateEmployeeDto);
    return this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    const deletedEmployee = await this.employeeModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedEmployee) {
      return null; // Employee not found
    }
    return { id };
  }

  async search(query: string): Promise<Employee[]> {
    // Perform a case-insensitive search on name, department, and designation fields
    return this.employeeModel
      .find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { department: { $regex: query, $options: 'i' } },
          { designation: { $regex: query, $options: 'i' } },
        ],
      })
      .exec();
  }

  async importEmployees(employeeData: any[], importEmployeeDto: ImportEmployeeDto): Promise<void> {
     // Parse the Excel file data
     const workbook = xlsx.read(employeeData, { type: 'buffer' });
     const sheetName = workbook.SheetNames[0];
     const sheet = workbook.Sheets[sheetName];
     
     // Convert the sheet data to JSON
     const employeeJsonData = xlsx.utils.sheet_to_json(sheet);
     console.error(employeeJsonData);
    await this.employeeModel.create(employeeJsonData);
  }
}
