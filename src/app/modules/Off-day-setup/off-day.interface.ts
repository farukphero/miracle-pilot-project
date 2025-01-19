export type TDays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface TOffDaySetup {
  title: string; // Name of the off day or occasion, e.g., "Teacher's Day" or "National Holiday"
  description: string; // Optional: Brief description of the off day
  dayName: TDays; // Name of the off day or occasion, e.g., "Teacher's Day" or "National Holiday"
  date: string; // Date of the off day in the format "DD-MM-YYYY"
  recurring?: boolean; // Whether this off day is recurring annually
  createdBy: string; // User or admin ID who created the off day setup
  isDeleted?: boolean; // Optional: Flag for soft deletion
}
