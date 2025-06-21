import express from "express";
import * as dao from "./dao.js";
import { isAuthenticated, authorize } from "../Middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.use(isAuthenticated);

// —— Quiz List & Create ——
router.get("/", authorize(["FACULTY", "STUDENT", "ADMIN"]), async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesWithStatsByCourse(courseId);
    res.json(quizzes);
});
router.post("/", authorize(["FACULTY", "ADMIN"]), async (req, res) => {
    const { courseId } = req.params;
    try {
        const quiz = await dao.createQuiz(courseId);
        res.status(201).json(quiz);
    } catch (err) {
        console.error("Create quiz error:", err);
        res.status(500).json({ message: err.message });
    }
});

// —— Single Quiz ——
router.get("/:quizId", authorize(["FACULTY", "STUDENT", "ADMIN"]), async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
});
router.put("/:quizId", authorize(["FACULTY", "ADMIN"]), async (req, res) => {
    const { quizId } = req.params;
    const updated = await dao.updateQuiz(quizId, req.body);
    res.json(updated);
});
router.delete("/:quizId", authorize(["FACULTY", "ADMIN"]), async (req, res) => {
    await dao.deleteQuiz(req.params.quizId);
    res.sendStatus(204);
});
router.post("/:quizId/publish", authorize(["FACULTY", "ADMIN"]), async (req, res) => {
    const quiz = await dao.publishQuiz(req.params.quizId, true);
    res.json(quiz);
});
router.post("/:quizId/unpublish", authorize(["FACULTY", "ADMIN"]), async (req, res) => {
    const quiz = await dao.publishQuiz(req.params.quizId, false);
    res.json(quiz);
});

// —— Questions ——

// 查
router.get("/:quizId/questions", authorize(["FACULTY", "STUDENT", "ADMIN"]), async (req, res) => {
    const questions = await dao.findQuestionsByQuiz(req.params.quizId);
    res.json(questions);
});

// 批量保存（replace all）
router.post("/:quizId/questions", authorize(["FACULTY", "ADMIN"]), async (req, res) => {
    try {
        let questions = req.body;
        // 如果不是数组（比如是 {questions: [...]})，自动取出
        if (!Array.isArray(questions) && questions.questions && Array.isArray(questions.questions)) {
            questions = questions.questions;
        }
        if (!Array.isArray(questions)) {
            return res.status(400).json({ message: "Questions should be an array" });
        }
        const quizId = req.params.quizId;
        const saved = await dao.saveQuestionsForQuiz(quizId, questions);
        res.json(saved);
    } catch (e) {
        console.error('saveQuestions error:', e);
        res.status(500).json({ message: e.message });
    }
});

// 单题新增（可选，前端批量不用这个）
router.post("/:quizId/questions/single", authorize(["FACULTY", "ADMIN"]), async (req, res) => {
    const question = await dao.addQuestion(req.params.quizId, req.body);
    res.status(201).json(question);
});

// 单题改
router.put("/:quizId/questions/:questionId", authorize(["FACULTY", "ADMIN"]), async (req, res) => {
    const q = await dao.updateQuestion(req.params.questionId, req.body);
    res.json(q);
});

// 单题删
router.delete("/:quizId/questions/:questionId", authorize(["FACULTY", "ADMIN"]), async (req, res) => {
    await dao.deleteQuestion(req.params.questionId);
    res.sendStatus(204);
});

// —— Attempts ——
// 查
router.get("/:quizId/attempts/latest", authorize(["FACULTY", "STUDENT", "ADMIN"]), async (req, res) => {
    const attempt = await dao.findLatestAttempt(req.params.quizId, req.session.currentUser._id);
    res.json(attempt);
});
// 学生提交
router.post("/:quizId/attempts", authorize(["STUDENT"]), async (req, res) => {
    const { answers, score } = req.body;
    const studentId = req.session.currentUser._id;
    const count = await dao.countAttempts(req.params.quizId, studentId);
    const quiz = await dao.findQuizById(req.params.quizId);
    if (!quiz.multipleAttempts && count >= 1) {
        return res.status(403).json({ message: "No more attempts allowed" });
    }
    if (count >= quiz.howManyAttempts) {
        return res.status(403).json({ message: "Attempt limit reached" });
    }
    const attempt = await dao.createAttempt(req.params.quizId, studentId, answers, score);
    res.status(201).json(attempt);
});

router.get("/:quizId/attempts/count", authorize(["STUDENT", "FACULTY", "ADMIN"]), async (req, res) => {
    try {
        const { quizId } = req.params;
        const studentId = req.session.currentUser._id;
        const count = await dao.countAttempts(quizId, studentId);
        res.json({ count });
    } catch (err) {
        console.error('GET /:quizId/attempts/count error:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;