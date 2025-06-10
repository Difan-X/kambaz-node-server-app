import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormControl, Button, Card } from "react-bootstrap";
import type { RootState } from "../store";
import { setCurrentUser, type User } from "./reducer";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<Partial<User>>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);

    useEffect(() => {
        if (!currentUser) {
            navigate("/Kambaz/Account/Signin", { replace: true });
        } else {
            setProfile({ ...currentUser });
        }
    }, [currentUser, navigate]);

    const updateProfile = async () => {
        if (!profile._id) return;
        try {
            const updated = await client.updateUser(profile);
            dispatch(setCurrentUser(updated));
            alert("Profile updated!");
        } catch (e) {
            if (e instanceof Error) {
                alert("Update failed: " + e.message);
            } else {
                alert("Update failed: " + String(e));
            }
        }
    };

    const signout = async () => {
        try {
            await client.signout();
        } catch {
            // signout
        }
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin", { replace: true });
    };

    if (!currentUser) return null;

    return (
        <Card id="wd-profile-screen" className="p-4 shadow-sm">
            <Card.Body>
                <Card.Title>Your Profile</Card.Title>
                {profile && (
                    <>
                        <FormControl
                            type="text"
                            placeholder="Username"
                            value={profile.username || ""}
                            className="mb-2"
                            id="wd-username"
                            onChange={(e) =>
                                setProfile({ ...profile, username: e.target.value })
                            }
                        />

                        <FormControl
                            type="password"
                            placeholder="Password"
                            value={profile.password || ""}
                            className="mb-2"
                            id="wd-password"
                            onChange={(e) =>
                                setProfile({ ...profile, password: e.target.value })
                            }
                        />

                        {/* First Name */}
                        <FormControl
                            type="text"
                            placeholder="First Name"
                            value={profile.firstName || ""}
                            className="mb-2"
                            id="wd-firstname"
                            onChange={(e) =>
                                setProfile({ ...profile, firstName: e.target.value })
                            }
                        />

                        {/* Last Name */}
                        <FormControl
                            type="text"
                            placeholder="Last Name"
                            value={profile.lastName || ""}
                            className="mb-2"
                            id="wd-lastname"
                            onChange={(e) =>
                                setProfile({ ...profile, lastName: e.target.value })
                            }
                        />

                        {/* Date of Birth */}
                        <FormControl
                            type="date"
                            placeholder="Date of Birth"
                            value={profile.dob || ""}
                            className="mb-2"
                            id="wd-dob"
                            onChange={(e) =>
                                setProfile({ ...profile, dob: e.target.value })
                            }
                        />

                        {/* Email */}
                        <FormControl
                            type="email"
                            placeholder="Email"
                            value={profile.email || ""}
                            className="mb-2"
                            id="wd-email"
                            onChange={(e) =>
                                setProfile({ ...profile, email: e.target.value })
                            }
                        />

                        {/* Role */}
                        <FormControl
                            as="select"
                            value={profile.role || "STUDENT"}
                            className="mb-2"
                            id="wd-role"
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    role: e.target.value as User["role"],
                                })
                            }
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </FormControl>

                        <Button
                            onClick={signout}
                            variant="outline-secondary"
                            className="w-100 mb-2"
                            id="wd-signout-btn"
                        >
                            Sign out
                        </Button>

                        <Button
                            variant="primary"
                            className="w-100"
                            id="wd-save-profile-btn"
                            onClick={updateProfile}
                        >
                            Save Changes
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}