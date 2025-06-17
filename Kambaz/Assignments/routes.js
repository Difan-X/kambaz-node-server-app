import express from "express";
import * as dao from "./dao.js";

const router = express.Router();

/** GET /api/courses/:courseId/assignments */
router.get(
    "/courses/:courseId/assignments",
    async (req, res) => {
        try {
            const { courseId } = req.params;
            const list = await dao.findAssignmentsForCourse(courseId);
            res.json(list);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
);

/** POST /api/courses/:courseId/assignments */
router.post(
    "/courses/:courseId/assignments",
    async (req, res) => {
        try {
            const { courseId } = req.params;
            const data = { ...req.body, course: courseId };
            const created = await dao.createAssignment(data);
            // return the newly-created document
            res.status(201).json(created);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
);

/** GET /api/assignments/:id */
router.get(
    "/assignments/:id",
    async (req, res) => {
        try {
            const a = await dao.findAssignmentById(req.params.id);
            if (!a) return res.status(404).json({ message: "Not found" });
            res.json(a);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
);

/** PUT /api/assignments/:id */
router.put(
    "/assignments/:id",
    async (req, res) => {
        try {
            const updated = await dao.updateAssignment(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: "Not found" });
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
);

/** DELETE /api/assignments/:id */
router.delete(
    "/assignments/:id",
    async (req, res) => {
        try {
            await dao.deleteAssignment(req.params.id);
            res.sendStatus(204);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
);

export default router;