import { v4 as uuidv4 } from "uuid";
import AssignmentModel from "./model.js";

/** List all assignments for a given course */
export const findAssignmentsForCourse = (courseId) =>
    AssignmentModel.find({ course: courseId }).exec();

/** Get one by its ID */
export const findAssignmentById = (id) =>
    AssignmentModel.findById(id).exec();

/** Create a new assignment under a course */
export const createAssignment = (assignment) => {
    // strip incoming _id if any, generate our own
    const { _id, ...rest } = assignment;
    const newAssignment = { _id: uuidv4(), ...rest };
    return AssignmentModel.create(newAssignment);
};

/** Update an assignment and return the updated document */
export const updateAssignment = (id, updates) =>
    AssignmentModel.findByIdAndUpdate(id, { $set: updates }, { new: true }).exec();

/** Delete an assignment */
export const deleteAssignment = (id) =>
    AssignmentModel.deleteOne({ _id: id }).exec();