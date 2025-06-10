let todos = [
    { id: 1, title: "Task 1", completed: false, description: "First task" },
    { id: 2, title: "Task 2", completed: true,  description: "Second task" },
    { id: 3, title: "Task 3", completed: false, description: "Third task" },
    { id: 4, title: "Task 4", completed: true,  description: "Fourth task" },
];

export default function WorkingWithArrays(app) {
    // GET /lab5/todos — returns all or only those matching ?completed=true/false
    app.get("/lab5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            // convert string to boolean
            const completedBool = completed === "true";
            // filter by completed property
            const filtered = todos.filter((t) => t.completed === completedBool);
            return res.json(filtered);
        }
        // no filter => return entire array
        res.json(todos);
    });

    // GET /lab5/todos/create — create a new todo and return the updated array
    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),     // generate a unique ID based on timestamp
            title: "New Task",            // default title for new items
            completed: false,             // default completion status
        };
        todos.push(newTodo);
        res.json(todos);                // respond with the full array including new item
    });

    // DELETE todo by ID via GET /lab5/todos/:id/delete
    app.get("/lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const index = todos.findIndex(t => t.id === parseInt(id, 10));
        if (index !== -1) {
            todos.splice(index, 1);        // remove the item
        }
        // respond with updated array
        res.json(todos);
    });

    // GET /lab5/todos/:id/title/:title — update the title of a todo
    app.get("/lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        // find the todo by id
        const todo = todos.find(t => t.id === parseInt(id, 10));
        if (todo) {
            todo.title = title;    // update the title property
        }
        // respond with the full updated array
        res.json(todos);
    });

    // GET /lab5/todos/:id — retrieve a single todo by ID
    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id, 10));
        res.json(todo);
    });

    // Update completed status of a todo
    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find(t => t.id === parseInt(id, 10));
        if (todo) {
            todo.completed = completed === "true";
        }
        res.json(todos);
    });

    // Update description of a todo
    app.get("/lab5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find(t => t.id === parseInt(id, 10));
        if (todo) {
            todo.description = description;
        }
        res.json(todos);
    });

    // Legacy GET-based create (keep for backward compatibility)
    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false
        };
        todos.push(newTodo);
        res.json(todos);
    });

    // New POST-based create: read JSON from body, assign ID, return only the new item
    app.post("/lab5/todos", (req, res) => {
        // new todo data comes in req.body
        const newTodo = {
            ...req.body,
            id: new Date().getTime()
        };
        todos.push(newTodo);
        res.json(newTodo);
    });

    // DELETE /lab5/todos/:id — delete with error if not found
    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex(t => t.id === parseInt(id, 10));
        if (todoIndex === -1) {
            // send 404 and JSON error message
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(todoIndex, 1);
        res.sendStatus(200);
    });

    // PUT /lab5/todos/:id — update with error if not found
    app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex(t => t.id === parseInt(id, 10));
        if (todoIndex === -1) {
            // send 404 and JSON error message
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        // merge existing with req.body
        todos = todos.map(t => {
            if (t.id === parseInt(id, 10)) {
                return { ...t, ...req.body };
            }
            return t;
        });
        res.sendStatus(200);
    });
}