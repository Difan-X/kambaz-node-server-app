import mongoose from "mongoose";
import courseSchema from "./schema.js";

const CourseModel = mongoose.model("CourseModel", courseSchema);
export default CourseModel;