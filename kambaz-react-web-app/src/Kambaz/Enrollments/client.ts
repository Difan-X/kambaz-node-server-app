import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchEnrollments = async () => {
    const { data } = await axios.get(ENROLLMENTS_API, { withCredentials: true });
    return data;
};

export const enrollCourse = async (courseId: string) => {
    await axios.post(`${ENROLLMENTS_API}/${courseId}`, {}, { withCredentials: true });
};

export const unenrollCourse = async (courseId: string) => {
    await axios.delete(`${ENROLLMENTS_API}/${courseId}`, { withCredentials: true });
};