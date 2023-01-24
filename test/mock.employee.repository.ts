import { IEmployeeRepository } from 'src/common/repository/abstract.employee.repository';
import { Employee } from 'src/employee/schema/employee.schema';
import { NotFoundException, NotImplementedException } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';

export class MockEmployeeRepository implements IEmployeeRepository {
  private employees: Employee[];
  constructor() {
    this.employees = [
      {
        _id: new Types.ObjectId(),
        first_name: 'first 0',
        last_name: 'last 0',
        email: 'designation@gmail.com',
        phoneNumber: 123,
        created_at: new Date(),
      },
      {
        _id: new Types.ObjectId(),
        first_name: 'first 1',
        last_name: 'last 1',
        email: 'designation1@gmail.com',
        phoneNumber: 123,
        created_at: new Date(),
      },
      {
        _id: new Types.ObjectId(),
        first_name: 'first 2',
        last_name: 'last 2',
        email: 'designation2@gmail.com',
        phoneNumber: 123,
        created_at: new Date(),
      },
    ];
  }
  async create(document: Omit<Employee, '_id'>): Promise<Employee> {
    const _id = new Types.ObjectId();
    const newEmp = { ...document, _id };
    this.employees.push(newEmp);
    return newEmp;
  }
  async findOne(filterQuery: FilterQuery<Employee>): Promise<Employee> {
    const { _id } = filterQuery;
    const employee = this.employees.find((e) => e._id.equals(_id));
    if (!employee) {
      throw new NotFoundException('Document not found');
    }
    return employee;
  }
  async remove(filterQuery: FilterQuery<Employee>): Promise<Employee> {
    const { _id } = filterQuery;
    const employee = this.employees.find((e) => e._id.equals(_id));
    if (!employee) {
      throw new NotFoundException('Document not found');
    }
    const index = this.employees.indexOf(employee, 0);
    this.employees.splice(index, 1);
    return employee;
  }
  async update(
    filterQuery: FilterQuery<Employee>,
    document: Omit<Employee, '_id'>,
  ): Promise<Employee> {
    const { _id } = filterQuery;
    const employee = this.employees.find((e) => e._id.equals(_id));
    if (!employee) {
      throw new NotFoundException('Document not found');
    }
    const index = this.employees.indexOf(employee, 0);
    const newEmp: Employee = {
      _id: _id,
      first_name: document.first_name,
      last_name: document.last_name,
      email: document.email,
      phoneNumber: document.phoneNumber,
      created_at: employee.created_at,
    };
    this.employees[index] = newEmp;
    return newEmp;
  }
  async find(): Promise<Employee[]> {
    return Promise.resolve(this.employees);
  }
}
