import axios from "axios";
import type { Assignment } from "./assignmentsReducer";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const fetchAssignmentsForCourse = async (courseId: string): Promise<Assignment[]> => {
    const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return data;
};

export const fetchAssignmentById = async (id: string): Promise<Assignment> => {
    const { data } = await axios.get(`${ASSIGNMENTS_API}/${id}`);
    return data;
};

export const createAssignment = async (courseId: string, assignment: Partial<Assignment>): Promise<Assignment> => {
    const { data } = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return data;
};

export const updateAssignment = async (id: string, assignment: Partial<Assignment>): Promise<Assignment> => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${id}`, assignment);
    return data;
};

export const deleteAssignment = async (id: string): Promise<void> => {
    await axios.delete(`${ASSIGNMENTS_API}/${id}`);
};