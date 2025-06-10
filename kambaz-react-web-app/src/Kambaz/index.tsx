import { Route, Routes, Navigate } from "react-router-dom";
import KambazNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useState, useEffect } from "react";
import * as courseClient from "./Courses/client";

interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image?: string;
    description: string;
    department?: string;
    credits?: number;
    author?: string;
}

export default function Kambaz() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [course, setCourse] = useState<Course>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
        department: "",
        credits: 3,
        author: "",
    });

    useEffect(() => {
        void (async () => {
            const cs = await courseClient.fetchAllCourses();
            setCourses(cs);
        })();
    }, []);

    const addNewCourse = async () => {
        if (!course.name.trim()) return;
        await courseClient.createCourse(course);
        const cs = await courseClient.fetchAllCourses();
        setCourses(cs);
        setCourse({
            _id: "0",
            name: "",
            number: "",
            startDate: "",
            endDate: "",
            image: "/images/reactjs.jpg",
            description: "",
            department: "",
            credits: 3,
            author: "",
        });
    };

    const updateCourse = async () => {
        if (!course._id || course._id === "0") return;
        const updated = await courseClient.updateCourse(course);
        setCourses(courses =>
            courses.map(c => c._id === updated._id ? updated : c)
        );
        setCourse({
            _id: "0",
            name: "",
            number: "",
            startDate: "",
            endDate: "",
            image: "/images/reactjs.jpg",
            description: "",
            department: "",
            credits: 3,
            author: "",
        });
    };

    const deleteCourse = async (courseId: string) => {
        await courseClient.deleteCourse(courseId);
        setCourses(courses => courses.filter((course) => course._id !== courseId));
    };

    const editCourse = (c: Course) => {
        setCourse({ ...c });
    };

    return (
        <Session>
            <div id="wd-kambaz" className="d-flex">
                <div className="d-none d-md-block">
                    <KambazNavigation />
                </div>
                <div className="flex-fill wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard" replace />} />
                        <Route path="Account/*" element={<Account />} />
                        <Route
                            path="Dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        course={course}
                                        setCourse={setCourse}
                                        addNewCourse={addNewCourse}
                                        deleteCourse={deleteCourse}
                                        updateCourse={updateCourse}
                                        editCourse={editCourse}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="Courses/:cid/*"
                            element={
                                <ProtectedRoute>
                                    <Courses courses={courses} />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}