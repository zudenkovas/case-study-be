import customer, { type CreateCustomerArgs } from '../models/customers';

const saveCustomer = async (data: CreateCustomerArgs) => {
  return await customer.createCustomer(data);
};

const getCustomers = async () => {
  return await customer.getCustomers();
};

const getCustomerById = async (id: string) => {
  return await customer.getCustomerById(id);
};

const deleteCustomer = async (id: string) => {
  return await customer.deleteCustomer(id);
};

export default { saveCustomer, getCustomers, getCustomerById, deleteCustomer };
