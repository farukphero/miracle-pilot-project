import { Router } from 'express';
 
import { StudentRoutes } from '../modules/Student/student.route';
import { TeacherRoutes } from '../modules/Teacher/teacher.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
