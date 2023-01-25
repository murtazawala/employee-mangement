import { IEmployeeRepository } from '../../common/repository/abstract.employee.repository';
import { CreateEmployeeDto } from './../dto/employee.dto';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  public async getEmployees() {
    return await this.employeeRepository.find({});
  }

  public async getEmployee(id: Types.ObjectId) {
    const res = await this.employeeRepository.findOne(id);
    return res;
  }

  public async addEmployee(employee: CreateEmployeeDto) {
    return await this.employeeRepository.create(employee);
  }

  public async updateEmployee(id: Types.ObjectId, employee: CreateEmployeeDto) {
    return await this.employeeRepository.update(id, employee);
  }

  public async deleteEmployee(id: Types.ObjectId) {
    return await this.employeeRepository.remove(id);
  }
}
