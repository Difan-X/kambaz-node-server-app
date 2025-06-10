import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findModulesForCourse(courseId) {
    return Database.modules.filter((module) => module.course === courseId);
}

export function createModule(module) {
    const newModule = { ...module, _id: uuidv4(), lessons: module.lessons || [] };
    Database.modules = [...Database.modules, newModule];
    return newModule;
}

export function deleteModule(moduleId) {
    const { modules } = Database;
    Database.modules = modules.filter((module) => module._id !== moduleId);
}

export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    const module = modules.find((module) => module._id === moduleId);
    if (!module) return null;
    Object.assign(module, moduleUpdates);
    return module;
}