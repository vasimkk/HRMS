import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CompanyService } from '../services/company.service';

@Controller('api/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Post()
  create(@Body('name') name: string) {
    return this.companyService.create(name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.companyService.update(id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
