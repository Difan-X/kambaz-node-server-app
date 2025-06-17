import express from "express";
import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import bcrypt from "bcrypt";

const router = express.Router();

/** 用户 CRUD **/

// Create
router.post("/", async (req, res) => {
    try {
        const created = await dao.createUser(req.body);
        res.status(201).json(created);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// List / filter
router.get("/", async (req, res) => {
    const { role, name } = req.query;
    if (role) return res.json(await dao.findUsersByRole(role));
    if (name) return res.json(await dao.findUsersByPartialName(name));
    res.json(await dao.findAllUsers());
});

// Read one
router.get("/:userId", async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// Update
router.put("/:userId", async (req, res) => {
    const result = await dao.updateUser(req.params.userId, req.body);
    if (result.matchedCount === 0)
        return res.status(404).json({ message: "User not found" });
    const updated = await dao.findUserById(req.params.userId);
    if (req.session.currentUser?._id === req.params.userId) {
        req.session.currentUser = updated;
    }
    res.json(updated);
});

// Delete
router.delete("/:userId", async (req, res) => {
    const result = await dao.deleteUser(req.params.userId);
    if (result.deletedCount === 0)
        return res.status(404).json({ message: "User not found" });
    res.sendStatus(204);
});

/** 认证：signin/signup/profile/signout **/

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
        req.session.currentUser = user;
        return res.json(user);
    }
    res.status(401).json({ message: "Invalid credentials" });
});

router.post("/signup", async (req, res) => {
    if (await dao.findUserByUsername(req.body.username)) {
        return res.status(400).json({ message: "Username taken" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await dao.createUser({ ...req.body, password: hash });
    req.session.currentUser = newUser;
    res.json(newUser);
});

router.post("/profile", (req, res) => {
    if (!req.session.currentUser)
        return res.status(401).json({ message: "Not signed in" });
    res.json(req.session.currentUser);
});

router.post("/signout", (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

/** 选课/退课（6.4.3.3）**/

router.get("/:userId/courses", async (req, res) => {
    try {
        let uid = req.params.userId;
        if (uid === "current") {
            if (!req.session.currentUser)
                return res.status(401).json({ message: "Not signed in" });
            uid = req.session.currentUser._id;
        }
        const courses = await enrollmentsDao.findEnrollmentsForUser(uid);
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
