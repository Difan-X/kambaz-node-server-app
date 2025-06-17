import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import ModuleModel from "./model.js";

export function findModulesForCourse(courseId) {
    return Database.modules.filter((module) => module.course === courseId);
}

/**
 * Create a new module in the database.
 * @param {Object} moduleData
 * @returns {Promise<Document>} the newly created Module document
 */
export function createModule(moduleData) {
    // we assign an _id client-side so it’s predictable
    const newModule = { _id: uuidv4(), ...moduleData };
    return ModuleModel.create(newModule);
}

/**
 * Delete a module by its ID.
 * @param {String} moduleId
 * @returns {Promise<DeleteResult>} - The Mongo delete result.
 */
export function deleteModule(moduleId) {
    return ModuleModel.deleteOne({ _id: moduleId }).exec();
}

export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    const module = modules.find((module) => module._id === moduleId);
    if (!module) return null;
    Object.assign(module, moduleUpdates);
    return ModuleModel.updateOne({ _id: moduleId }, moduleUpdates).exec();
}