import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table.tsx";

interface Course {
    _id: string;
    name: string;
    number?: string;
    startDate?: string;
    endDate?: string;
    image?: string;
    description?: string;
}

interface CoursesProps {
    courses: Course[];
}

export default function Courses({ courses }: CoursesProps) {
    // 1. Extract the course‐ID (cid) from the URL parameters
    const { cid } = useParams<{ cid: string }>();

    // 2. Find the matching course object in the passed‐in array
    const course = courses.find((c) => c._id === cid);

    // 3. Use the current pathname to determine which sub‐section is active
    const { pathname } = useLocation();
    const parts = pathname.split("/");
    // parts = ["", "Kambaz", "Courses", "<cid>", "<section>", ...]
    // so parts[4] is the section name (Home, Modules, etc.)
    const section = parts[4] || "Home";

    return (
        <div id="wd-courses" className="d-flex">
            {/* Sidebar navigation (hidden on xs/sm, shown on md+) */}
            <div className="d-none d-md-block">
                <CourseNavigation />
            </div>

            {/* Main content area */}
            <div className="flex-fill p-3">
                {/* Breadcrumb header showing selected course name and section */}
                <h2 className="text-danger d-flex align-items-center">
                    <FaAlignJustify className="me-2 fs-4" />
                    {course ? course.name : "Course"} &gt; {section}
                </h2>
                <hr />

                {/*
          If `course` is undefined (because no match was found), you might
          want to show a “Not Found” message or redirect. For simplicity,
          we’ll let the sub-routes render—but you could also place:

          if (!course) return <h2>Course not found</h2>;

          above this <Routes> block if desired.
        */}
                <Routes>
                    {/* Default to “Home” sub-route */}
                    <Route index element={<Navigate to="Home" replace />} />

                    {/* Each child route renders the appropriate component */}
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                    <Route path="People" element={<PeopleTable />} />
                </Routes>
            </div>
        </div>
    );
}