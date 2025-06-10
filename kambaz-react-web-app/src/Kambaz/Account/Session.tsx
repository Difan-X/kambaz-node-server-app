import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: React.ReactNode }) {
    const [pending, setPending] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const doFetch = async () => {
            try {
                const currentUser = await client.profile();
                if (currentUser) {
                    dispatch(setCurrentUser(currentUser));
                } else {
                    dispatch(setCurrentUser(null));
                }
            } catch {
                dispatch(setCurrentUser(null));
            }
            setPending(false);
        };
        doFetch();
    }, [dispatch]);

    if (pending) {
        console.log('Session pending...');
        return <div>Loading session...</div>;
    }
    console.log('Session ready, rendering children');
    return <>{children}</>;
}