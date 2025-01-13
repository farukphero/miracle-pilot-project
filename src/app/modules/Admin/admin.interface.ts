import { Types } from 'mongoose';

export interface TAdmin {
  auth: Types.ObjectId;
  userId: string;
  adminId: string;
  name: string;
  contactNumber: string;
  email: string;
  gender: string;
  religion: string;
  bloodGroup: string;
  maritalStatus: string;
  picture?: string;
  presentAddress: string;
  permanentAddress: string;
  dateOfBirth: string;
  alternativeContact?: string;
  joiningDate: string;
  fatherName: string;
  motherName: string;
  fatherNidNumber: string;
  motherNidNumber: string;
  cvOrOtherAttachments?: string;

  // EduQualifications details
  nameOfExam: string;
  passingYear: number;
  result: string;
  boardOrUniversity: string;
  isDeleted: boolean;

  otherQualifications: TOtherQualifications[];

  experiences: TExperiences[];
}

export interface TOtherQualifications {
  nameOfCertificate: string;
  passingYear: number;
  result: string;
  boardOrUniversity: string;
  duration: string;
}

export interface TExperiences {
  organizationName: string;
  duration: string;
  designation: string;
  duties: string;
}
