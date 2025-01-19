import { z } from 'zod';
import { Days } from './exam-schedule.const';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const examinationScheduleValidationSchema = z.object({
  body: z
    .object({
      examName: z.string({ required_error: 'Exam name is required' }).min(1, {
        message: 'Exam name cannot be empty',
      }),
      class: z.string({ required_error: 'Class name is required' }).min(1, {
        message: 'Class cannot be empty',
      }),
      section: z.string({ required_error: 'Section name is required' }).min(1, {
        message: 'Section cannot be empty',
      }),
      subjectCode: z
        .string({ required_error: 'Subject code is required' })
        .min(1, { message: 'Subject code cannot be empty' }),
      subjectName: z
        .string({ required_error: 'Subject name is required' })
        .min(1, { message: 'Subject name cannot be empty' }),
      examDate: z
        .string({ required_error: 'Exam date is required' })
        .regex(/^\d{2}-\d{2}-\d{4}$/, {
          message: 'Exam date must be in DD-MM-YYYY format',
        }),
      examYear: z.string({ required_error: 'Exam year is required' }),
      day: z.enum([...Days] as [string, ...string[]], {
        required_error: 'Day is required',
        invalid_type_error: 'Invalid day',
      }),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
      durationMinutes: z
        .number()
        .min(1, { message: 'Duration must be at least 1 minute' })
        .optional(),
      roomNumber: z
        .string({ required_error: 'Room number is required' })
        .min(1, { message: 'Room number cannot be empty' }),
      buildingName: z.string().optional(),
      invigilatorName: z
        .string({ required_error: 'Invigilator name is required' })
        .min(1, { message: 'Invigilator name cannot be empty' }),
      totalMarks: z
        .number({ required_error: 'Total marks are required' })
        .min(1, { message: 'Total marks must be greater than zero' }),
      passingMarks: z
        .number({ required_error: 'Passing marks are required' })
        .min(0, { message: 'Passing marks must be zero or greater' }),
      createdBy: z
        .string({ required_error: 'Created by field is required' })
        .min(1, { message: 'Created by field cannot be empty' }),
      isDeleted: z.boolean().default(false),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time must be earlier than end time.',
        path: ['startTime', 'endTime'],
      },
    ),
});
const updateExaminationScheduleValidationSchema = z.object({
  body: z
    .object({
      examName: z
        .string({ required_error: 'Exam name is required' })
        .min(1, {
          message: 'Exam name cannot be empty',
        })
        .optional(),
      class: z
        .string({ required_error: 'Class name is required' })
        .min(1, {
          message: 'Class cannot be empty',
        })
        .optional(),
      section: z
        .string({ required_error: 'Section name is required' })
        .min(1, {
          message: 'Section cannot be empty',
        })
        .optional(),
      subjectCode: z
        .string({ required_error: 'Subject code is required' })
        .min(1, { message: 'Subject code cannot be empty' })
        .optional(),
      subjectName: z
        .string({ required_error: 'Subject name is required' })
        .min(1, { message: 'Subject name cannot be empty' })
        .optional(),
      examDate: z
        .string({ required_error: 'Exam date is required' })
        .regex(/^\d{2}-\d{2}-\d{4}$/, {
          message: 'Exam date must be in DD-MM-YYYY format',
        })
        .optional(),
      examYear: z
        .string({ required_error: 'Exam year is required' })
        .optional(),
      day: z
        .enum([...Days] as [string, ...string[]], {
          required_error: 'Day is required',
          invalid_type_error: 'Invalid day',
        })
        .optional(),
      startTime: timeStringSchema.optional(),
      endTime: timeStringSchema.optional(),
      durationMinutes: z
        .number()
        .min(1, { message: 'Duration must be at least 1 minute' })
        .optional(),
      roomNumber: z
        .string({ required_error: 'Room number is required' })
        .min(1, { message: 'Room number cannot be empty' })
        .optional(),
      buildingName: z.string().optional(),
      invigilatorName: z
        .string({ required_error: 'Invigilator name is required' })
        .min(1, { message: 'Invigilator name cannot be empty' })
        .optional(),
      totalMarks: z
        .number({ required_error: 'Total marks are required' })
        .min(1, { message: 'Total marks must be greater than zero' })
        .optional(),
      passingMarks: z
        .number({ required_error: 'Passing marks are required' })
        .min(0, { message: 'Passing marks must be zero or greater' })
        .optional(),
      createdBy: z
        .string({ required_error: 'Created by field is required' })
        .min(1, { message: 'Created by field cannot be empty' })
        .optional(),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time must be earlier than end time.',
        path: ['startTime', 'endTime'],
      },
    ),
});

export const examinationScheduleValidation = {
  examinationScheduleValidationSchema,
  updateExaminationScheduleValidationSchema,
};
