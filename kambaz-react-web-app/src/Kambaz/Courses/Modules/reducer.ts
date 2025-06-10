import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Module {
    _id: string;
    course: string;
    name: string;
    lessons: string[];
    editing?: boolean;
}

interface ModulesState {
    modules: Module[];
}

const initialState: ModulesState = {
    modules: [],
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setModules: (state, action: PayloadAction<Module[]>) => {
            state.modules = action.payload;
        },
        addModule: (state, action: PayloadAction<Module>) => {
            state.modules.push(action.payload);
        },
        deleteModule: (state, action: PayloadAction<string>) => {
            state.modules = state.modules.filter((m) => m._id !== action.payload);
        },
        updateModule: (state, action: PayloadAction<Module>) => {
            state.modules = state.modules.map((m) =>
                m._id === action.payload._id ? action.payload : m
            );
        },
        editModule: (state, action: PayloadAction<string>) => {
            state.modules = state.modules.map((m) =>
                m._id === action.payload ? { ...m, editing: true } : m
            );
        },
    },
});

export const { setModules, addModule, deleteModule, updateModule, editModule } =
    modulesSlice.actions;
export default modulesSlice.reducer;