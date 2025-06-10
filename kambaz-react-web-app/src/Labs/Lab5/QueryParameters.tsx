import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function QueryParameters() {
    const [a, setA] = useState("34");
    const [b, setB] = useState("23");

    return (
        <div id="wd-query-parameters">
            <h3>Query Parameters</h3>

            <FormControl
                id="wd-query-parameter-a"
                className="mb-2"
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
            />
            <FormControl
                id="wd-query-parameter-b"
                className="mb-2"
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
            />

            <div className="d-flex flex-wrap mb-2">
                <a
                    id="wd-query-parameter-add"
                    className="btn btn-primary me-2 mb-2"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Add {a} + {b}
                </a>
                <a
                    id="wd-query-parameter-subtract"
                    className="btn btn-danger me-2 mb-2"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Subtract {a} - {b}
                </a>
                <a
                    id="wd-query-parameter-multiply"
                    className="btn btn-success me-2 mb-2"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Multiply {a} × {b}
                </a>
                <a
                    id="wd-query-parameter-divide"
                    className="btn btn-warning mb-2"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Divide {a} ÷ {b}
                </a>
            </div>

            <hr />
        </div>
    );
}