import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.json(courses);
    });

    app.post("/api/courses", (req, res) => {
        const newCourse = dao.createCourse(req.body);
        const user = req.session.currentUser;
        if (user) {
            dao.enrollUserToCourse(user._id, newCourse._id);
        }
        res.json(newCourse);
    });

    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const updated = dao.updateCourse(courseId, courseUpdates);
        if (updated) res.json(updated);
        else res.status(404).json({ message: "Course not found" });
    });

    app.delete("/api/courses/:id", (req, res) => {
        dao.deleteCourse(req.params.id);
        res.sendStatus(204);
    });

    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.json(newModule);
    });

    app.put("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        const updated = modulesDao.updateModule(moduleId, req.body);
        if (updated) res.json(updated);
        else res.status(404).json({ message: "Module not found" });
    });

    app.delete("/api/modules/:moduleId", (req, res) => {
        modulesDao.deleteModule(req.params.moduleId);
        res.sendStatus(204);
    });

}