import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export interface Module {
    _id: string;
    course: string;
    name: string;
    lessons: string[];
    editing?: boolean;
}

export const deleteModule = async (moduleId: string): Promise<void> => {
    await axios.delete(`${MODULES_API}/${moduleId}`);
};

export const updateModule = async (module: Module): Promise<Module> => {
    const { data } = await axios.put<Module>(`${MODULES_API}/${module._id}`, module);
    return data;
};