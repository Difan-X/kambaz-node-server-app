import express from "express";
import * as dao from "./dao.js";

export const router = express.Router();

// POST   /api/users          → createUser
router.post("/", (req, res) => {
    const newUser = dao.createUser(req.body);
    res.status(201).json(newUser);
});

// GET    /api/users          → findAllUsers
router.get("/", (req, res) => {
    res.json(dao.findAllUsers());
});

// GET    /api/users/:uid     → findUserById
router.get("/:uid", (req, res) => {
    const user = dao.findUserById(req.params.uid);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// GET    /api/users/username/:uname  → findUserByUsername
router.get("/username/:uname", (req, res) => {
    const user = dao.findUserByUsername(req.params.uname);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// GET    /api/users/credentials?username=…&password=… → findUserByCredentials
router.get("/credentials", (req, res) => {
    const { username, password } = req.query;
    const user = dao.findUserByCredentials(username, password);
    if (!user) return res.status(404).json({ message: "Invalid credentials" });
    res.json(user);
});

// PUT    /api/users/:uid     → updateUser
router.put("/:uid", (req, res) => {
    const existing = dao.findUserById(req.params.uid);
    if (!existing) return res.status(404).json({ message: "User not found" });
    const updated = dao.updateUser(req.params.uid, req.body);
    res.json(updated);
});

// DELETE /api/users/:uid     → deleteUser
router.delete("/:uid", (req, res) => {
    const existing = dao.findUserById(req.params.uid);
    if (!existing) return res.status(404).json({ message: "User not found" });
    dao.deleteUser(req.params.uid);
    res.sendStatus(204);
});

