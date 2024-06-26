import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  // calculation duration weeks
  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);
  // Calculate the difference in milliseconds
  const durationInMS = endDate.getTime() - startDate.getTime();
  // convert milliseconds to weeks
  const weeks = Math.floor(durationInMS / (7 * 24 * 60 * 60 * 1000));
  payload.durationInWeeks = weeks;
  const result = await Course.create({ ...payload });
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query).filter();
  const result = await courseQuery.modelQuery;
  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
};
