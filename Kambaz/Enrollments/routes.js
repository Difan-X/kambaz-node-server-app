import express from "express";
import * as dao from "./dao.js";

const router = express.Router();

// List enrolled courses
router.get("/", async (req, res) => {
    try {
        const user = req.session.currentUser;
        if (!user) return res.status(401).json({ message: "Not logged in" });
        const courses = await dao.findEnrollmentsForUser(user._id);
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Enroll into a course
router.post("/:courseId", async (req, res) => {
    console.log("Session:", req.session);
    try {
        const user = req.session.currentUser;
        if (!user) return res.status(401).json({ message: "Not logged in" });
        await dao.enrollUserInCourse(user._id, req.params.courseId);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Unenroll from a course
router.delete("/:courseId", async (req, res) => {
    try {
        const user = req.session.currentUser;
        if (!user) return res.status(401).json({ message: "Not logged in" });
        await dao.unenrollUserFromCourse(user._id, req.params.courseId);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;