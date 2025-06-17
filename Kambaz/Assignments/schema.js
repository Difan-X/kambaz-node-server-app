import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        course: {
            type: String,
            ref: "Course",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: String,
        dueDate: Date,
    },
    {
        collection: "assignments",
        timestamps: true,
    }
);

export default assignmentSchema;