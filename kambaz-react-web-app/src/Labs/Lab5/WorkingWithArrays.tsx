import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

// Base URL for todos endpoint
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const TODOS_API = `${REMOTE_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
    // State for todo item: id, title, completed status and description
    const [todo, setTodo] = useState<{
        id: string;
        title: string;
        completed: boolean;
        description: string;
    }>({
        id: "1",
        title: "",
        completed: false,
        description: "",
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>

            {/* Retrieving the full todos array */}
            <h4>Retrieving Arrays</h4>
            <a
                id="wd-retrieve-todos"
                className="btn btn-primary me-2"
                href={TODOS_API}
                target="_blank"
                rel="noopener noreferrer"
            >
                Get Todos
            </a>
            <hr />

            {/* Retrieve a single todo by ID */}
            <h4>Retrieving an Item from an Array by ID</h4>
            <FormControl
                id="wd-todo-id"
                type="number"
                className="w-50 mb-2"
                value={todo.id}
                onChange={(e) =>
                    // preserve other fields when updating id
                    setTodo({ ...todo, id: e.target.value })
                }
            />
            <a
                id="wd-retrieve-todo-by-id"
                className="btn btn-primary"
                href={`${TODOS_API}/${todo.id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Get Todo by ID
            </a>
            <hr />

            {/* Filtering array items by completed=true */}
            <h4>Filtering Array Items</h4>
            <a
                id="wd-retrieve-completed-todos"
                className="btn btn-primary"
                href={`${TODOS_API}?completed=true`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Get Completed Todos
            </a>
            <hr />

            {/* Creating new items in the todos array */}
            <h4>Creating New Items in an Array</h4>
            <a
                id="wd-create-todo"
                className="btn btn-primary"
                href={`${TODOS_API}/create`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Create Todo
            </a>
            <hr />

            {/* Deleting from an array by ID */}
            <h4>Deleting from an Array</h4>
            <FormControl
                id="wd-todo-id-delete"
                type="number"
                className="w-50 mb-2"
                value={todo.id}
                onChange={(e) =>
                    // preserve other fields when updating id
                    setTodo({ ...todo, id: e.target.value })
                }
            />
            <a
                id="wd-delete-todo"
                className="btn btn-danger"
                href={`${TODOS_API}/${todo.id}/delete`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Delete Todo with ID = {todo.id}
            </a>
            <hr />

            {/* Updating an item in an array */}
            <h4>Updating Title Property</h4>
            <FormControl
                id="wd-update-todo-id"
                type="number"
                className="w-25 me-2 float-start"
                value={todo.id}
                onChange={(e) =>
                    setTodo({ ...todo, id: e.target.value })
                }
            />
            <FormControl
                id="wd-update-todo-title"
                type="text"
                className="w-50 float-start"
                value={todo.title}
                onChange={(e) =>
                    setTodo({ ...todo, title: e.target.value })
                }
            />
            <a
                id="wd-update-todo"
                className="btn btn-primary float-end"
                href={`${TODOS_API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Update Todo
            </a>
            <div style={{ clear: "both" }}></div>
            <hr />

            {/* Updating completed status */}
            <h4>Modify Completed Property</h4>
            <FormCheck
                id="wd-todo-completed-checkbox"
                label={`Completed = ${todo.completed}`}
                className="mb-2"
                checked={todo.completed}
                onChange={(e) =>
                    setTodo({ ...todo, completed: e.target.checked })
                }
            />
            <a
                id="wd-update-todo-completed"
                className="btn btn-info mb-3"
                href={`${TODOS_API}/${todo.id}/completed/${todo.completed}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Complete Todo ID = {todo.id}
            </a>
            <hr />

            {/* Updating description */}
            <h4>Modify Description Property</h4>
            <FormControl
                id="wd-todo-description-input"
                type="text"
                className="w-75 mb-2"
                value={todo.description}
                onChange={(e) =>
                    setTodo({ ...todo, description: e.target.value })
                }
            />
            <a
                id="wd-update-todo-description"
                className="btn btn-warning"
                href={`${TODOS_API}/${todo.id}/description/${encodeURIComponent(
                    todo.description
                )}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Describe Todo ID = {todo.id}
            </a>
            <hr />
        </div>
    );
}