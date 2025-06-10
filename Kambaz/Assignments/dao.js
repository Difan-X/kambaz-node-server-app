import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAssignmentsForCourse(courseId) {
    return db.assignments.filter(a => a.courseId === courseId);
}

export function findAssignmentById(id) {
    return db.assignments.find(a => a._id === id);
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments.push(newAssignment);
    return newAssignment;
}

export function updateAssignment(id, updates) {
    const idx = db.assignments.findIndex(a => a._id === id);
    if (idx === -1) return null;
    db.assignments[idx] = { ...db.assignments[idx], ...updates };
    return db.assignments[idx];
}

export function deleteAssignment(id) {
    const before = db.assignments.length;
    db.assignments = db.assignments.filter(a => a._id !== id);
    return db.assignments.length < before;
}