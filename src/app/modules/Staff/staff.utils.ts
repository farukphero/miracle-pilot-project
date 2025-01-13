import { Staff } from "./staff.model";

 

const findLastStaffId = async () => {
  const lastStaff = await Staff.findOne({ staffId: { $exists: true } })
    .sort({ createdAt: -1 })
    .select('staffId')
    .lean();

  return lastStaff?.staffId
    ? lastStaff?.staffId.substring(5)
    : undefined;
};

export const generateStaffId = async ({
  joiningDate,
}: {
  joiningDate: string;
}) => {
  const year = joiningDate.split('-')[2].slice(-2); // Extracts '24' from '15-12-2024'
  const currentId = (await findLastStaffId()) || '0000';
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `ST-${year}${incrementId}`;
  return incrementId;
};
