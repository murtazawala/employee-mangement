import { CreateEmployeeDto } from './../dto/employee.dto';
import { Types } from 'mongoose';
import { EmployeeService } from './../service/employee.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getEmployees() {
    return await this.employeeService.getEmployees();
  }

  @Get('/:employeeId')
  async getEmployee(@Param('employeeid') id: Types.ObjectId) {
    return await this.employeeService.getEmployee(id);
  }

  @Post()
  async addEmployee(@Body() employee: CreateEmployeeDto) {
    return await this.employeeService.addEmployee(employee);
  }

  @Delete('/:employeeId')
  async deleteEmployee(@Param('employeeid') id: Types.ObjectId) {
    return await this.employeeService.deleteEmployee(id);
  }

  @Put('/:employeeid')
  async updateEmployee(
    @Param('employeeid') id: Types.ObjectId,
    @Body() body: CreateEmployeeDto,
  ) {
    return await this.employeeService.updateEmployee(id, body);
  }
}
