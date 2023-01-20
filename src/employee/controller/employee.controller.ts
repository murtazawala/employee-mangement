import { CreateEmployeeDto } from './../dto/employee.dto';
import { Types } from 'mongoose';
import { EmployeeService } from './../service/employee.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getEmployees(@Res() res: Response) {
    const result = await this.employeeService.getEmployees();
    res.status(HttpStatus.OK).json({ data: result });
  }

  @Get('/:employeeId')
  async getEmployee(
    @Res() res: Response,
    @Param('employeeid') id: Types.ObjectId,
  ) {
    const result = await this.employeeService.getEmployee(id);
    res.status(HttpStatus.OK).json({ data: result });
  }

  @Post()
  async addEmployee(@Res() res: Response, @Body() employee: CreateEmployeeDto) {
    const result = await this.employeeService.addEmployee(employee);
    res
      .status(HttpStatus.OK)
      .json({ message: 'Employee Created Successfully!!!', data: result });
  }

  @Delete('/:employeeId')
  async deleteEmployee(
    @Res() res: Response,
    @Param('employeeid') id: Types.ObjectId,
  ) {
    const result = await this.employeeService.deleteEmployee(id);
    res
      .status(HttpStatus.OK)
      .json({ message: 'Employee deleted succesfully......', data: result });
  }

  @Put('/:employeeid')
  async updateEmployee(
    @Res() res: Response,
    @Param('employeeid') id: Types.ObjectId,
    @Req() req: Request,
  ) {
    const data = await this.employeeService.updateEmployee(id, req.body);
    res
      .status(HttpStatus.OK)
      .json({ message: 'Employee updated successfully....', data });
  }
}
