import { Model, Connection } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { AbstractRepository } from 'src/common/repository/abstract.repository';
import { Employee } from '../schema/employee.schema';

@Injectable()
export class EmployeeRepository extends AbstractRepository<Employee> {
  constructor(
    @InjectModel(Employee.name) employeeModel: Model<Employee>,
    @InjectConnection() connection: Connection,
  ) {
    super(employeeModel, connection);
  }
}
