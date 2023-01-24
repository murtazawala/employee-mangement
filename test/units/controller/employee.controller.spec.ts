import { MockEmployeeRepository } from '../../mock.employee.repository';
import { IEmployeeRepository } from '../../../src/common/repository/abstract.employee.repository';
import { EmployeeService } from '../../../src/employee/service/employee.service';
import { Employee } from '../../../src/employee/schema/employee.schema';
import { Types } from 'mongoose';
import { EmployeeController } from '../../../src/employee/controller/employee.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('testing employee controller', () => {
  let mockController: EmployeeController;
  let mockService: EmployeeService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        { provide: IEmployeeRepository, useClass: MockEmployeeRepository },
        EmployeeService,
      ],
    }).compile();
    mockController = app.get<EmployeeController>(EmployeeController);
    mockService = app.get<EmployeeService>(EmployeeService);
  });

  describe('addEmployee', () => {
    it('should return the saved employee', async () => {
      const result: Employee = {
        _id: new Types.ObjectId(),
        first_name: 'john',
        last_name: 'doe',
        email: 'doe@example.com',
        phoneNumber: 123,
        created_at: new Date(),
      };

      jest
        .spyOn(mockService, 'addEmployee')
        .mockImplementation(
          async (): Promise<Employee> => Promise.resolve(result),
        );

      expect(
        await mockController.addEmployee({
          first_name: 'john',
          last_name: 'doe',
          email: 'doe@example.com',
          phoneNumber: 123,
        }),
      ).toBe(result);
    });
  });

  describe('getEmployees', () => {
    it('should return the list of all Employees', async () => {
      const result: Employee[] = [
        {
          _id: new Types.ObjectId(),
          first_name: 'john',
          last_name: 'doe',
          email: 'doe@example.com',
          phoneNumber: 123,
          created_at: new Date(),
        },
      ];

      jest
        .spyOn(mockService, 'getEmployees')
        .mockImplementation(
          async (): Promise<Employee[]> => Promise.resolve(result),
        );

      expect(await mockController.getEmployees()).toBe(result);
    });
  });

  describe('getEmployee', () => {
    it('should return the given Employee', async () => {
      const result: Employee = {
        _id: new Types.ObjectId(),
        first_name: 'john',
        last_name: 'doe',
        email: 'doe@example.com',
        phoneNumber: 123,
        created_at: new Date(),
      };

      jest
        .spyOn(mockService, 'getEmployee')
        .mockImplementation(
          async (): Promise<Employee> => Promise.resolve(result),
        );

      expect(await mockController.getEmployee(new Types.ObjectId())).toBe(
        result,
      );
    });
  });

  describe('deleteEmployee', () => {
    it('should return the Employee after deleting', async () => {
      const result: Employee = {
        _id: new Types.ObjectId(),
        first_name: 'john',
        last_name: 'doe',
        email: 'doe@example.com',
        phoneNumber: 123,
        created_at: new Date(),
      };

      jest
        .spyOn(mockService, 'deleteEmployee')
        .mockImplementation(
          async (): Promise<Employee> => Promise.resolve(result),
        );

      expect(await mockController.deleteEmployee(new Types.ObjectId())).toBe(
        result,
      );
    });
  });

  describe('updateEmployee', () => {
    it('should return the Employee after updating it', async () => {
      const result: Employee = {
        _id: new Types.ObjectId(),
        first_name: 'john',
        last_name: 'doe',
        email: 'doe@example.com',
        phoneNumber: 123,
        created_at: new Date(),
      };

      jest
        .spyOn(mockService, 'updateEmployee')
        .mockImplementation(
          async (): Promise<Employee> => Promise.resolve(result),
        );

      expect(
        await mockController.updateEmployee(new Types.ObjectId(), result),
      ).toBe(result);
    });
  });
});
