import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        const user = req.session.currentUser;
        if (!user) return res.status(401).json({ message: "Not logged in" });
        const enrollments = enrollmentsDao.findEnrollmentsForUser(user._id);
        res.json(enrollments);
    });


    app.post("/api/enrollments/:courseId", (req, res) => {
        const user = req.session.currentUser;
        if (!user) return res.status(401).json({ message: "Not logged in" });
        const courseId = req.params.courseId;
        enrollmentsDao.enrollUserInCourse(user._id, courseId);
        res.sendStatus(204);
    });

    app.delete("/api/enrollments/:courseId", (req, res) => {
        const user = req.session.currentUser;
        if (!user) return res.status(401).json({ message: "Not logged in" });
        const courseId = req.params.courseId;
        enrollmentsDao.unenrollUserFromCourse(user._id, courseId);
        res.sendStatus(204);
    });
}