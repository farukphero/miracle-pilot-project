import { Teacher } from './academic.model';

const findLastTeacherId = async () => {
  const lastTeacher = await Teacher.findOne(
    {},
    {
      teacherId: 1,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastTeacher?.teacherId
    ? lastTeacher?.teacherId.substring(4)
    : undefined;
};

export const generateTeacherId = async ({
  joiningDate,
}: {
  joiningDate: string;
}) => {
  const year = joiningDate.split('-')[2].slice(-2); // Extracts '24' from '15-12-2024'
  const currentId = (await findLastTeacherId()) || '0000';
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `T:${year}${incrementId}`;
  return incrementId;
};
