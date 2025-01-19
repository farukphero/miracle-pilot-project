import { z } from 'zod';

const examSettingValidationSchema = z.object({
  body: z.object({
    class: z.string({ required_error: 'Class name is required' }),
    examName: z.string({ required_error: 'Exam name is required' }),
    examYear: z.string({ required_error: 'Exam year is required' }),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string({ required_error: 'Description is required' }),
    exams: z.array(
      z.object({
        courseName: z.string({ required_error: 'Course name is required' }),
        courseCode: z.string({ required_error: 'Course code is required' }),
        mark: z.string({ required_error: 'Mark is required' }),
        maxMark: z.string({ required_error: 'Maximum mark is required' }),
        internalEvaluationMark: z.string({
          required_error: 'Internal evaluation mark is required',
        }),
        gpa: z.string({ required_error: 'GPA is required' }),
        position: z.string().optional(),
      }),
    ),
    createdBy: z.string({ required_error: 'Created by is required' }),
  }),
});
const updateExamSettingValidationSchema = z.object({
  body: z.object({
    class: z.string({ required_error: 'Class name is required' }).optional(),
    examName: z.string({ required_error: 'Exam name is required' }).optional(),
    examYear: z.string({ required_error: 'Exam year is required' }),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z
      .string({ required_error: 'Description is required' })
      .optional(),
    exams: z
      .array(
        z.object({
          courseName: z
            .string({ required_error: 'Course name is required' })
            .optional(),
          courseCode: z
            .string({ required_error: 'Course code is required' })
            .optional(),
          mark: z.string({ required_error: 'Mark is required' }).optional(),
          maxMark: z
            .string({ required_error: 'Maximum mark is required' })
            .optional(),
          internalEvaluationMark: z
            .string({ required_error: 'Internal evaluation mark is required' })
            .optional(),
          gpa: z.string({ required_error: 'GPA is required' }).optional(),
          position: z.string().optional(),
        }),
      )
      .optional(),
    createdBy: z
      .string({ required_error: 'Created by is required' })
      .optional(),
  }),
});

export const examSettingValidation = {
  examSettingValidationSchema,
  updateExamSettingValidationSchema,
};
