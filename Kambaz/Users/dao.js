import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

/** Create a new user, generating a fresh _id */
export const createUser = (user) => {
    // strip any incoming _id and assign a new one
    const { _id, ...rest } = user;
    const newUser = { ...rest, _id: uuidv4() };
    return model.create(newUser);
};

/** Retrieve all users */
export const findAllUsers = () => model.find().exec();

/** Retrieve a user by ID */
export const findUserById = (userId) => model.findById(userId).exec();

/** Retrieve a user by username */
export const findUserByUsername = (username) =>
    model.findOne({ username }).exec();

/** Retrieve a user by credentials */
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password }).exec();

/** Find users by role */
export const findUsersByRole = (role) =>
    model.find({ role }).exec();

/** Find users by partial first or last name (case-insensitive) */
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return model
        .find({
            $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
        })
        .exec();
};

/** Update a user by ID */
export const updateUser = (userId, updates) =>
    model.updateOne({ _id: userId }, { $set: updates }).exec();

/** Delete a user by ID */
export const deleteUser = (userId) =>
    model.deleteOne({ _id: userId }).exec();