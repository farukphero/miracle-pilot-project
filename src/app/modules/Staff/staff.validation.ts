import { z } from 'zod';

// Zod Validation Schemas
const otherQualificationsSchema = z.object({
  nameOfCertificate: z.string({
    required_error: 'Name of certificate is required.',
  }),
  passingYear: z
    .number({ invalid_type_error: 'Passing year must be a number.' })
    .int()
    .min(1900, { message: 'Passing year must be valid.' }),
  result: z.string({ required_error: 'Result is required.' }),
  boardOrUniversity: z.string({
    required_error: 'Board or university is required.',
  }),
  duration: z.string({ required_error: 'Duration is required.' }),
});

const experiencesSchema = z.object({
  organizationName: z.string({
    required_error: 'Organization name is required.',
  }),
  duration: z.string({ required_error: 'Duration is required.' }),
  designation: z.string({ required_error: 'Designation is required.' }),
  duties: z.string({ required_error: 'Duties are required.' }),
});

export const staffValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }),
    contactNumber: z.string({ required_error: 'Contact number is required.' }),
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email address.' }),
    gender: z.string({ required_error: 'Gender is required.' }),
    religion: z.string({ required_error: 'Religion is required.' }),
    bloodGroup: z.string({ required_error: 'Blood group is required.' }),
    maritalStatus: z.string({ required_error: 'Marital status is required.' }),
    picture: z.string().optional(),
    presentAddress: z.string({
      required_error: 'Present address is required.',
    }),
    permanentAddress: z.string({
      required_error: 'Permanent address is required.',
    }),
    dateOfBirth: z.coerce.date({ invalid_type_error: 'Invalid date format.' }),
    alternativeContact: z.string().optional(),
    joiningDate: z.string({ required_error: 'Joining date is required.' }),
    fatherName: z.string({ required_error: 'Father name is required.' }),
    motherName: z.string({ required_error: 'Mother name is required.' }),
    fatherNidNumber: z.string({
      required_error: 'Father NID number is required.',
    }),
    motherNidNumber: z.string({
      required_error: 'Mother NID number is required.',
    }),
    cvOrOtherAttachments: z
      .string()
      .optional()
      .refine((val) => !val || /\.(pdf|jpg|jpeg|png)$/i.test(val), {
        message: 'File must be a PDF or an image (JPG, JPEG, PNG).',
      }),
    nameOfExam: z.string({ required_error: 'Name of exam is required.' }),
    passingYear: z
      .number({ invalid_type_error: 'Passing year must be a number.' })
      .int()
      .min(1900, { message: 'Passing year must be valid.' }),
    result: z.string({ required_error: 'Result is required.' }),
    boardOrUniversity: z.string({
      required_error: 'Board or university is required.',
    }),
    otherQualifications: z.array(otherQualificationsSchema).optional(),
    experiences: z.array(experiencesSchema).optional(),
  }),
});
export const updateStaffValidationSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: 'Name is required.' }),
      contactNumber: z.string({
        required_error: 'Contact number is required.',
      }),
      email: z
        .string({ required_error: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
      gender: z.string({ required_error: 'Gender is required.' }),
      religion: z.string({ required_error: 'Religion is required.' }),
      bloodGroup: z.string({ required_error: 'Blood group is required.' }),
      maritalStatus: z.string({
        required_error: 'Marital status is required.',
      }),
      picture: z.string().optional(),
      presentAddress: z.string({
        required_error: 'Present address is required.',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required.',
      }),
      dateOfBirth: z.coerce.date({
        invalid_type_error: 'Invalid date format.',
      }),
      alternativeContact: z.string().optional(),
      joiningDate: z.string({ required_error: 'Joining date is required.' }),
      fatherName: z.string({ required_error: 'Father name is required.' }),
      motherName: z.string({ required_error: 'Mother name is required.' }),
      fatherNidNumber: z.string({
        required_error: 'Father NID number is required.',
      }),
      motherNidNumber: z.string({
        required_error: 'Mother NID number is required.',
      }),
      cvOrOtherAttachments: z
        .string()
        .optional()
        .refine((val) => !val || /\.(pdf|jpg|jpeg|png)$/i.test(val), {
          message: 'File must be a PDF or an image (JPG, JPEG, PNG).',
        }),
      nameOfExam: z.string({ required_error: 'Name of exam is required.' }),
      passingYear: z
        .number({ invalid_type_error: 'Passing year must be a number.' })
        .int()
        .min(1900, { message: 'Passing year must be valid.' }),
      result: z.string({ required_error: 'Result is required.' }),
      boardOrUniversity: z.string({
        required_error: 'Board or university is required.',
      }),
      otherQualifications: z.array(otherQualificationsSchema).optional(),
      experiences: z.array(experiencesSchema).optional(),
    })
    .partial(),
});

export const staffValidation = {
  staffValidationSchema,
  updateStaffValidationSchema,
};
