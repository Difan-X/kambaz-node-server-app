import axios from "axios";
import type { User } from "./reducer";
import type { Course } from "../Courses/client"; // 路径按实际结构调整

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: { username: string; password: string }) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
};

export const signup = async (user: { username: string; password: string }) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};

export const updateUser = async (user: Partial<User>) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data as User;
};

export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};

export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

export const findMyCourses = async (): Promise<Course[]> => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};

export const createCourse = async (course: Partial<Course>): Promise<Course> => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
};