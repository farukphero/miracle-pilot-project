import mongoose, { Model, Schema } from 'mongoose';
import { Days } from './exam-schedule.const';
import { TExaminationSchedule } from './exam-schedule.interface';

const ExaminationScheduleSchema = new Schema<TExaminationSchedule>(
  {
    class: {
      type: String,
      required: [true, 'Class name is required'],
    },
    examName: {
      type: String,
      required: [true, 'Exam name is required'],
    },
    examYear: {
      type: String,
      required: [true, 'Exam year is required'],
    },
    startDate: {
      type: String,
      required: [false, 'Start date is optional'],
    },
    endDate: {
      type: String,
      required: [false, 'End date is optional'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    exams: [
      {
        courseName: {
          type: String,
          required: [true, 'Course name is required'],
        },
        courseCode: {
          type: String,
          required: [true, 'Course code is required'],
        },

        maxMark: {
          type: String,
          required: [true, 'Maximum mark is required'],
        },
        startTime: {
          type: String,
          required: [true, 'Start time is required'],
        },
        endTime: {
          type: String,
          required: [true, 'End time is required'],
        },
        durationMinutes: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: String,
      required: [true, 'Created by is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
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
