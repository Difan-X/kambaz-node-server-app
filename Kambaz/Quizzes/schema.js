import mongoose from "mongoose";

const { Schema } = mongoose;

const QuestionSchema = new Schema({
    _id: { type: String, required: true },
    quizId: { type: String, required: true, ref: "Quiz" },
    type: {
        type: String,
        enum: ["multiple_choice", "true_false", "fill_blank"],
        default: "multiple_choice",
    },
    title: { type: String, required: true },
    points: { type: Number, required: true, default: 1 },
    question: { type: String, required: true }, // HTML from WYSIWYG
    choices: [
        {
            text: String,
            isCorrect: Boolean,
        },
    ],
    correctBoolean: Boolean,
    blanks: [String],
}, { timestamps: true });

const QuizSchema = new Schema({
    _id: { type: String, required: true },
    courseId: { type: String, required: true, ref: "Course" },
    title: { type: String, required: true, default: "New Quiz" },
    description: String,
    quizType: {
        type: String,
        enum: ["graded_quiz", "practice_quiz", "graded_survey", "ungraded_survey"],
        default: "graded_quiz",
    },
    assignmentGroup: {
        type: String,
        enum: ["quizzes", "exams", "assignments", "project"],
        default: "quizzes",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, enum: ["never", "after_last_attempt", "immediately"], default: "after_last_attempt" },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    published: { type: Boolean, default: false },
}, { timestamps: true });

// 学生每次尝试记录
const AttemptSchema = new Schema({
    _id: { type: String, required: true },
    quizId: { type: String, required: true, ref: "Quiz" },
    studentId: { type: String, required: true, ref: "User" },
    answers: [
        {
            questionId: String,
            answer: Schema.Types.Mixed,
            correct: Boolean,
            pointsAwarded: Number,
        },
    ],
    score: Number,
    createdAt: { type: Date, default: Date.now },
}, { collection: "quizAttempts" });

export { QuestionSchema, QuizSchema, AttemptSchema };