import mongoose, { Model, Schema } from 'mongoose';
import { Days } from './off-day.const';
import { TOffDaySetup } from './off-day.interface';

const OffDaySetupSchema = new Schema<TOffDaySetup>(
  {
    dayName: {
      type: String,
      enum: Days, // Ensures dayName is one of the valid days defined in TDays
      required: [true, 'Day name is required'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Reason of the off day is required'],
    },
    recurring: {
      type: Boolean,
      required: [false, 'Recurring flag is required'],
    },
    createdBy: {
      type: String,
      required: [true, 'Created by is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false, // Defaults to false for active records
    },
  },
  {
    timestamps: true,
  },
);

OffDaySetupSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

OffDaySetupSchema.pre('findOne', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

OffDaySetupSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const OffDaySetup: Model<TOffDaySetup> = mongoose.model<TOffDaySetup>(
  'OffDaySetup',
  OffDaySetupSchema,
);
