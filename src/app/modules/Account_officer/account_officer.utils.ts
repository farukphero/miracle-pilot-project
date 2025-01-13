import { AccountOfficer } from "./account_officer.model";

 

const findLastAccountOfficerId = async () => {
  const lastAccountOfficer = await AccountOfficer.findOne({  accountOfficerId: { $exists: true } })
    .sort({ createdAt: -1 })
    .select('accountOfficerId')
    .lean();

  return lastAccountOfficer?.accountOfficerId
    ? lastAccountOfficer?.accountOfficerId.substring(5)
    : undefined;
};

export const generateAccountOfficerId = async ({
  joiningDate,
}: {
  joiningDate: string;
}) => {
  const year = joiningDate.split('-')[2].slice(-2); // Extracts '24' from '15-12-2024'
  const currentId = (await findLastAccountOfficerId()) || '0000';
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `AO-${year}${incrementId}`;
  return incrementId;
};
