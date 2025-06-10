import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function PathParameters() {
    const [a, setA] = useState("6");
    const [b, setB] = useState("4");

    return (
        <div id="wd-path-parameters">
            <h3>Path Parameters</h3>
            <FormControl
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="mb-2"
            />
            <FormControl
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="mb-2"
            />
            <div className="d-flex gap-2 mb-2">
                <a
                    className="btn btn-primary"
                    href={`${REMOTE_SERVER}/lab5/add/${a}/${b}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Add
                </a>
                <a
                    className="btn btn-danger"
                    href={`${REMOTE_SERVER}/lab5/subtract/${a}/${b}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Subtract
                </a>
                <a
                    className="btn btn-success"
                    href={`${REMOTE_SERVER}/lab5/multiply/${a}/${b}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Multiply
                </a>
                <a
                    className="btn btn-warning"
                    href={`${REMOTE_SERVER}/lab5/divide/${a}/${b}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Divide
                </a>
            </div>
            <hr />
        </div>
    );
}