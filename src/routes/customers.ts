import { Router } from 'express';
import { saveCustomer, getCustomers, getCustomerById, deleteCustomer } from '../controllers/customers';
import { saveCustomerRules, validate } from '../commons/validations';

const router = Router();

router.route('/').get(getCustomers);
router.route('/:id').get(getCustomerById);
router.route('/').post(validate(saveCustomerRules), saveCustomer);
router.route('/:id').delete(deleteCustomer);

export default router;
