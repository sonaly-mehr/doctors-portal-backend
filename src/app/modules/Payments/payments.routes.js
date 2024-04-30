import express from 'express';
import { paymentController } from './payments.controller.js';

const router = express.Router();

router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getSinglePayment);
router.patch('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

export const paymentRoutes = router;