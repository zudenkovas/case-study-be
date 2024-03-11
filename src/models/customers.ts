import { Customer, Prisma } from '@prisma/client';
import { prisma } from '../commons';

export type CreateCustomerArgs = Pick<Customer, 'name' | 'ssn'>;

const createCustomer = async (data: CreateCustomerArgs) => {
  try {
    return await prisma.customer.create({
      data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error(
          `There is a unique constraint violation, a new user cannot be created with this ${JSON.stringify(
            error.meta?.target
          )}`
        );
      }
    }
  }
};

const getCustomerBySsn = async (ssn: string) => {
  return await prisma.customer.findFirst({
    where: {
      ssn,
    },
  });
};

const getCustomers = async () => {
  return await prisma.customer.findMany({ include: { bankAccounts: true } });
};

const getCustomerById = async (id: string) => {
  return await prisma.customer.findUnique({
    where: {
      id,
    },
    include: { bankAccounts: true },
  });
};

const deleteCustomer = async (id: string) => {
  return await prisma.customer.delete({
    where: {
      id,
    },
  });
};

export default { createCustomer, getCustomers, getCustomerById, deleteCustomer, getCustomerBySsn };
