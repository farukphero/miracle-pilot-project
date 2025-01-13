import { Router } from 'express';
 
import { StudentRoutes } from '../modules/Student/student.route';
import { TeacherRoutes } from '../modules/Teacher/teacher.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { StaffRoutes } from '../modules/Staff/staff.route';
import { AccountOfficerRoutes } from '../modules/Account_officer/account_officer.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: AuthRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/teachers',
    route: TeacherRoutes,
  },
  {
    path: '/staff',
    route: StaffRoutes,
  },
  {
    path: '/account-officer',
    route: AccountOfficerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
