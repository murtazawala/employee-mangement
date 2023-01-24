import { NotFoundException } from '@nestjs/common';
import { IEmployeeRepository } from '../../../src/common/repository/abstract.employee.repository';
import { Types } from 'mongoose';
import { Test } from '@nestjs/testing';
import { EmployeeService } from '../../../src/employee/service/employee.service';
import { MockEmployeeRepository } from '../../mock.employee.repository';
import { CreateEmployeeDto } from '../../../src/employee/dto/employee.dto';

describe('testing employee service', () => {
  let mockService: EmployeeService;
  const createEmployee: CreateEmployeeDto = {
    first_name: 'test',
    last_name: 'test',
    phoneNumber: 123,
    email: 'test@test.com',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: IEmployeeRepository, useClass: MockEmployeeRepository },
        EmployeeService,
      ],
    }).compile();

    mockService = module.get<EmployeeService>(EmployeeService);
  });

  describe('addEmployee', () => {
    it('should save and return the employee', async () => {
      const result = await mockService.addEmployee(createEmployee);
      expect(result._id).toBeInstanceOf(Types.ObjectId);
      const check: CreateEmployeeDto = {
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        phoneNumber: result.phoneNumber,
      };
      expect(check).toEqual(createEmployee);
    });
  });

  describe('getEmployee', () => {
    it('should return the corresponding saved employee', async () => {
      const result = await mockService.addEmployee(createEmployee);
      const article = await mockService.getEmployee(result._id);
      const check: CreateEmployeeDto = {
        first_name: article.first_name,
        last_name: article.last_name,
        email: article.email,
        phoneNumber: article.phoneNumber,
      };
      expect(check).toEqual(createEmployee);
    });
    it('should return null', async () => {
      try {
        await mockService.getEmployee(new Types.ObjectId());
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getEmployees', () => {
    it('should return the saved employees', async () => {
      const article = await mockService.getEmployees();
      expect(article).toBeDefined();
      expect(article).toHaveLength(3);
    });
  });

  describe('updateEmployee', () => {
    it('should update, save and return the employee', async () => {
      const result = await mockService.addEmployee(createEmployee);
      const newEmployee: CreateEmployeeDto = {
        first_name: 'update',
        last_name: 'update',
        email: 'update@update.com',
        phoneNumber: 123,
      };
      const updated = await mockService.updateEmployee(result._id, newEmployee);
      expect(updated._id).toEqual(result._id);
      const check: CreateEmployeeDto = {
        first_name: updated.first_name,
        last_name: updated.last_name,
        email: updated.email,
        phoneNumber: updated.phoneNumber,
      };
      expect(check).toEqual(newEmployee);
    });
  });

  describe('deleteEmployee', () => {
    it('should delete and return the saved employee', async () => {
      const res = await mockService.addEmployee(createEmployee);
      const ans = await mockService.deleteEmployee(res._id);
      expect(ans).toEqual(res);
    });
  });
});
