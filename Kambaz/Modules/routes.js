import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    app.delete("/api/modules/:moduleId", (req, res) => {
        modulesDao.deleteModule(req.params.moduleId);
        res.sendStatus(204);
    });

    app.put("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        const updated = modulesDao.updateModule(moduleId, req.body);
        if (updated) res.json(updated);
        else res.status(404).json({ message: "Module not found" });
    });

    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = { ...req.body, course: courseId };
        const newModule = modulesDao.createModule(module);
        res.json(newModule);
    });

}