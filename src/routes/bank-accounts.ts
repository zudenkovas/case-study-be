import { Router } from 'express';
import { saveCustomerBankAccount } from '../controllers/bank-accounts';

const router = Router();

router.route('/').post(saveCustomerBankAccount);

export default router;
