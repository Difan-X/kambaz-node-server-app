import { useState } from "react";
import { FormControl } from "react-bootstrap";

// Base URLs for assignment and module endpoints
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

export default function WorkingWithObjects() {
    // Local state for assignment object
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    // Local state for module object
    const [moduleObj, setModuleObj] = useState({
        id: "m1",
        name: "Express Basics",
        description: "Learn how to create Express routes",
        course: "CS5610",
    });

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            {/* Retrieve the full assignment object */}
            <h4>Retrieving Objects</h4>
            <a
                id="wd-retrieve-assignments"
                className="btn btn-primary me-2"
                href={ASSIGNMENT_API_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
                Get Assignment
            </a>
            <hr />

            {/* Retrieve just the assignment title */}
            <h4>Retrieving Properties</h4>
            <a
                id="wd-retrieve-assignment-title"
                className="btn btn-secondary me-2"
                href={`${ASSIGNMENT_API_URL}/title`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Get Title
            </a>
            <hr />

            {/* Update assignment title */}
            <h4>Modifying Title</h4>
            <FormControl
                id="wd-assignment-title"
                className="w-75 mb-2"
                type="text"
                value={assignment.title}
                onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })
                }
            />
            <a
                id="wd-update-assignment-title"
                className="btn btn-primary"
                href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(
                    assignment.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Update Title
            </a>
            <hr />

            {/* Module-related operations */}
            <h4>Module Object</h4>

            {/* Retrieve the full module object */}
            <a
                id="wd-retrieve-module"
                className="btn btn-primary me-2"
                href={MODULE_API_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
                Get Module
            </a>

            {/* Retrieve just the module name */}
            <a
                id="wd-retrieve-module-name"
                className="btn btn-secondary mb-2"
                href={`${MODULE_API_URL}/name`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Get Module Name
            </a>

            {/* Update module name */}
            <FormControl
                id="wd-module-name"
                className="w-75 mb-2"
                value={moduleObj.name}
                onChange={(e) =>
                    setModuleObj({ ...moduleObj, name: e.target.value })
                }
            />
            <a
                id="wd-update-module-name"
                className="btn btn-success me-2"
                href={`${MODULE_API_URL}/name/${encodeURIComponent(
                    moduleObj.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Update Module Name
            </a>

            {/* Update module description */}
            <FormControl
                id="wd-module-description"
                className="w-75 mb-2"
                value={moduleObj.description}
                onChange={(e) =>
                    setModuleObj({ ...moduleObj, description: e.target.value })
                }
            />
            <a
                id="wd-update-module-desc"
                className="btn btn-warning"
                href={`${MODULE_API_URL}/description/${encodeURIComponent(
                    moduleObj.description
                )}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Update Module Description
            </a>
            <hr />

            {/* Modify assignment score and completed status */}
            <h4>Modify Assignment Properties</h4>

            {/* Update score */}
            <FormControl
                id="wd-assignment-score"
                type="number"
                className="w-25 mb-2"
                value={assignment.score}
                onChange={(e) =>
                    setAssignment({ ...assignment, score: Number(e.target.value) })
                }
            />
            <a
                id="wd-update-assignment-score"
                className="btn btn-info me-2"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Update Score
            </a>

            {/* Update completed status */}
            <div className="form-check mb-2">
                <input
                    id="wd-assignment-completed"
                    className="form-check-input"
                    type="checkbox"
                    checked={assignment.completed}
                    onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })
                    }
                />
                <label
                    className="form-check-label"
                    htmlFor="wd-assignment-completed"
                >
                    Completed
                </label>
            </div>
            <a
                id="wd-update-assignment-completed"
                className="btn btn-dark"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Update Completed
            </a>
        </div>
    );
}