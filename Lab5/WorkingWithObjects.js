const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const moduleObj = {
    id: "m1",
    name: "Express Basics",
    description: "Learn how to create Express routes",
    course: "CS5610",
};

export default function WorkingWithObjects(app) {
    // retrieve full object
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });

    // retrieve just title
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });

    // **update** title via path param
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    // GET /lab5/module
    app.get("/lab5/module", (req, res) => {
        res.json(moduleObj);
    });

    // GET /lab5/module/name
    app.get("/lab5/module/name", (req, res) => {
        res.json(moduleObj.name);
    });

    // GET /lab5/module/name/:newName  —— 更新 module.name
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        moduleObj.name = newName;
        res.json(moduleObj);
    });

    // GET /lab5/module/description/:newDesc  —— 更新 module.description
    app.get("/lab5/module/description/:newDesc", (req, res) => {
        const { newDesc } = req.params;
        moduleObj.description = newDesc;
        res.json(moduleObj);
    });

    // GET /lab5/assignment/score/:newScore
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = parseInt(newScore, 10);
        res.json(assignment);
    });

    // GET /lab5/assignment/completed/:status
    app.get("/lab5/assignment/completed/:status", (req, res) => {
        const { status } = req.params;
        assignment.completed = status === "true";
        res.json(assignment);
    });


}