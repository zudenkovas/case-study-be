import BankAccountModel, { CreateBankAccountArgs } from '../models/bank-accounts';

const saveCustomerBankAccount = async (data: CreateBankAccountArgs) => {
  return await BankAccountModel.createBankAccount(data);
};

export default { saveCustomerBankAccount };
