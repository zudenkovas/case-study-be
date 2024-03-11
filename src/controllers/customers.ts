import { Request, Response, NextFunction } from 'express';
import { CreateCustomerArgs } from '../models/customers';
import customerService from '../services/customers';

export const getCustomers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.json(await customerService.getCustomers());
  } catch (err) {
    next(err);
  }
};

export const getCustomerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    res.json(await customerService.getCustomerById(id));
  } catch (err) {
    next(err);
  }
};

export const saveCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer: CreateCustomerArgs = {
      name: req.body.name,
      ssn: req.body.ssn,
    };
    res.json(await customerService.saveCustomer(customer));
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    res.json(await customerService.deleteCustomer(id));
  } catch (err) {
    next(err);
  }
};
