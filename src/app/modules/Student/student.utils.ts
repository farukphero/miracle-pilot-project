
import { Student } from './student.model';

const findLastStudentIdForYear = async (year: string) => {
  const lastStudent = await Student.findOne({
    studentId: new RegExp(`S-${year}`), // Match IDs starting with S-YY
  })
    .sort({ createdAt: -1 }) // Get the most recent student for the year
    .select('studentId')
    .lean();

  return lastStudent?.studentId ? lastStudent.studentId.substring(4) : undefined;
};

export const generateStudentId = async (admissionDate: string) => {
  const admissionYear = new Date(admissionDate).getFullYear().toString().slice(-2);

  let currentId = await findLastStudentIdForYear(admissionYear);

  if (!currentId) {
    // If no student exists for the given year, start from '0001'
    currentId = '0000';
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  return `S-${admissionYear}${incrementId}`;
};













// import { Student } from './student.model';

// const findLastStudentId = async () => {
//   const lastStudent = await Student.findOne({ studentId: { $exists: true } })
//     .sort({ createdAt: -1 })
//     .select('studentId')
//     .lean();

//   return lastStudent?.studentId
//     ? lastStudent?.studentId.substring(4)
//     : undefined;
// };

// export const generateStudentId = async (admissionDate: string) => {
//   const admissionYear = new Date(admissionDate).getFullYear().toString().slice(-2);
//   const currentYear = new Date().getFullYear().toString().slice(-2);

//   if (admissionYear !== currentYear) {
//     return `S-${admissionYear}0001`;
//   }

//   const currentId = await findLastStudentId();
//   const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//   return `S-${admissionYear}${incrementId}`;
// };


