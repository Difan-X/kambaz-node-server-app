import express from "express";
import * as courseDao  from "./dao.js";
import * as moduleDao  from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import CourseModel from "./model.js";

const router = express.Router();

function isFacultyOrAdmin(user) {
    return user && (user.role === "FACULTY" || user.role === "ADMIN");
}

// ─── Create a new course ───────────────────────────────
router.post("/", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!isFacultyOrAdmin(currentUser)) {
        return res.status(403).json({ message: "Only faculty or admin can create courses." });
    }
    const { name, description } = req.body;
    if (!name?.trim()) {
        return res.status(400).json({ message: "The 'name' field is required." });
    }
    try {
        const created = await courseDao.createCourse({
            name,
            description,
            faculty: currentUser._id,
        });
        // 自动 enroll 本人
        await enrollmentsDao.enrollUserInCourse(currentUser._id, created._id);
        res.status(201).json(created);
    } catch (err) {
        console.error("POST /api/courses error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ─── Get all courses ──────────────────────────────────
router.get("/", async (req, res) => {
    try {
        const { faculty } = req.query;
        if (faculty) {
            // 只查该教师的课
            const courses = await CourseModel.find({ faculty }).exec();
            return res.json(courses);
        }
        // 否则查所有课程
        const all = await courseDao.findAllCourses();
        res.json(all);
    } catch (err) {
        console.error("GET /api/courses error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ─── Get one course ───────────────────────────────────
router.get("/:courseId", async (req, res) => {
    const c = await courseDao.findCourseById(req.params.courseId);
    if (!c) return res.status(404).json({ message: "Course not found" });
    res.json(c);
});

// ─── Update a course ──────────────────────────────────
router.put("/:courseId", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!isFacultyOrAdmin(currentUser)) {
        return res.status(403).json({ message: "Only faculty or admin can update courses." });
    }
    // FACULTY 只能改自己建的课，ADMIN 可全改
    const course = await courseDao.findCourseById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (currentUser.role === "FACULTY" && String(course.faculty) !== String(currentUser._id)) {
        return res.status(403).json({ message: "You can only edit your own courses." });
    }
    try {
        const result = await courseDao.updateCourse(req.params.courseId, req.body);
        res.json(result);
    } catch (err) {
        console.error("PUT /api/courses/:courseId error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ─── Delete a course ──────────────────────────────────
router.delete("/:courseId", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!isFacultyOrAdmin(currentUser)) {
        return res.status(403).json({ message: "Only faculty or admin can delete courses." });
    }
    const course = await courseDao.findCourseById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (currentUser.role === "FACULTY" && String(course.faculty) !== String(currentUser._id)) {
        return res.status(403).json({ message: "You can only delete your own courses." });
    }
    try {
        await courseDao.deleteCourse(req.params.courseId);
        res.sendStatus(204);
    } catch (err) {
        console.error("DELETE /api/courses/:courseId error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ─── Modules belonging to a course ────────────────────
router.get("/:courseId/modules", async (req, res) => {
    try {
        const mods = moduleDao.findModulesForCourse(req.params.courseId);
        res.json(mods);
    } catch (err) {
        console.error("GET /api/courses/:cid/modules error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/:courseId/modules", async (req, res) => {
    const { name } = req.body;
    if (!name?.trim()) {
        return res.status(400).json({ message: "Module name is required." });
    }
    try {
        const mod = await moduleDao.createModule({
            course: req.params.courseId,
            name,
            lessons: [],
            ...req.body
        });
        res.status(201).json(mod);
    } catch (err) {
        console.error("POST /api/courses/:cid/modules error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ─── Retrieve users enrolled in a course ───────────────
router.get("/:courseId/users", async (req, res) => {
    try {
        const users = await enrollmentsDao.findEnrollmentsForUser(req.params.courseId);
        res.json(users);
    } catch (err) {
        console.error("GET /api/courses/:cid/users error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
