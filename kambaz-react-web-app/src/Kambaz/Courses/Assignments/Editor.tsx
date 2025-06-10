import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Row, Col, Card, FormControl, Button, Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
    type Assignment,
    addAssignment,
    updateAssignment,
} from "./assignmentsReducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string; aid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const allAssignments: Assignment[] = useSelector(
        (state: RootState) => state.assignmentsReducer.assignments
    );

    const existing = allAssignments.find((a) => a._id === aid);

    const [formState, setFormState] = useState<Partial<Assignment>>({
        _id: "new",
        courseId: cid || "",
        title: "",
        module: "",
        notAvailable: "",
        due: "",
        pts: 100,
        description: "",
    });

    useEffect(() => {
        if (aid && aid !== "new") {
            if (!existing) {
                assignmentsClient.fetchAssignmentById(aid)
                    .then(data => setFormState(data))
                    .catch(() => navigate(`/Kambaz/Courses/${cid}/Assignments`, { replace: true }));
            } else {
                setFormState({ ...existing });
            }
        }
    }, [aid, existing, navigate, cid]);

    if (!formState) return null;

    const onSave = async () => {
        let savedAssignment: Assignment;
        if (aid === "new") {
            savedAssignment = await assignmentsClient.createAssignment(cid!, formState);
            dispatch(addAssignment(savedAssignment));
        } else {
            savedAssignment = await assignmentsClient.updateAssignment(aid!, formState);
            dispatch(updateAssignment(savedAssignment));
        }
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    const onCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="p-4">
            <h4 className="text-danger mb-3">
                {cid} &gt; Assignments &gt;{" "}
                {aid === "new" ? "New Assignment" : formState.title}
            </h4>
            <hr />
            <Row>
                <Col xl={8}>
                    <Form>
                        <Form.Group controlId="wd-name" className="mb-4">
                            <Form.Label>Assignment Name</Form.Label>
                            <FormControl
                                type="text"
                                value={formState.title || ""}
                                placeholder="New Assignment"
                                onChange={(e) =>
                                    setFormState({ ...formState, title: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="wd-description" className="mb-4">
                            <Form.Label>Description</Form.Label>
                            <FormControl
                                as="textarea"
                                rows={6}
                                value={formState.description || ""}
                                placeholder="New Assignment Description"
                                onChange={(e) =>
                                    setFormState({ ...formState, description: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Col>
                <Col xl={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Form.Group controlId="wd-points" className="mb-3">
                                <Form.Label>Points</Form.Label>
                                <FormControl
                                    type="number"
                                    value={formState.pts !== undefined ? formState.pts : 100}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            pts: parseInt(e.target.value, 10) || 0,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="wd-module" className="mb-3">
                                <Form.Label>Module</Form.Label>
                                <FormControl
                                    type="text"
                                    value={formState.module || ""}
                                    placeholder="e.g. Week 1: Basics"
                                    onChange={(e) =>
                                        setFormState({ ...formState, module: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="wd-due-date" className="mb-3">
                                <Form.Label>Due</Form.Label>
                                <FormControl
                                    type="date"
                                    value={(formState.due || "").split(" at")[0]}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            due: e.target.value + " at 11:59pm",
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="wd-not-available" className="mb-3">
                                <Form.Label>Not available until</Form.Label>
                                <FormControl
                                    type="date"
                                    value={(formState.notAvailable || "").split(" at")[0]}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            notAvailable: e.target.value + " at 12:00am",
                                        })
                                    }
                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4">
                <Button
                    variant="light"
                    className="me-2"
                    onClick={onCancel}
                    id="wd-cancel-assignment-btn"
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={onSave}
                    id="wd-save-assignment-btn"
                >
                    Save
                </Button>
            </div>
        </div>
    );
}