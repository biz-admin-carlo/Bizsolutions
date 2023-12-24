import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from '../UserContext';

import '../assets/styles/AppNavbar.css'

export default function AppNavbar() {

  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar expand="lg" className="app-navbar pt-1 py-0">
        <Container>
          <Nav.Link as={Link} to="/" className="navbar-logo-name">Bizsolutions LLC.</Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-link">
{/*                <>
                  <Nav.Link as={Link} to="/login" className="navbar-options">Log In</Nav.Link>
                  <Nav.Link as={Link} to="/sign-up" className="navbar-options">Sign Up</Nav.Link>
                </>*/}
                {user.isAdmin ? (
                  <>
                    <Nav.Link as={Link} to="/login" className="navbar-options">Admin</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to={user.id ? "/account" : "/login"} className="navbar-options">Log In</Nav.Link>
                    <Nav.Link as={Link} to="/sign-up" className="navbar-options">Sign Up</Nav.Link>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
}
