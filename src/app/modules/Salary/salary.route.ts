import express from 'express';
import { SalaryController } from './salary.controller';

const router = express.Router();

router
  .route('/')
  .post(SalaryController.createSalary)
  .get(SalaryController.getAllSalary);

router
  .route('/:id')
  .get(SalaryController.getSingleSalary)
  .put(SalaryController.updateSalary)
  .delete(SalaryController.deleteSalary);

export const SalaryRoutes = router;
