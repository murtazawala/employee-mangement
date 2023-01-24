import { IEmployeeRepository } from 'src/common/repository/abstract.employee.repository';
import { EmployeeRepository } from './repository/employee.repository';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Employee, EmployeeSchema } from './schema/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [
    { provide: IEmployeeRepository, useClass: EmployeeRepository },
    EmployeeService,
  ],
})
export class EmployeeModule {}
