import { useEffect, useState } from "react";
import * as client from "./client";

export function HttpClient() {
    // State for click-triggered fetch
    const [welcomeOnClick, setWelcomeOnClick] = useState("");
    // State for load-triggered fetch
    const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

    // Fetch when user clicks button
    const fetchWelcomeOnClick = async () => {
        const message = await client.fetchWelcomeMessage();
        setWelcomeOnClick(message);
    };

    // Fetch once when component mounts
    const fetchWelcomeOnLoad = async () => {
        const message = await client.fetchWelcomeMessage();
        setWelcomeOnLoad(message);
    };

    // useEffect with empty dependency array runs only once on mount
    useEffect(() => {
        fetchWelcomeOnLoad();
    }, []);

    return (
        <div id="wd-http-client">
            <h3>HTTP Client</h3>
            <hr/>

            {/* Requesting on Click */}
            <h4>Requesting on Click</h4>
            <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
                Fetch Welcome
            </button>
            <br/>
            Response from server (on click): <b>{welcomeOnClick}</b>
            <hr/>

            {/* Requesting on Load */}
            <h4>Requesting on Load</h4>
            Response from server (on load): <b>{welcomeOnLoad}</b>
            <hr/>
        </div>
    );
}