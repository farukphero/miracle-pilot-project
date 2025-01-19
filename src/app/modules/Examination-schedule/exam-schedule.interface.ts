export type TDays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface TExaminationSchedule {
  examName: string; // Name of the exam, e.g., "Mid-Term", "Final Exam"
  class: string; // Class for which the exam is scheduled
  section: string; // Section of the class
  subjectCode: string; // Code for the subject
  subjectName: string; // Name of the subject
  examDate: string; // Exam date in the format "YYYY-MM-DD"
  examYear: string; // Exam date in the format "YYYY-MM-DD"
  day: TDays;
  startTime: string; // Exam start time, e.g., "09:00 AM"
  endTime: string; // Exam end time, e.g., "11:00 AM"
  durationMinutes?: number; // Optional: Total duration of the exam in minutes
  roomNumber: string; // Room number where the exam is conducted
  buildingName?: string; // Optional: Building where the exam is conducted
  invigilatorName: string; // Name of the invigilator
  totalMarks: number; // Total marks for the exam
  passingMarks: number; // Passing marks for the exam
  createdBy: string; // Admin ID or user who created the schedule
  isDeleted?: boolean; // Optional: Soft delete flag
}
