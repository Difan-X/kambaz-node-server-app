import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const assignmentSchema = new mongoose.Schema(
    {
        // 用 String 存 UUID，默认值自动生成
        _id: {
            type: String,
            default: uuidv4,
        },
        course: {
            type: String,       // 对应 Course._id（String）
            ref: "Course",
            required: true,
        },
        title: { type: String, required: true },
        description: String,
        module: String,
        notAvailable: String,
        dueDate: String,
        pts: Number,
    },
    { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);