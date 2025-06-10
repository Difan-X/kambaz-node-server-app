export default function PathParameters(app) {
    // add
    app.get("/lab5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a, 10) + parseInt(b, 10);
        res.send(result.toString());
    });

    // subtract
    app.get("/lab5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a, 10) - parseInt(b, 10);
        res.send(result.toString());
    });

    // multiply
    app.get("/lab5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a, 10) * parseInt(b, 10);
        res.send(result.toString());
    });

    // divide
    app.get("/lab5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a, 10) / parseInt(b, 10);
        res.send(result.toString());
    });
}