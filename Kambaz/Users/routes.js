import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    // Create new user
    app.post("/api/users", (req, res) => {
        const newUser = dao.createUser(req.body);
        res.json(newUser);
    });
    // Get all users
    app.get("/api/users", (req, res) => {
        res.json(dao.findAllUsers());
    });
    // Get user by ID
    app.get("/api/users/:userId", (req, res) => {
        const user = dao.findUserById(req.params.userId);
        if (user) res.json(user);
        else res.status(404).json({ message: "User not found" });
    });
    // Update user
    app.put("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;
        dao.updateUser(userId, userUpdates);
        const currentUser = dao.findUserById(userId);
        req.session.currentUser = currentUser; // 同步 session
        res.json(currentUser);
    });
    // Delete user
    app.delete("/api/users/:userId", (req, res) => {
        dao.deleteUser(req.params.userId);
        res.sendStatus(204);
    });

    // SIGNUP
    app.post("/api/users/signup", (req, res) => {
        const user = dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already in use" });
            return;
        }
        const currentUser = dao.createUser(req.body);
        req.session.currentUser = currentUser; // 存 session
        res.json(currentUser);
    });

    // SIGNIN
    app.post("/api/users/signin", (req, res) => {
        const { username, password } = req.body;
        const currentUser = dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session.currentUser = currentUser; // 存 session
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });

    // SIGNOUT
    app.post("/api/users/signout", (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    });

    // PROFILE
    app.post("/api/users/profile", (req, res) => {
        const currentUser = req.session.currentUser;
        if (currentUser) res.json(currentUser);
        else res.status(401).json({ message: "Not signed in" });
    });

    app.get("/api/users/:userId/courses", (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session.currentUser;
            if (!currentUser) return res.sendStatus(401);
            userId = currentUser._id;
        }
        const courses = courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    });

    app.post("/api/users/current/courses", (req, res) => {
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            return res.status(401).json({ message: "Not logged in" });
        }
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    });
}