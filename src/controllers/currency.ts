import { Request, Response, NextFunction } from 'express';
import currencyService from '../services/currency';
export const getCurrencyOptions = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.json(currencyService.getCurrencyOptions());
  } catch (err) {
    next(err);
  }
};
