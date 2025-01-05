import mongoose, { Model, Schema } from 'mongoose';
import { TAcademicResult, TStudent } from './student.interface';

const AcademicResultSchema: Schema<TAcademicResult> =
  new Schema<TAcademicResult>(
    {
      class: { type: String, required: [false, 'Class is required'] },
      roll: { type: String, required: [false, 'Roll number is required'] },
      obtainedMarks: {
        type: Number,
        required: [false, 'Obtained marks are required'],
      },
      gpa: { type: Number, required: [false, 'GPA is required'] },
    },
    {
      _id: false, // This prevents Mongoose from adding an _id field to the subdocument
    },
  );

const StudentSchema: Schema<TStudent> = new Schema<TStudent>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    roll: { type: String, required: [true, 'Roll number is required'] },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    email: { type: String, required: [true, 'Email is required'] },
    gender: { type: String, required: [true, 'Gender is required'] },
    religion: { type: String, required: [true, 'Religion is required'] },
    bloodGroup: { type: String, required: [true, 'Blood group is required'] },
    status: { type: String, required: [true, 'Status is required'] },
    picture: { type: String, required: [true, 'Picture is required'] },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
    },
    class: { type: String, required: [true, 'Class is required'] },
    section: { type: String, required: [true, 'Section is required'] },

    // Board Result Info
    sscBoard: { type: String, required: [true, 'SSC board is required'] },
    sscRoll: { type: String, required: [true, 'SSC roll number is required'] },
    sscResult: { type: String, required: [true, 'SSC result is required'] },
    hscRoll: { type: String, required: [true, 'HSC roll number is required'] },
    hscBoard: { type: String, required: [true, 'HSC board is required'] },
    hscResult: { type: String, required: [true, 'HSC result is required'] },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
    },
    sscPassingYear: {
      type: Number,
      required: [true, 'SSC passing year is required'],
    },
    hscPassingYear: {
      type: Number,
      required: [true, 'HSC passing year is required'],
    },

    academicResult: [AcademicResultSchema],

    // Guardian Details
    fatherName: { type: String, required: [true, "Father's name is required"] },
    motherName: { type: String, required: [true, "Mother's name is required"] },
    fatherContactNumber: {
      type: String,
      required: [true, "Father's contact number is required"],
    },
    fatherNidNumber: {
      type: String,
      required: [true, "Father's NID number is required"],
    },
    motherNidNumber: {
      type: String,
      required: [true, "Mother's NID number is required"],
    },
    motherContactNumber: {
      type: String,
      required: [false, "Mother's contact number is not required"],
    },
    fatherOccupation: {
      type: String,
      required: [true, "Father's occupation is required"],
    },
    motherOccupation: {
      type: String,
      required: [true, "Mother's occupation is required"],
    },
    fatherImage: {
      type: String,
      required: [true, "Father's image is required"],
    },
    motherImage: {
      type: String,
      required: [false, "Mother's image is not required"],
    },
    localGuardianName: {
      type: String,
      required: [false, 'Local guardian name is required'],
    },
    relationshipWithLocalGuardian: {
      type: String,
      required: [false, 'Local guardian relationship is required'],
    },
    localGuardianImage: {
      type: String,
      required: [false, 'Local guardian image is required'],
    },
    localGuardianNumber: {
      type: String,
      required: [false, 'Local guardian number is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Student: Model<TStudent> = mongoose.model<TStudent>(
  'Student',
  StudentSchema,
);
