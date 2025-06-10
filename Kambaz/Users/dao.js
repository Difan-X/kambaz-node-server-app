import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
let users = db.users;
export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users.push(newUser);
    return newUser;
};
export const findAllUsers = () => users;
export const findUserById = (userId) => users.find((u) => u._id === userId);
export const findUserByUsername = (username) => users.find((u) => u.username === username);
export const findUserByCredentials = (username, password) =>
    users.find((u) => u.username === username && u.password === password);
export const updateUser = (userId, user) => {
    const idx = users.findIndex((u) => u._id === userId);
    if (idx >= 0) {
        users[idx] = { ...users[idx], ...user };
        return users[idx];
    }
    return null;
};
export const deleteUser = (userId) => {
    const idx = users.findIndex((u) => u._id === userId);
    if (idx >= 0) users.splice(idx, 1);
    return users;
};