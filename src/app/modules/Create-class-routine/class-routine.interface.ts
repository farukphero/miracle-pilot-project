export type TDays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface TClassRoutine {
  class: string;
  section: string;
  teacherName: string;
  subjectCode: string;
  subjectName: string;
  day: TDays;
  startTime: string; // Format: "HH:mm" or "10:00 AM"
  endTime: string; // Format: "HH:mm" or "11:00 AM"
  roomNumber: string;
  buildingName?: string; // Optional field
  isOptional: boolean;
  createdBy: string; // Admin ID
  isDeleted: boolean;
}
