import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

export default function TOC() {
    return (
        <Nav variant="pills" className="mb-4">
            <Nav.Item>
                <Nav.Link as={NavLink} to="/Labs" end>
                    Labs
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/Labs/Lab1">
                    Lab 1
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/Labs/Lab2">
                    Lab 2
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/Labs/Lab3">
                    Lab 3
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/Labs/Lab4">
                    Lab 4
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/Labs/Lab5">
                Lab 5
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/Kambaz">
                    Kambaz
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    href="https://github.com/Difan-X/kambaz-react-web-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    My GitHub Repo
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item disabled">
                <span className="nav-link">Difan Xie</span>
            </Nav.Item>
        </Nav>
    );
}
