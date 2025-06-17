import express from "express";
import * as modulesDao from "./dao.js";
import * as moduleDao from "./dao.js";

const router = express.Router();

// GET    /api/courses/:courseId/modules → findModulesForCourse
router.get("/courses/:courseId/modules", async (req, res) => {
    const modules = modulesDao.findModulesForCourse(req.params.courseId);
    res.json(modules);
});

// POST   /api/courses/:courseId/modules → createModule
router.post("/courses/:courseId/modules", async (req, res) => {
    const moduleData = { ...req.body, course: req.params.courseId };
    const newModule = await modulesDao.createModule(moduleData);
    res.status(201).json(newModule);
});

// PUT    /api/modules/:moduleId → updateModule
router.put("/:moduleId", async (req, res) => {
    try {
        const updated = await moduleDao.updateModule(req.params.moduleId, req.body);
        if (!updated) return res.status(404).json({ message: "Module not found" });
        res.json(updated);
    } catch (err) {
        console.error("PUT /api/modules/:moduleId error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE /api/modules/:moduleId → deleteModule
router.delete("/:moduleId", async (req, res) => {
    try {
        await moduleDao.deleteModule(req.params.moduleId);
        res.sendStatus(204);
    } catch (err) {
        console.error("DELETE /api/modules/:moduleId error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


export default router;