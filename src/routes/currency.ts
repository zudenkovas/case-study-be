import { Router } from 'express';
import { getCurrencyOptions } from '../controllers/currency';

const router = Router();

router.route('/').get(getCurrencyOptions);

export default router;
