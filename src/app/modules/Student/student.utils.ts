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

export const generateStudentId = async () => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const currentId = (await findLastStudentId()) || '0000';
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `S-${currentYear}${incrementId}`;
  return incrementId;
};
