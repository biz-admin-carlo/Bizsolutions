import { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import UserContext from '../../UserContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../../assets/Biz/styles/AppNavbar.css';

export default function UserNavbar() {

  const { user, unsetUser } = useContext(UserContext);
  const navigate = useNavigate(); // This should be outside of handleLogout

  const handleLogout = () => {
    unsetUser(); // This function should clear all auth tokens and user data
    navigate('/login',);
  };

  if (user.isAdmin === 'false') {
    sessionStorage.removeItem('token'); 
    window.location.reload();
  }

  return (
    <>
      <Navbar expand="lg" className="app-navbar px-5">
        <Container>
        <Nav.Link as={Link} to={`/admin-dashboard/${user._id}/`} className="navbar-logo-name">BizSolutions</Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* <Nav.Link as={Link} to={`/admin-dashboard/${user._id}/users`} className="navbar-options">Users</Nav.Link> */}
              <Nav.Link as={Link} to={`/admin-dashboard/${user._id}/biz`} className="navbar-options">Add Biz</Nav.Link>

              {/* <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Settings"
                  className="navbar-options"
                >
                  <NavDropdown.Item as={Link}>Users</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/bookkeeping-services">Bookkeeping</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/technical-support-services">Technical & IT Support</NavDropdown.Item>
                </NavDropdown>
              </Nav> */}

              {/* <Nav.Link as={Link} className="navbar-options" onClick={handleLogout}>Logout</Nav.Link> */}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
}
