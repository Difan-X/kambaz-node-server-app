import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

interface EnrollmentsState {
    enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
    enrollments: [],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
            state.enrollments = action.payload;
        },
    },
});

export const { setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;