export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    description: string;
    author?: string;
}

export interface Module {
    _id: string;
    courseId: string;
    title: string;
    lessons: string[];
}

export interface Assignment {
    _id: string;
    courseId: string;
    title: string;
    module: string;
    notAvailable: string;
    due: string;
    pts: number;
}

export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}

export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

// Database class with proper array types
export default class Database {
    static courses: Course[] = [];
    static users: User[] = [];
    static enrollments: Enrollment[] = [];
    static modules: Module[] = [];
    static assignments: Assignment[] = [];
}

// Create and export a database instance
const db = Database;
export { db };