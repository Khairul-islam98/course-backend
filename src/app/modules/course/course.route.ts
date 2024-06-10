import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/courses',
  validateRequest(CourseValidation.createCourseSchemaValidation),
  CourseControllers.createCourse,
);

export const CourseRoutes = router;
