import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    FormControl
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as enrollmentsClient from "./Enrollments/client";
import { setEnrollments } from "./Enrollments/enrollmentsReducer";
import type { RootState } from "./store";

interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image?: string;
    description: string;
}

interface DashboardProps {
    courses: Course[];
    course: Course;
    setCourse: (course: Course) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
    editCourse: (course: Course) => void;
}

export default function Dashboard({
                                      courses,
                                      course,
                                      setCourse,
                                      addNewCourse,
                                      deleteCourse,
                                      updateCourse,
                                      editCourse,
                                  }: DashboardProps) {
    const isEditing = course._id && course._id !== "0";

    const dispatch = useDispatch();
    const enrollments = useSelector((state: RootState) => state.enrollmentsReducer.enrollments);
    const enrolledCourseIds = new Set(enrollments.map((e) => e.course));

    useEffect(() => {
        const fetchData = async () => {
            const serverEnrollments = await enrollmentsClient.fetchEnrollments();
            dispatch(setEnrollments(serverEnrollments));
        };
        fetchData();
    }, [dispatch]);

    const handleEnroll = async (courseId: string) => {
        await enrollmentsClient.enrollCourse(courseId);
        const updated = await enrollmentsClient.fetchEnrollments();
        dispatch(setEnrollments(updated));
    };

    const handleUnenroll = async (courseId: string) => {
        await enrollmentsClient.unenrollCourse(courseId);
        const updated = await enrollmentsClient.fetchEnrollments();
        dispatch(setEnrollments(updated));
    };

    return (
        <Container fluid className="p-3" id="wd-dashboard">
            {/* ======== Header ======== */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 id="wd-dashboard-title" className="h4 text-danger mb-0">
                    Dashboard
                </h1>
                <span id="wd-dashboard-published" className="text-muted small">
                    Published Courses ({courses.length})
                </span>
            </div>
            <hr />

            {/* ======== ADD / EDIT FORM ======== */}
            <div className="mb-4">
                <h5 className="d-flex justify-content-between align-items-center">
                    <span>{isEditing ? "Edit Course" : "New Course"}</span>
                    <div>
                        {!isEditing && (
                            <Button
                                id="wd-add-new-course-click"
                                variant="primary"
                                size="sm"
                                className="me-2"
                                onClick={addNewCourse}
                            >
                                Add
                            </Button>
                        )}
                        {isEditing && (
                            <Button
                                id="wd-update-course-click"
                                variant="warning"
                                size="sm"
                                onClick={updateCourse}
                            >
                                Update
                            </Button>
                        )}
                        {/* Reset按钮 */}
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                                setCourse({
                                    _id: "0",
                                    name: "",
                                    number: "",
                                    startDate: "",
                                    endDate: "",
                                    image: "/images/reactjs.jpg",
                                    description: "",
                                })
                            }
                            className="ms-2"
                        >
                            Reset
                        </Button>
                    </div>
                </h5>

                <FormControl
                    value={course.name}
                    placeholder="Course Name"
                    className="mb-2"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })}
                />

                <FormControl
                    as="textarea"
                    rows={3}
                    value={course.description}
                    placeholder="Course Description"
                    className="mb-2"
                    onChange={(e) =>
                        setCourse({ ...course, description: e.target.value })
                    }
                />
            </div>
            <hr />

            {/* ======== GRID OF COURSE CARDS ======== */}
            <Row id="wd-dashboard-courses" className="g-4 justify-content-start">
                {courses.map((c: Course) => {
                    const isEnrolled = enrolledCourseIds.has(c._id);
                    return (
                        <Col key={c._id} xs="auto">
                            <Card
                                style={{ width: 300 }}
                                className="h-100 shadow-sm position-relative d-flex flex-column"
                            >
                                <Link
                                    to={`/Kambaz/Courses/${c._id}/Home`}
                                    className="text-decoration-none text-body h-100 d-flex flex-column"
                                    style={{ flex: 1 }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={c.image || "/images/reactjs.jpg"}
                                        style={{ height: 140, objectFit: "cover" }}
                                    />
                                    <Card.Body className="flex-grow-1 d-flex flex-column">
                                        <Card.Title className="fs-6 text-truncate mb-1">
                                            {c.name}
                                            {isEnrolled && (
                                                <span className="ms-2 text-success" title="Enrolled">✔</span>
                                            )}
                                        </Card.Title>
                                        <Card.Text
                                            className="text-muted flex-grow-1 fs-7 text-truncate"
                                            style={{ maxHeight: "4.5em" }}
                                        >
                                            {c.description}
                                        </Card.Text>
                                        {/* Enroll/Unenroll按钮 */}
                                        <div>
                                            {isEnrolled ? (
                                                <Button
                                                    variant="outline-success"
                                                    size="sm"
                                                    className="mt-auto"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleUnenroll(c._id);
                                                    }}
                                                >
                                                    Unenroll
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    className="mt-auto"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleEnroll(c._id);
                                                    }}
                                                >
                                                    Enroll
                                                </Button>
                                            )}
                                        </div>
                                        <Button variant="outline-danger" size="sm" className="mt-2">
                                            Go
                                        </Button>
                                    </Card.Body>
                                </Link>
                                {/* Edit/Delete buttons */}
                                <Button
                                    id="wd-edit-course-click"
                                    variant="warning"
                                    size="sm"
                                    className="position-absolute"
                                    style={{ top: 8, right: 60 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        editCourse(c);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    id="wd-delete-course-click"
                                    variant="danger"
                                    size="sm"
                                    className="position-absolute"
                                    style={{ top: 8, right: 8 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        deleteCourse(c._id);
                                    }}
                                >
                                    Delete
                                </Button>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}