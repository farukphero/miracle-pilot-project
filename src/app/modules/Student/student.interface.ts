// Interface for Academic Result
export interface TAcademicResult {
  class: string;
  roll: string;
  obtainedMarks: number;
  gpa: number;
}

// Interface for Student
export interface TStudent {
  name: string;
  roll: string;
  contactNumber: string;
  email: string;
  gender: string;
  religion: string;
  bloodGroup: string;
  status: string;
  picture: string;
  presentAddress: string;
  permanentAddress: string;
  dateOfBirth: string;
  class: string;
  section: string;

  // board result info
  sscBoard: string;
  sscRoll: string;
  sscResult: string;
  hscRoll: string;
  hscBoard: string;
  hscResult: string;
  registrationNumber: string;
  sscPassingYear: number;
  hscPassingYear: number;

  academicResult: TAcademicResult[];

  //  guardian details

  fatherName: string;
  motherName: string;
  fatherContactNumber: string;
  fatherNidNumber: string;
  motherNidNumber: string;
  motherContactNumber: string;
  fatherOccupation: string;
  motherOccupation: string;
  fatherImage: string;
  motherImage: string;
  localGuardianName: string;
  relationshipWithLocalGuardian: string;
  localGuardianImage: string;
  localGuardianNumber: string;
}
