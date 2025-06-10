import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findEnrollmentsForUser(userId) {
    return db.enrollments.filter(e => e.user === userId);
}

export function enrollUserInCourse(userId, courseId) {
    const already = db.enrollments.find(e => e.user === userId && e.course === courseId);
    if (!already) {
        db.enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
        return true;
    }
    return false;
}

export function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(e => !(e.user === userId && e.course === courseId));
    return true;
}