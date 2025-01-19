export interface TExamSetting {
  class: string; // Optional: Class name, e.g., "10th Grade"
  examName: string;
  examYear: string; // Optional: Name of the exam term, e.g., "Mid-Term"
  startDate?: string; // Optional: Start date of the exam term
  endDate?: string; // Optional: End date of the exam term
  description: string;
  exams: Array<{
    courseName: string;
    courseCode: string;
    mark: string;
    maxMark: string;
    internalEvaluationMark: string;
    gpa: string;
    position: string;
  }>;

  createdBy: string; // Required: The admin/teacher/staff who created the setting
  isDeleted?: boolean; // Optional: Flag for soft deletion (default: false)
}
