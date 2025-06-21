import mongoose from "mongoose";
import { QuizSchema, QuestionSchema, AttemptSchema } from "./schema.js";

export const Quiz = mongoose.model("Quiz", QuizSchema);
export const Question = mongoose.model("Question", QuestionSchema);
export const Attempt = mongoose.model("Attempt", AttemptSchema);

