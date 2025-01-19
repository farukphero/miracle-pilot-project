import mongoose, { Model, Schema } from 'mongoose';
import { TExamSetting } from './exam-setting.interface';

const ExamSettingSchema = new Schema<TExamSetting>(
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
        mark: {
          type: String,
          required: [true, 'Mark is required'],
        },
        maxMark: {
          type: String,
          required: [true, 'Maximum mark is required'],
        },
        internalEvaluationMark: {
          type: String,
          required: [true, 'Internal evaluation mark is required'],
        },
        gpa: {
          type: String,
          required: [true, 'GPA is required'],
        },
        position: {
          type: String,
          required: [false, 'Position is optional'],
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

ExamSettingSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

ExamSettingSchema.pre('findOne', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

ExamSettingSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const ExamSetting: Model<TExamSetting> = mongoose.model<TExamSetting>(
  'ExamSetting',
  ExamSettingSchema,
);
