import mongoose, { Model, Schema } from 'mongoose';
import {
  TAdmin,
  TExperiences,
  TOtherQualifications,
} from './admin.interface';

// Mongoose Schema
const OtherQualificationsSchema = new Schema<TOtherQualifications>(
  {
    nameOfCertificate: { type: String },
    passingYear: { type: Number },
    result: { type: String },
    boardOrUniversity: { type: String },
    duration: { type: String },
  },
  {
    _id: false, // This prevents Mongoose from adding an _id field to the subdocument
  },
);

const ExperiencesSchema = new Schema<TExperiences>(
  {
    organizationName: { type: String },
    duration: { type: String },
    designation: { type: String },
    duties: { type: String },
  },
  {
    _id: false, // This prevents Mongoose from adding an _id field to the subdocument
  },
);

const AdminSchema = new Schema<TAdmin>(
  {
    auth: {
      type: Schema.Types.ObjectId,
      ref: "Auth"
    },
    userId: { type: String, required: [true, 'User ID is required.'] },
    adminId: { type: String, required: [true, 'Admin ID is required.'] },
    name: { type: String, required: [true, 'Name is required.'] },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    email: { type: String, required: [true, 'Email is required.'] },
    gender: { type: String, required: [true, 'Gender is required.'] },
    religion: { type: String, required: [true, 'Religion is required.'] },
    bloodGroup: { type: String, required: [true, 'Blood group is required.'] },
    maritalStatus: {
      type: String,
      required: [true, 'Marital status is required.'],
    },
    picture: { type: String, required: [true, 'Picture is required.'] },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required.'],
    },
    alternativeContact: { type: String },
    joiningDate: {
      type: String,
      required: [true, 'Joining date is required.'],
    },
    fatherName: { type: String, required: [true, 'Father name is required.'] },
    motherName: { type: String, required: [true, 'Mother name is required.'] },
    fatherNidNumber: {
      type: String,
      required: [true, 'Father NID number is required.'],
    },
    motherNidNumber: {
      type: String,
      required: [true, 'Mother NID number is required.'],
    },
    cvOrOtherAttachments: { type: String },
    nameOfExam: { type: String, required: [true, 'Name of exam is required.'] },
    passingYear: {
      type: Number,
      required: [true, 'Passing year is required.'],
    },
    result: { type: String, required: [true, 'Result is required.'] },
    boardOrUniversity: {
      type: String,
      required: [true, 'Board or university is required.'],
    },

    isDeleted: {
      type: Boolean,
      default: false
    },

    otherQualifications: { type: [OtherQualificationsSchema], required: false },
    experiences: { type: [ExperiencesSchema], required: false },
  },
  {
    timestamps: true,
  },
);


AdminSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

AdminSchema.pre('findOne', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

AdminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Admin: Model<TAdmin> = mongoose.model<TAdmin>(
  'Admin',
  AdminSchema,
);
