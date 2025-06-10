import { useState, useEffect } from "react";
import { ListGroup, FormControl, FormCheck } from "react-bootstrap";
import { FaTrash, FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";
import type { Todo } from "./client";

export default function WorkingWithArraysAsynchronously() {
    // Add `editing` flag to each todo
    const [todos, setTodos] = useState<(Todo & { editing?: boolean })[]>([]);

    // Load todos on mount
    useEffect(() => {
        client.fetchTodos().then(setTodos);
    }, []);

    // Enter edit mode
    const editTodo = (id: number) => {
        setTodos(todos.map(t => t.id === id ? { ...t, editing: true } : t));
    };

    // Exit edit mode and persist updates via PUT
    const finishEdit = async (updated: Todo) => {
        await client.updateTodo(updated);
        setTodos(todos.map(t =>
            t.id === updated.id ? { ...updated, editing: false } : t
        ));
    };

    // Toggle completed via PUT
    const toggleCompleted = (todo: Todo, completed: boolean) => {
        finishEdit({ ...todo, completed });
    };

    // DELETE via HTTP DELETE
    const deleteTodo = async (todo: Todo) => {
        await client.deleteTodo(todo);
        setTodos(todos.filter(t => t.id !== todo.id));
    };

    // Legacy GET-delete (optional)
    const removeTodoLegacy = async (id: number) => {
        const updated = await client.removeTodo(id);
        setTodos(updated);
    };

    // Legacy GET-create (optional)
    const createTodoLegacy = async () => {
        const updated = await client.createTodo();
        setTodos(updated);
    };

    // POST-create
    const createTodoPost = async () => {
        const newTodo = await client.postTodo({
            title: "New Posted Todo",
            completed: false
        });
        setTodos([...todos, newTodo]);
    };

    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            <h4>
                Todos
                <FaPlusCircle
                    onClick={createTodoLegacy}
                    className="text-success ms-2"
                    style={{ cursor: "pointer", verticalAlign: "middle" }}
                    id="wd-create-todo-legacy"
                />
                <FaPlusCircle
                    onClick={createTodoPost}
                    className="text-primary ms-2"
                    style={{ cursor: "pointer", verticalAlign: "middle" }}
                    id="wd-post-todo"
                />
            </h4>

            <ListGroup>
                {todos.map((todo) => (
                    <ListGroup.Item
                        key={todo.id}
                        className="d-flex align-items-center"
                    >
                        {/* Checkbox always on the left */}
                        <FormCheck
                            className="me-3"
                            checked={todo.completed}
                            onChange={(e) => toggleCompleted(todo, e.target.checked)}
                        />

                        {/* Title or inline editor */}
                        {todo.editing ? (
                            <FormControl
                                className="flex-grow-1 me-3"
                                value={todo.title}
                                autoFocus
                                onChange={(e) =>
                                    setTodos(todos.map(t =>
                                        t.id === todo.id ? { ...t, title: e.target.value } : t
                                    ))
                                }
                                onBlur={(e) =>
                                    finishEdit({ ...todo, title: (e.target as HTMLInputElement).value })
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur(); // triggers onBlur
                                    }
                                }}
                            />
                        ) : (
                            <span className="flex-grow-1">{todo.title}</span>
                        )}

                        {/* Edit icon */}
                        <FaPencilAlt
                            onClick={() => editTodo(todo.id)}
                            className="text-secondary me-3"
                            style={{ cursor: "pointer" }}
                            id={`wd-edit-todo-${todo.id}`}
                        />
                        {/* DELETE via HTTP DELETE */}
                        <TiDelete
                            onClick={() => deleteTodo(todo)}
                            className="text-danger me-3"
                            style={{ cursor: "pointer", fontSize: "1.25rem" }}
                            id={`wd-delete-todo-${todo.id}`}
                        />
                        {/* Legacy trash icon */}
                        <FaTrash
                            onClick={() => removeTodoLegacy(todo.id)}
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            id={`wd-remove-todo-legacy-${todo.id}`}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}