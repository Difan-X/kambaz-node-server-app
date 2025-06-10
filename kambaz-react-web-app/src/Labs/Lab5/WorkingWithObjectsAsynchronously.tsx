import { useEffect, useState } from "react";
import { FormControl, FormCheck, Button } from "react-bootstrap";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
    // Local state for the assignment object
    const [assignment, setAssignment] = useState<{
        id?: number;
        title?: string;
        description?: string;
        due?: string;
        completed?: boolean;
        score?: number;
    }>({});

    // Fetch assignment on component mount
    const fetchAssignment = async () => {
        const data = await client.fetchAssignment();
        setAssignment(data);
    };

    // Update the title on the server and refresh state
    const updateTitle = async (title: string) => {
        const updated = await client.updateTitle(title);
        setAssignment(updated);
    };

    // Trigger fetch on first render
    useEffect(() => {
        fetchAssignment();
    }, []);

    return (
        <div id="wd-asynchronous-objects">
            <h3>Working with Objects Asynchronously</h3>
            <h4>Assignment</h4>

            {/* Text input to edit title */}
            <FormControl
                className="mb-2"
                value={assignment.title || ""}
                onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })
                }
            />

            {/* Textarea for description */}
            <FormControl
                as="textarea"
                rows={3}
                className="mb-2"
                value={assignment.description || ""}
                onChange={(e) =>
                    setAssignment({ ...assignment, description: e.target.value })
                }
            />

            {/* Date picker for due date */}
            <FormControl
                type="date"
                className="mb-2"
                value={assignment.due || ""}
                onChange={(e) =>
                    setAssignment({ ...assignment, due: e.target.value })
                }
            />

            {/* Checkbox for completed status */}
            <FormCheck
                type="switch"
                id="wd-completed"
                label="Completed"
                className="mb-2"
                checked={assignment.completed || false}
                onChange={(e) =>
                    setAssignment({ ...assignment, completed: e.target.checked })
                }
            />

            {/* Button to send update-title request */}
            <Button
                className="mb-3"
                onClick={() => updateTitle(assignment.title || "")}
            >
                Update Title
            </Button>

            {/* Display the full assignment object for debug */}
            <pre>{JSON.stringify(assignment, null, 2)}</pre>
            <hr />
        </div>
    );
}