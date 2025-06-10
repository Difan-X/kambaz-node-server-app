import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Kambaz/store";
import Labs from "./Labs";
import Kambaz from "./Kambaz";

export default function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Navigate to="Kambaz" replace />} />
                    <Route path="/Labs/*" element={<Labs />} />
                    <Route path="/Kambaz/*" element={<Kambaz />} />
                </Routes>
            </Provider>
        </HashRouter>
    );
}