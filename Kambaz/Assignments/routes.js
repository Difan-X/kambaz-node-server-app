import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        res.json(dao.findAssignmentsForCourse(courseId));
    });

    app.get("/api/assignments/:id", (req, res) => {
        const assignment = dao.findAssignmentById(req.params.id);
        if (assignment) res.json(assignment);
        else res.status(404).json({ message: "Not found" });
    });

    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const newAssignment = dao.createAssignment({ ...req.body, courseId });
        res.json(newAssignment);
    });

    app.put("/api/assignments/:id", (req, res) => {
        const updated = dao.updateAssignment(req.params.id, req.body);
        if (updated) res.json(updated);
        else res.status(404).json({ message: "Not found" });
    });

    app.delete("/api/assignments/:id", (req, res) => {
        const deleted = dao.deleteAssignment(req.params.id);
        if (deleted) res.sendStatus(204);
        else res.status(404).json({ message: "Not found" });
    });
}