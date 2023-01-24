import { Model, Connection } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../common/repository/abstract.repository';
import { Employee } from '../schema/employee.schema';
import { IEmployeeRepository } from 'src/common/repository/abstract.employee.repository';

@Injectable()
export class EmployeeRepository
  extends AbstractRepository<Employee>
  implements IEmployeeRepository
{
  constructor(
    @InjectModel(Employee.name) employeeModel: Model<Employee>,
    @InjectConnection() connection: Connection,
  ) {
    super(employeeModel, connection);
  }
}
