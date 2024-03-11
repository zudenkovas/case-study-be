import { BankAccount } from '@prisma/client';
import { prisma } from '../commons';

export type CreateBankAccountArgs = Pick<BankAccount, 'name' | 'number' | 'currency' | 'customerId'>;

const createBankAccount = async (data: CreateBankAccountArgs) => {
  return await prisma.bankAccount.create({ data });
};

export default { createBankAccount };
