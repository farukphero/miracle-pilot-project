import { Admin } from './admin.model';

const findLastAdminId = async () => {
  const lastAdmin = await Admin.findOne({ adminId: { $exists: true } })
    .sort({ createdAt: -1 })
    .select('adminId')
    .lean();

  return lastAdmin?.adminId ? lastAdmin?.adminId.substring(4) : undefined;
};

export const generateAdminId = async ({
  joiningDate,
}: {
  joiningDate: string;
}) => {
  const year = joiningDate.split('-')[2].slice(-2); // Extracts '24' from '15-12-2024'
  const currentId = (await findLastAdminId()) || '0000';
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `A-${year}${incrementId}`;
  return incrementId;
};
