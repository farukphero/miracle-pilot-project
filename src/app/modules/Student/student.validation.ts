import { z } from 'zod';

// Zod Schema for Academic Result
const academicResultSchema = z.object({
  class: z.string({ required_error: 'Class is required' }),
  roll: z.string({ required_error: 'Roll number is required' }),
  obtainedMarks: z
    .number({ required_error: 'Obtained marks is required.' })
    .min(0, 'Obtained marks must be a positive number'),
  gpa: z
    .number({ required_error: 'GPA is required.' })
    .min(0, 'GPA must be a positive number'),
});

// Zod Schema for Student
const studentValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    roll: z.string({ required_error: 'Roll number is required' }),
    contactNumber: z.string({ required_error: 'Contact number is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),
    gender: z.string({ required_error: 'Gender is required' }),
    religion: z.string({ required_error: 'Religion is required' }),
    bloodGroup: z.string({ required_error: 'Blood group is required' }),
    status: z.string({ required_error: 'Status is required' }),
    picture: z.string({ required_error: 'Picture is required' }),
    presentAddress: z.string({ required_error: 'Present address is required' }),
    permanentAddress: z.string({
      required_error: 'Permanent address is required',
    }),
    dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
    class: z.string({ required_error: 'Class is required' }),
    section: z.string({ required_error: 'Section is required' }),

    // Board Result Info
    sscBoard: z.string({ required_error: 'SSC board is required' }),
    sscRoll: z.string({ required_error: 'SSC roll number is required' }),
    sscResult: z.string({ required_error: 'SSC result is required' }),
    hscRoll: z.string({ required_error: 'HSC roll number is required' }),
    hscBoard: z.string({ required_error: 'HSC board is required' }),
    hscResult: z.string({ required_error: 'HSC result is required' }),
    registrationNumber: z.string({
      required_error: 'Registration number is required',
    }),
    sscPassingYear: z
      .number({ required_error: 'SSC passing year is required' })
      .min(1900, 'SSC passing year is invalid'),
    hscPassingYear: z
      .number({ required_error: 'HSC passing year is required' })
      .min(1900, 'HSC passing year is invalid'),

    academicResult: z
      .array(academicResultSchema)
      .nonempty('Academic results are required'),

    // Guardian Details
    fatherName: z.string({ required_error: "Father's name is required" }),
    motherName: z.string({ required_error: "Mother's name is required" }),
    fatherContactNumber: z.string({
      required_error: "Father's contact number is required",
    }),
    fatherNidNumber: z.string({
      required_error: "Father's NID number is required",
    }),
    motherNidNumber: z.string({
      required_error: "Mother's NID number is required",
    }),
    motherContactNumber: z.string({
      required_error: "Mother's contact number is required",
    }),
    fatherOccupation: z.string({
      required_error: "Father's occupation is required",
    }),
    motherOccupation: z.string({
      required_error: "Mother's occupation is required",
    }),
    fatherImage: z.string({ required_error: "Father's image is required" }),
    motherImage: z.string().optional(),
    localGuardianName: z.string().optional(),
    relationshipWithLocalGuardian: z.string().optional(),
    localGuardianImage: z.string().optional(),
    localGuardianNumber: z.string().optional(),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    roll: z.string({ required_error: 'Roll number is required' }).optional(),
    contactNumber: z
      .string({ required_error: 'Contact number is required' })
      .optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address')
      .optional(),
    gender: z.string({ required_error: 'Gender is required' }).optional(),
    religion: z.string({ required_error: 'Religion is required' }).optional(),
    bloodGroup: z
      .string({ required_error: 'Blood group is required' })
      .optional(),
    status: z.string({ required_error: 'Status is required' }).optional(),
    picture: z.string({ required_error: 'Picture is required' }).optional(),
    presentAddress: z
      .string({ required_error: 'Present address is required' })
      .optional(),
    permanentAddress: z
      .string({ required_error: 'Permanent address is required' })
      .optional(),
    dateOfBirth: z
      .string({ required_error: 'Date of birth is required' })
      .optional(),
    class: z.string({ required_error: 'Class is required' }).optional(),
    section: z.string({ required_error: 'Section is required' }).optional(),

    // Board Result Info
    sscBoard: z.string({ required_error: 'SSC board is required' }).optional(),
    sscRoll: z
      .string({ required_error: 'SSC roll number is required' })
      .optional(),
    sscResult: z
      .string({ required_error: 'SSC result is required' })
      .optional(),
    hscRoll: z
      .string({ required_error: 'HSC roll number is required' })
      .optional(),
    hscBoard: z.string({ required_error: 'HSC board is required' }).optional(),
    hscResult: z
      .string({ required_error: 'HSC result is required' })
      .optional(),
    registrationNumber: z
      .string({ required_error: 'Registration number is required' })
      .optional(),
    sscPassingYear: z
      .number({ required_error: 'SSC passing year is required' })
      .min(1900, 'SSC passing year is invalid')
      .optional(),
    hscPassingYear: z
      .number({ required_error: 'HSC passing year is required' })
      .min(1900, 'HSC passing year is invalid')
      .optional(),

    academicResult: z.array(academicResultSchema).optional(),

    // Guardian Details
    fatherName: z
      .string({ required_error: "Father's name is required" })
      .optional(),
    motherName: z
      .string({ required_error: "Mother's name is required" })
      .optional(),
    fatherContactNumber: z
      .string({ required_error: "Father's contact number is required" })
      .optional(),
    fatherNidNumber: z
      .string({ required_error: "Father's NID number is required" })
      .optional(),
    motherNidNumber: z
      .string({ required_error: "Mother's NID number is required" })
      .optional(),
    motherContactNumber: z
      .string({ required_error: "Mother's contact number is required" })
      .optional(),
    fatherOccupation: z
      .string({ required_error: "Father's occupation is required" })
      .optional(),
    motherOccupation: z
      .string({ required_error: "Mother's occupation is required" })
      .optional(),
    fatherImage: z
      .string({ required_error: "Father's image is required" })
      .optional(),
    motherImage: z.string().optional(),
    localGuardianName: z.string().optional(),
    relationshipWithLocalGuardian: z.string().optional(),
    localGuardianImage: z.string().optional(),
    localGuardianNumber: z.string().optional(),
  }),
});

export const studentValidation = {
  studentValidationSchema,
  updateStudentValidationSchema,
};
