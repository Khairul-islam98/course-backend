import { Router } from 'express';
import { CourseRoutes } from '../modules/course/course.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/api',
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
