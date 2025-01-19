import mongoose, { Model, Schema } from 'mongoose';
import { Days } from './exam-schedule.const';
import { TExaminationSchedule } from './exam-schedule.interface';

const ExaminationScheduleSchema = new Schema<TExaminationSchedule>(
  {
    examName: { type: String, required: [true, 'Exam name is required'] },
    class: { type: String, required: [true, 'Class is required'] },
    section: { type: String, required: [true, 'Section is required'] },
    subjectCode: { type: String, required: [true, 'Subject code is required'] },
    subjectName: { type: String, required: [true, 'Subject name is required'] },
    examDate: { type: String, required: [true, 'Exam date is required'] },
    examYear: { type: String, required: [true, 'Exam year is required'] },
    day: {
      type: String,
      enum: Days,
      required: [true, 'Day is required'],
    },
    startTime: { type: String, required: [true, 'Start time is required'] },
    endTime: { type: String, required: [true, 'End time is required'] },
    durationMinutes: { type: Number, default: null },
    roomNumber: { type: String, required: [true, 'Room number is required'] },
    buildingName: { type: String, default: null },
    invigilatorName: {
      type: String,
      required: [true, 'Invigilator name is required'],
    },
    totalMarks: { type: Number, required: [true, 'Total marks are required'] },
    passingMarks: {
      type: Number,
      required: [true, 'Passing marks are required'],
    },
    createdBy: {
      type: String,
      required: [true, 'Created by field is required'],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

ExaminationScheduleSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

ExaminationScheduleSchema.pre('findOne', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

ExaminationScheduleSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const ExaminationSchedule: Model<TExaminationSchedule> =
  mongoose.model<TExaminationSchedule>(
    'ExaminationSchedule',
    ExaminationScheduleSchema,
  );
