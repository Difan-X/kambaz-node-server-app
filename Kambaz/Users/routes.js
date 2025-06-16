import * as dao from "./dao.js";
import bcrypt from "bcrypt";

export default function UserRoutes(app) {
    // Create a new user
    app.post("/api/users", async (req, res) => {
        try {
            const created = await dao.createUser(req.body);
            res.status(201).json(created);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // GET /api/users (all, or filtered by ?role or ?name)
    app.get("/api/users", async (req, res) => {
        const { role, name } = req.query;
        if (role) {
            return res.json(await dao.findUsersByRole(role));
        }
        if (name) {
            return res.json(await dao.findUsersByPartialName(name));
        }
        res.json(await dao.findAllUsers());
    });

    // GET /api/users/:userId
    app.get("/api/users/:userId", async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    });

    // POST /api/users/signin
    app.post("/api/users/signin", async (req, res) => {
        const { username, password } = req.body;
        const user = await dao.findUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.currentUser = user;
            return res.json(user);
        }
        res.status(401).json({ message: "Invalid credentials" });
    });

    // POST /api/users/signup
    app.post("/api/users/signup", async (req, res) => {
        if (await dao.findUserByUsername(req.body.username)) {
            return res.status(400).json({ message: "Username taken" });
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await dao.createUser({ ...req.body, password: hash });
        req.session.currentUser = newUser;
        res.json(newUser);
    });

    // POST /api/users/profile
    app.post("/api/users/profile", (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ message: "Not signed in" });
        }
        res.json(req.session.currentUser);
    });

    // POST /api/users/signout
    app.post("/api/users/signout", (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    });

    // PUT /api/users/:userId
    app.put("/api/users/:userId", async (req, res) => {
        const result = await dao.updateUser(req.params.userId, req.body);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const updated = await dao.findUserById(req.params.userId);
        // sync session if updating the current user
        if (req.session.currentUser?._id === req.params.userId) {
            req.session.currentUser = updated;
        }
        res.json(updated);
    });

    // DELETE /api/users/:userId
    app.delete("/api/users/:userId", async (req, res) => {
        const result = await dao.deleteUser(req.params.userId);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.sendStatus(204);
    });
}