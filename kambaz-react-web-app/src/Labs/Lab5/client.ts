import axios from "axios";

export async function fetchWelcomeMessage(): Promise<string> {
    const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
    const response = await axios.get(`${REMOTE_SERVER}/lab5/hello`);
    return response.data; // or .message
}

// Base URL for the Lab5 HTTP server
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

// URL for the assignment endpoint
const ASSIGNMENT_API = `${REMOTE_SERVER}/lab5/assignment`;

/**
 * Represents the Assignment object returned by the server.
 */
export interface Assignment {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
    score: number;
}

/**
 * Fetch the full assignment object.
 * @returns Promise resolving to the Assignment object
 */
export const fetchAssignment = async (): Promise<Assignment> => {
    const response = await axios.get<Assignment>(ASSIGNMENT_API);
    return response.data;
};

/**
 * Update the assignment's title.
 * @param title the new title string
 * @returns Promise resolving to the updated Assignment object
 */
export const updateTitle = async (
    title: string
): Promise<Assignment> => {
    const url = `${ASSIGNMENT_API}/title/${encodeURIComponent(title)}`;
    const response = await axios.get<Assignment>(url);
    return response.data;
};

// URL for the todos endpoint
const TODOS_API = `${REMOTE_SERVER}/lab5/todos`;

/**
 * Represents a single Todo item.
 */
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    description?: string;
}

/**
 * Fetches the full todos array from the server.
 * @returns Promise resolving to an array of Todo items
 */
export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(TODOS_API);
    return response.data;
};

/**
 * Delete a todo by ID.
 * @returns Promise resolving to the updated todos array
 * @param id
 */
export const removeTodo = async (id: number): Promise<Todo[]> => {
    const response = await axios.get(`${TODOS_API}/${id}/delete`);
    return response.data;
};

/**
 * Creates a new todo item on the server.
 * @returns Promise resolving to the updated array of todos
 */
export const createTodo = async (): Promise<never[]> => {
    const response = await axios.get(`${TODOS_API}/create`);
    return response.data;
};

/**
 * Posts a new todo via HTTP POST.
 * @param todo Partial todo object (title, completed, …)
 * @returns Promise resolving to the newly created todo item
 */
export const postTodo = async (todo: {
    title: string;
    completed: boolean;
}): Promise<Todo> => {
    const response = await axios.post<Todo>(TODOS_API, todo);
    return response.data;
};

/**
 * Deletes a todo via HTTP DELETE.
 * @param todo the Todo item to delete
 * @returns Promise resolving to the HTTP response data (ignored)
 */
export const deleteTodo = async (todo: { id: number }): Promise<void> => {
    await axios.delete(`${TODOS_API}/${todo.id}`);
};

/**
 * Update an existing todo via HTTP PUT.
 * @param todo the full Todo object (must include id)
 * @returns Promise resolving to nothing (status only)
 */
export const updateTodo = async (todo: Todo): Promise<void> => {
    await axios.put(`${TODOS_API}/${todo.id}`, todo);
};