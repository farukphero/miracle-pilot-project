import { Router } from 'express';

import { StudentRoutes } from '../modules/Student/student.route';
import { TeacherRoutes } from '../modules/Teacher/teacher.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { StaffRoutes } from '../modules/Staff/staff.route';
import { AccountOfficerRoutes } from '../modules/Account_officer/account_officer.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { ClassRoutineRoutes } from '../modules/Create-class-routine/class-routine.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
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
  {
    path: '/class-routine',
    route: ClassRoutineRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
