import { Employee } from 'src/employee/schema/employee.schema';
import { FilterQuery, UpdateQuery } from 'mongoose';

export abstract class IEmployeeRepository {
  abstract create(
    document: Omit<Employee, '_id' | 'created_at'>,
  ): Promise<Employee>;

  abstract findOne(filterQuery: FilterQuery<Employee>): Promise<Employee>;

  abstract find(filterQuery: FilterQuery<Employee>): Promise<Employee[]>;

  abstract update(
    filterQuery: FilterQuery<Employee>,
    updateQuery: UpdateQuery<Employee>,
  ): Promise<Employee>;

  abstract remove(filterQuery: FilterQuery<Employee>): Promise<Employee>;
}
