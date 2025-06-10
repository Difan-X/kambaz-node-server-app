import { useState } from "react";
import { FormControl, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser, type User } from "./reducer";
import * as client from "./client";
import axios from 'axios';


export default function Signin() {
    const [credentials, setCredentials] = useState<{ username: string; password: string }>({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signinHandler = async () => {
        setError(null);
        try {
            const user = await client.signin(credentials);
            if (!user) {
                setError("Invalid username or password.");
                return;
            }
            // Dispatch the matched user into Redux state
            dispatch(setCurrentUser(user as User));
            // Navigate to Dashboard
            navigate("/Kambaz/Dashboard", { replace: true });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Sign in failed");
            } else {
                setError("Sign in failed");
            }
        }
    };

    return (
        <Card id="wd-signin-screen" className="p-4 shadow-sm">
            <Card.Body>
                <Card.Title>Sign In</Card.Title>

                {error && (
                    <Alert id="wd-signin-error" variant="danger">
                        {error}
                    </Alert>
                )}

                <FormControl
                    id="wd-username"
                    type="text"
                    placeholder="Username"
                    className="mb-2"
                    value={credentials.username}
                    onChange={(e) =>
                        setCredentials({ ...credentials, username: e.target.value })
                    }
                />

                <FormControl
                    id="wd-password"
                    type="password"
                    placeholder="Password"
                    className="mb-2"
                    value={credentials.password}
                    onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })
                    }
                />

                <Button
                    id="wd-signin-btn"
                    className="w-100"
                    onClick={signinHandler}
                >
                    Sign In
                </Button>

                <div className="text-center mt-3">
                    <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
                        Need an account? Sign Up
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}