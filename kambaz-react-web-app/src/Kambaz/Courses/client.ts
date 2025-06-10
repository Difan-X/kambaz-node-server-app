import axios from "axios";

export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image?: string;
    description: string;
    department?: string;
    credits?: number;
    author?: string;
}

export interface Module {
    _id: string;
    course: string;
    name: string;
    lessons: string[];
}

export interface NewModule {
    name: string;
}

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchAllCourses = async (): Promise<Course[]> => {
    const { data } = await axiosWithCredentials.get<Course[]>(COURSES_API);
    return data;
};

export const createCourse = async (course: Partial<Course>): Promise<Course> => {
    const { data } = await axiosWithCredentials.post<Course>(COURSES_API, course);
    return data;
};

export const updateCourse = async (course: Partial<Course>): Promise<Course> => {
    const { data } = await axiosWithCredentials.put<Course>(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const deleteCourse = async (id: string): Promise<void> => {
    await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
};

// -------- Modules API --------

export const createModuleForCourse = async (
    courseId: string,
    module: NewModule
): Promise<Module> => {
    const response = await axios.post<Module>(`${COURSES_API}/${courseId}/modules`, module);
    return response.data;
};

export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
    const { data } = await axios.get<Module[]>(`${COURSES_API}/${courseId}/modules`);
    return data;
};