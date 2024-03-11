import { NextFunction, Response, Request } from 'express';
import { ValidationChain, body, validationResult } from 'express-validator';
import customerModel from '../models/customers';
import { currencyList } from '../models/currency';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

export const saveCustomerRules = [
  body('ssn')
    .isNumeric()
    .custom(async (value) => {
      const customer = await customerModel.getCustomerBySsn(value);
      if (customer) {
        throw new Error('SSN already in use');
      }
    }),
  body('name').isString(),
];

export const saveBankAccountRules = [
  body('number')
    .isNumeric()
    .custom((value) => {
      if (validateAccountNumberMod11(value)) {
        throw new Error('Account number is not valid');
      }
    }),
  body('name').isString(),
  body('currency')
    .isString()
    .custom((value) => {
      if (!currencyList.includes(value)) {
        throw new Error('Currency is not valid');
      }
    }),
  body('customerId')
    .isUUID()
    .custom(async (value) => {
      const customer = await customerModel.getCustomerById(value);
      if (!customer) {
        throw new Error('Customer does not exist');
      }
    }),
];

const validateAccountNumberMod11 = (accountNumber?: string) => {
  if (!accountNumber) {
    return false;
  }

  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const accountNumberWithoutSpacesAndPeriods = accountNumber.replace(/[\s.]+/g, '');
  if (accountNumberWithoutSpacesAndPeriods.length !== 11) {
    return false;
  } else {
    const checkDigit = parseInt(accountNumberWithoutSpacesAndPeriods.charAt(10), 10);
    const accountNumberWithoutCheckDigit = accountNumberWithoutSpacesAndPeriods.substring(0, 10);
    let sum = 0;
    for (let index = 0; index < 10; index++) {
      sum += parseInt(accountNumberWithoutCheckDigit.charAt(index), 10) * weights[index];
    }
    const remainder = sum % 11;
    return checkDigit === (remainder === 0 ? 0 : 11 - remainder);
  }
};
