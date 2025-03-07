import { z } from 'zod';

const timeStringSchema = z
  .string()
  .refine(
    (time) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time),
    {
      message: 'Invalid time format, expected "HH:MM" in 24-hour format',
    }
  );

const attendanceValidationSchema = z.object({
  body: z
    .object({
      user: z.object({
        id: z.string({ required_error: 'User ID is required.' }),
        role: z.enum(['student', 'teacher', 'staff', 'accountant'], {
          required_error: 'User role is required.',
        }),
      }),
      full_name: z.string({ required_error: 'Full name is required.' }).trim(),
      designation: z.string({ required_error: 'Designation is required.' }).trim(),
      date: z.string({ required_error: 'Date is required.' }),

      present: z.boolean({ required_error: 'Present status is required.' }),
      absent: z.boolean({ required_error: 'Absent status is required.' }),

      office_time: timeStringSchema,
      in_time: timeStringSchema,
      out_time: timeStringSchema,

      late_status: z.boolean({ required_error: 'Late status is required.' }),

    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.in_time}:00`);
        const end = new Date(`1970-01-01T${body.out_time}:00`);
        return end > start;
      },
      {
        message: 'In time should be before out time.',
        path: ['in_time', 'out_time'],
      }
    ),
});

export const attendanceValidation = {
  attendanceValidationSchema,
};
