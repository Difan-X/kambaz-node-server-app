import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import db from "../../../Kambaz/Database/index.js";
import type { User } from "../../Database/types.ts";
import type {Enrollment} from "../../../../../Kambaz/Database/types.ts";

export default function PeopleTable() {
    const { cid } = useParams<{ cid: string }>();

    // Now this will work properly
    const enrolled = db.users.filter((usr: User) =>
        db.enrollments.some((en: Enrollment) =>
            en.user === usr._id && en.course === cid
        )
    );

    const displayList: User[] = enrolled.length > 0 ? enrolled : db.users;

    return (
        <div id="wd-people-table" className="p-3 bg-white shadow-sm">
            <Table striped>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {displayList.map((user: User) => (
                    <tr key={user._id}>
                        <td className="wd-full-name text-nowrap">
                            <FaUserCircle className="me-2 fs-1 text-secondary" />
                            <span className="wd-first-name">{user.firstName}</span>{" "}
                            <span className="wd-last-name">{user.lastName}</span>
                        </td>
                        <td className="wd-login-id">{user.loginId}</td>
                        <td className="wd-section">{user.section}</td>
                        <td className="wd-role">{user.role}</td>
                        <td className="wd-last-activity">{user.lastActivity}</td>
                        <td className="wd-total-activity">{user.totalActivity}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}