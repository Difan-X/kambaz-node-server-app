import db from "../Database/index.ts";
import { v4 as uuidv4 } from "uuid";

let { users } = db;

export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    return newUser;
};
export const findAllUsers = () => users;
export const findUserById = (userId) => users.find((u) => u._id === userId);
export const findUserByUsername = (username) => users.find((u) => u.username === username);
export const findUserByCredentials = (username, password) =>
    users.find((u) => u.username === username && u.password === password);
export const updateUser = (userId, user) => {
    users = users.map((u) => (u._id === userId ? { ...u, ...user } : u));
    return users.find((u) => u._id === userId);
};
export const deleteUser = (userId) => {
    users = users.filter((u) => u._id !== userId);
    return users;
};