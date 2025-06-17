import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import session from "express-session";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameters.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";

import userRouter       from "./Kambaz/Users/routes.js";
import courseRouter     from "./Kambaz/Courses/routes.js";
import moduleRouter     from "./Kambaz/Modules/routes.js";
import assignmentRouter from "./Kambaz/Assignments/routes.js";
import enrollmentRouter from "./Kambaz/Enrollments/routes.js";

const app = express();

// MongoDB 连接
const MONGO = process.env.MONGO_CONNECTION_STRING ||
    "mongodb://127.0.0.1:27017/kambaz";
mongoose
    .connect(MONGO)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((e) => {
        console.error("❌ MongoDB error", e);
        process.exit(1);
    });

// CORS
const allowed = [
    process.env.NETLIFY_URL   || "http://localhost:5173",
    process.env.NODE_SERVER_DOMAIN || "http://localhost:4000",
];
app.use(
    cors({
        origin: allowed,
        credentials: true,
    })
);

// Session
const sess = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
        // keep the cookie for 7 days (in ms)
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // local dev over HTTP:
        secure: false,
        sameSite: "lax",
    },
};
if (process.env.NODE_ENV === "production") {
    // in real HTTPS production, allow cross-site cookies
    sess.proxy = true;
    sess.cookie.secure = true;     // only send over HTTPS
    sess.cookie.sameSite = "none"; // allow cross-site
    // sess.cookie.domain = "your-domain.com"; // optionally lock to your domain
}
app.use(session(sess));
app.use(express.json());

// 挂载路由
app.use("/api/users",       userRouter);
app.use("/api/courses",     courseRouter);
app.use("/api/modules", moduleRouter);
app.use("/api", assignmentRouter);
app.use("/api/enrollments", enrollmentRouter);

// 其他示例路由
Hello(app);
Lab5(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);
WorkingWithArrays(app);

// 启动
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));