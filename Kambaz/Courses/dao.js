import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
    return db.courses;
}

export function findCoursesForEnrolledUser(userId) {
    return db.courses.filter(course =>
        db.enrollments.some(enrollment =>
            enrollment.user === userId && enrollment.course === course._id
        )
    );
}

export function createCourse(course) {
    const newCourse = {
        _id: uuidv4(),
        name: course.name || "",
        number: course.number || "",
        startDate: course.startDate || "",
        endDate: course.endDate || "",
        department: course.department || "General",
        credits: course.credits !== undefined ? course.credits : 3,
        description: course.description || "",
        author: course.author || ""
    };
    db.courses.push(newCourse);
    return newCourse;
}

export function updateCourse(courseId, courseUpdates) {
    const course = db.courses.find((course) => course._id === courseId);
    if (!course) return null;
    Object.assign(course, courseUpdates);
    return course;
}

export function deleteCourse(id) {
    db.courses = db.courses.filter((c) => c._id !== id);
    db.enrollments = db.enrollments.filter((e) => e.course !== id);
    return true;
}

export function enrollUserToCourse(userId, courseId) {
    db.enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
}