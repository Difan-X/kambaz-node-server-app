import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import db from "../Database";
import type {Course, Enrollment} from "../Database/types";
import { v4 as uuidv4 } from "uuid";

/**
 * 3) Our slice’s state will hold:
 *    - an array `courses: Course[]`
 *    - an array `enrollments: Enrollment[]`
 *
 * Initially we copy from the Database’s in‐memory constants,
 * so anything we add/delete at runtime is ephemeral.
 */
interface CoursesState {
    courses: Course[];
    enrollments: Enrollment[];
}

const initialState: CoursesState = {
    courses: [...(db.courses as Course[])],
    enrollments: [...(db.enrollments as Enrollment[])],
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        /**
         * addCourse:
         *  - payload is everything except `_id`.
         *  - We generate a new unique `_id` via uuidv4() and append it.
         */
        addCourse: (state, action: PayloadAction<Omit<Course, "_id">>) => {
            const newCourse: Course = {
                _id: uuidv4(),
                ...action.payload,
            };
            state.courses.push(newCourse);
        },

        /**
         * updateCourse:
         *  - payload is a full Course (including its existing `_id`).
         *  - We replace the matching course in the array.
         */
        updateCourse: (state, action: PayloadAction<Course>) => {
            state.courses = state.courses.map((c) =>
                c._id === action.payload._id ? action.payload : c
            );
        },

        /**
         * deleteCourse:
         *  - payload is the course’s `_id` (string).
         *  - We filter it out of `state.courses`.
         *  - Also remove any enrollments referencing that course.
         */
        deleteCourse: (state, action: PayloadAction<string>) => {
            const courseId = action.payload;
            state.courses = state.courses.filter((c) => c._id !== courseId);
            state.enrollments = state.enrollments.filter(
                (en) => en.course !== courseId
            );
        },

        /**
         * enroll:
         *  - payload is `{ user: string, course: string }`
         *  - We push a new enrollment if it doesn’t already exist.
         */
        enroll: (state, action: PayloadAction<Enrollment>) => {
            const { user, course } = action.payload;
            // Only add if not already present
            const already = state.enrollments.find(
                (en) => en.user === user && en.course === course
            );
            if (!already) {
                state.enrollments.push({
                    user, course,
                    _id: ""
                });
            }
        },

        /**
         * unenroll:
         *  - payload is `{ user: string, course: string }`
         *  - We filter out that user–course pair.
         */
        unenroll: (state, action: PayloadAction<Enrollment>) => {
            const { user, course } = action.payload;
            state.enrollments = state.enrollments.filter(
                (en) => !(en.user === user && en.course === course)
            );
        },
    },
});

export const {
    addCourse,
    updateCourse,
    deleteCourse,
    enroll,
    unenroll,
} = coursesSlice.actions;

export default coursesSlice.reducer;