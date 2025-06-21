import { v4 as uuidv4 } from "uuid";
import { Quiz, Question, Attempt } from "./model.js";

/** Quiz CRUD **/
export const createQuiz = async (courseId) => {
    return await Quiz.create({ _id: uuidv4(), courseId });
};
export const findQuizzesByCourse = (courseId) =>
    Quiz.find({ courseId }).exec();
export const findQuizById = (quizId) =>
    Quiz.findById(quizId).exec();
export const updateQuiz = (quizId, updates) =>
    Quiz.findByIdAndUpdate(quizId, { $set: updates }, { new: true }).exec();
export const deleteQuiz = (quizId) =>
    Quiz.findByIdAndDelete(quizId).exec();
export const publishQuiz = (quizId, published = true) =>
    Quiz.findByIdAndUpdate(quizId, { $set: { published } }, { new: true }).exec();

/** Question CRUD **/

// 批量保存题目（前端批量保存时用这个）：
export const saveQuestionsForQuiz = async (quizId, questions) => {
    await Question.deleteMany({ quizId }); // 先删
    const prepared = questions.map(q => ({
        ...q,
        quizId,
        _id: q._id || uuidv4() // 补 _id
    }));
    return Question.insertMany(prepared);
};

export const findQuestionsByQuiz = (quizId) =>
    Question.find({ quizId }).exec();

export const addQuestion = (quizId, questionData) =>
    Question.create({ _id: uuidv4(), quizId, ...questionData });

export const updateQuestion = (questionId, updates) =>
    Question.findByIdAndUpdate(questionId, { $set: updates }, { new: true }).exec();

export const deleteQuestion = (questionId) =>
    Question.findByIdAndDelete(questionId).exec();

export const findQuizzesWithStatsByCourse = async (courseId) => {
    const quizzes = await Quiz.find({ courseId }).lean();
    const results = await Promise.all(
        quizzes.map(async quiz => {
            const questions = await Question.find({ quizId: quiz._id });
            return {
                ...quiz,
                questionsCount: questions.length,
                pointsTotal: questions.reduce((acc, q) => acc + (q.points || 1), 0)
            };
        })
    );
    return results;
};

/** Attempt CRUD **/
export const createAttempt = (quizId, studentId, answers, score) => {
    return Attempt.create({
        _id: uuidv4(),
        quizId,
        studentId,
        answers,
        score,
    });
};
export const findLatestAttempt = (quizId, studentId) =>
    Attempt.findOne({ quizId, studentId }).sort({ createdAt: -1 }).exec();
export const countAttempts = (quizId, studentId) =>
    Attempt.countDocuments({ quizId, studentId }).exec();
