import { z } from 'zod';
import { Days } from './off-day.const';

const offDaySetupValidationSchema = z.object({
  body: z.object({
    dayName: z.enum([...Days] as [string, ...string[]], {
      required_error: 'Day name is required',
      invalid_type_error: 'Invalid day name',
    }),
    date: z
      .string({ required_error: 'Date is required' })
      .regex(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'Date must be in DD-MM-YYYY format',
      }),
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title cannot be empty' }),
    description: z
      .string({ required_error: 'Reason of the off day is required' })
      .min(1, { message: 'Description cannot be empty' }),
    recurring: z
      .boolean()
      .optional() // Optional field
      .default(false), // Defaults to false if not provided
    createdBy: z
      .string({ required_error: 'Created by is required' })
      .min(1, { message: 'Created by field cannot be empty' }),
    isDeleted: z.boolean().default(false), // Defaults to false
  }),
});

const updateOffDaySetupValidationSchema = z.object({
  body: z.object({
    dayName: z
      .enum([...Days] as [string, ...string[]], {
        required_error: 'Day name is required',
        invalid_type_error: 'Invalid day name',
      })
      .optional(),
    date: z
      .string({ required_error: 'Date is required' })
      .regex(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'Date must be in DD-MM-YYYY format',
      })
      .optional(),
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title cannot be empty' })
      .optional(),
    description: z
      .string({ required_error: 'Reason of the off day is required' })
      .min(1, { message: 'Description cannot be empty' })
      .optional(),
    recurring: z
      .boolean()
      .optional() // Optional field
      .default(false), // Defaults to false if not provided
    createdBy: z
      .string({ required_error: 'Created by is required' })
      .min(1, { message: 'Created by field cannot be empty' })
      .optional(),
  }),
});

export const offDaySetupValidation = {
  offDaySetupValidationSchema,
  updateOffDaySetupValidationSchema,
};
