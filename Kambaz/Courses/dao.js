import CourseModel from "./model.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Retrieve all courses from the database.
 * @returns {Promise<Array<THydratedDocumentType>>} - An array of all course documents.
 */
export let findAllCourses;
findAllCourses = async () => {
    return await CourseModel.find().exec();
};

/**
 * Retrieve a single course by its ID.
 * @param {String} courseId
 * @returns {Promise<Document|null>} - The course document or null.
 */
export const findCourseById = async (courseId) => {
    return await CourseModel.findById(courseId).exec();
};

/**
 * Retrieve all courses a given user is enrolled in.
 * @param {String} userId
 * @returns {Promise<Document[]>} - An array of course documents.
 */
export const findCoursesForEnrolledUser = async (userId) => {
    const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
    const courseIds = enrollments.map((en) => en.course);
    return await CourseModel.find({ _id: { $in: courseIds } }).exec();
};

/**
 * Create a new course in the database.
 * @param {Object} courseData - Fields for the new course.
 * @returns {Promise<Document>} - The created course document.
 */
export let createCourse;
createCourse = async (courseData) => {
    const newCourse = {_id: uuidv4(), ...courseData};
    return CourseModel.create(newCourse);
};

/**
 * Update an existing course by ID.
 * @param {String} courseId
 * @param {Object} courseUpdates
 * @returns {Promise<Document|null>} - The updated course document, or null if not found.
 */
export function updateCourse(courseId, courseUpdates) {
    // Updates the matching document; returns a promise for the write result
    return CourseModel.updateOne(
        { _id: courseId },
        { $set: courseUpdates }
    ).exec();
}

/**
 * Delete a course by ID.
 * Also cleans up any enrollments for that course.
 * @param {String} courseId
 * @returns {Promise<DeleteResult>} - The mongoose delete result.
 */
export const deleteCourse = async (courseId) => {
    const result = await CourseModel.deleteOne({ _id: courseId }).exec();
    if (result.deletedCount > 0) {
        // remove any enrollments pointing to this course
        await enrollmentsDao.deleteEnrollmentsByCourse(courseId);
    }
    return result;
};