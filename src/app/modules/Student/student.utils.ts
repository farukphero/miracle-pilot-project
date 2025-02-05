import { Student } from './student.model';

const findLastStudentId = async () => {
  const lastStudent = await Student.findOne({ studentId: { $exists: true } })
    .sort({ createdAt: -1 })
    .select('studentId')
    .lean();

  return lastStudent?.studentId
    ? lastStudent?.studentId.substring(4)
    : undefined;
};

export const generateStudentId = async (admissionDate: string) => {
  const admissionYear = new Date(admissionDate).getFullYear().toString().slice(-2);
  const currentYear = new Date().getFullYear().toString().slice(-2);

  if (admissionYear !== currentYear) {
    return `S-${currentYear}0001`;
  }

  const currentId = await findLastStudentId();
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  return `S-${currentYear}${incrementId}`;
};