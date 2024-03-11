import { Request, Response, NextFunction } from 'express';
import { CreateBankAccountArgs } from '../models/bank-accounts';
import bankAccountServices from '../services/bank-accounts';

export const saveCustomerBankAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bankAccount: CreateBankAccountArgs = {
      name: req.body.name,
      customerId: req.body.customerId,
      number: req.body.number,
      currency: req.body.currency,
    };

    res.json(await bankAccountServices.saveCustomerBankAccount(bankAccount));
  } catch (err) {
    next(err);
  }
};
