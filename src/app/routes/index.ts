import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/Student/student.route';
import { TeacherRoutes } from '../modules/Teacher/teacher.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
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
