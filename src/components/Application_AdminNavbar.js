import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';

import '../assets/styles/AppNavbar.css';

export default function UserNavbar() {

  const { unsetUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    unsetUser();
    window.location.reload();
  }

  return (
    <>
      <Navbar expand="lg" className="app-navbar px-5">
        <Container>
        <Nav.Link as={Link} to="/" className="navbar-logo-name">BizSolutions</Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">User</Nav.Link>
              <Nav.Link href="#action2">Business</Nav.Link>
              <NavDropdown title="Settings" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/logout" className="navbar-options" onClick={handleLogout}>Logout</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
}
