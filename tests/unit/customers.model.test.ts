import { Prisma } from '@prisma/client';
import { CreateCustomerArgs } from '../../src/models/customers';
import customersModel from '../../src/models/customers';
import { prismaMock } from '../config';

test('should create new customer ', async () => {
  const customer: CreateCustomerArgs = { name: 'Rich', ssn: '123456789' };

  const expectedCustomer = {
    ...customer,
    id: '1',
    createdAt: new Date(),
  };

  prismaMock.customer.create.mockResolvedValue(expectedCustomer);

  await expect(customersModel.createCustomer(customer)).resolves.toEqual(expectedCustomer);
});

test('should throw an error for unique constraint violation', async () => {
  const customer: CreateCustomerArgs = { name: 'Rich', ssn: '123456789' };

  const error = new Prisma.PrismaClientKnownRequestError('Unique constraint violation', {
    code: 'P2002',
    clientVersion: '1',
  });
  error.meta = { target: 'ssn' };

  prismaMock.customer.create.mockRejectedValue(error);

  await expect(customersModel.createCustomer(customer)).rejects.toThrow(
    `There is a unique constraint violation, a new user cannot be created with this ${JSON.stringify(
      error.meta?.target
    )}`
  );
});
