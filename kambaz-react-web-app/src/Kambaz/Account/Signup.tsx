import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser, type User } from "./reducer";

interface Credentials {
    username: string;
    password: string;
    passwordVerify: string;
}

export default function Signup() {
    const [credentials, setCredentials] = useState<Credentials>({
        username: "",
        password: "",
        passwordVerify: "",
    });
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setError(null);

        if (!credentials.username || !credentials.password) {
            setError("Username and password are required.");
            return;
        }
        if (credentials.password !== credentials.passwordVerify) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const newUser = await client.signup({
                username: credentials.username,
                password: credentials.password,
            });

            dispatch(setCurrentUser(newUser as User));

            navigate("/Kambaz/Account/Profile");
        } catch (err: any) {
            setError(err.response?.data?.message || "Sign up failed.");
        }
    };

    return (
        <Card id="wd-signup-screen" className="p-4 shadow-sm mx-auto" style={{ maxWidth: 400 }}>
            <Card.Body>
                <Card.Title>Sign Up</Card.Title>

                {error && (
                    <Alert id="wd-signup-error" variant="danger">
                        {error}
                    </Alert>
                )}

                <Form>
                    <Form.Group className="mb-3" controlId="wd-signup-username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a username"
                            value={credentials.username}
                            onChange={(e) =>
                                setCredentials({ ...credentials, username: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="wd-signup-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter a password"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="wd-signup-password-verify">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter your password"
                            value={credentials.passwordVerify}
                            onChange={(e) =>
                                setCredentials({ ...credentials, passwordVerify: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Button
                        variant="success"
                        className="w-100"
                        onClick={handleSignUp}
                        id="wd-signup-btn"
                        type="button"
                    >
                        Sign Up
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <Link to="/Kambaz/Account/Signin" id="wd-signin-link">
                        Already have an account? Sign In
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}