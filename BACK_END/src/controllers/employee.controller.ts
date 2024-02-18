import { Controller, Get, Post, Body, Put, Delete, Param, Query,UseInterceptors,UploadedFile } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage} from 'multer';
import { extname } from 'path';
import { ImportEmployeeDto } from '../dto/import-employee.dto';

@Controller('api/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
 
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('File', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => (Math.round(Math.random() * 16)).toString(16))
          .join('');
        return callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async importEmployees(@UploadedFile() file, @Body() importEmployeeDto: ImportEmployeeDto) {
    // Here you can handle the uploaded file (e.g., parse Excel, CSV, etc.)
    // and use the data to create or update employees
    console.log("coming");
    const employeeData = file.buffer.toString('utf-8');
    console.log(employeeData);
    await this.employeeService.importEmployees(employeeData,importEmployeeDto);
    return { message: 'Import successful' };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: any) {
    return this.employeeService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.employeeService.search(query);
  }
}
  