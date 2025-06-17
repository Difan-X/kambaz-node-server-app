import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

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

// Session with MongoDB Store
const sess = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO,
        touchAfter: 24 * 3600, // lazy session update (24 hours)
        dbName: 'kambaz', // 确保使用正确的数据库名
        collectionName: 'sessions' // session 集合名
    }),
    cookie: {
        // keep the cookie for 7 days (in ms)
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // 根据环境设置 secure 和 sameSite
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
};

// 生产环境额外设置
if (process.env.NODE_ENV === "production") {
    sess.proxy = true; // 信任反向代理
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