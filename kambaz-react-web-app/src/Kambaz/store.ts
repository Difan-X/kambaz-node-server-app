import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer"
import assignmentsReducer from "./Courses/Assignments/assignmentsReducer";
import courseReducer from "./Courses/courseReducer";
import enrollmentsReducer from "./Enrollments/enrollmentsReducer";



const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentsReducer,
        courses: courseReducer,
        enrollmentsReducer,
    },
});

export default store;

// Add these two lines to export RootState and AppDispatch:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;