import EnrollmentModel from "./model.js";

/**
 * Retrieve all Course documents that a given user is enrolled in.
 * @param {String} userId
 * @returns {Promise<Array>} Array of populated CourseModel documents.
 */
export async function findEnrollmentsForUser(userId) {
    const enrollments = await EnrollmentModel
        .find({ user: userId })
        .populate("course")
        .exec();
    return enrollments.map((en) => en.course);
}

/**
 * Enroll a user in a course. If already enrolled, does nothing.
 * Uses upsert to avoid duplicate‐key errors.
 * @param {String} userId
 * @param {String} courseId
 * @returns {Promise<import('mongoose').UpdateWriteOpResult>}
 */
export function enrollUserInCourse(userId, courseId) {
    return EnrollmentModel.updateOne(
        { user: userId, course: courseId },      // match existing enrollment
        {
            $setOnInsert: {                        // only set on insertion
                _id: `${userId}-${courseId}`,
                user: userId,
                course: courseId,
            },
        },
        { upsert: true }                         // insert if missing
    ).exec();
}

/**
 * Remove an existing enrollment (unenroll the user).
 * @param {String} userId
 * @param {String} courseId
 * @returns {Promise<import('mongoose').DeleteWriteOpResultObject>}
 */
export function unenrollUserFromCourse(userId, courseId) {
    return EnrollmentModel.deleteOne({ user: userId, course: courseId }).exec();
}

/**
 * (Optional) Delete all enrollments for a given course.
 * @param {String} courseId
 * @returns {Promise<import('mongoose').DeleteWriteOpResultObject>}
 */
export function deleteEnrollmentsByCourse(courseId) {
    return EnrollmentModel.deleteMany({ course: courseId }).exec();
}