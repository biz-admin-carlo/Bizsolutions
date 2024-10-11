import { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import UserContext from '../../../../utils/Contexts/userContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../../../../assets/styles/AppNavbar.css';

export default function UserNavbar() {

  const { user, unsetUser } = useContext(UserContext);
  const navigate = useNavigate(); // This should be outside of handleLogout

  if (user.isAdmin === 'false') {
    localStorage.removeItem('token'); 
    window.location.reload();
  }

  const handleLogout = () => {
    unsetUser();
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

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
              {
                (user.isAdmin) && (
                  <>
                    {
                      (user.isSuperAdmin) && (
                        <>
                          <NavDropdown title="User" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to={`/admin-dashboard/${user._id}/add-biz`} className="navbar-options">
                                View User
                              </Nav.Link>
                            </NavDropdown.Item>
                          </NavDropdown>
                        </>
                      )
                    }
                    {
                      (user.isVendor) && (
                        <>
                          <NavDropdown title="Representatives" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to={`/admin-dashboard/${user._id}/see-agents`} className="navbar-options">
                                View Agent
                              </Nav.Link>
                            </NavDropdown.Item>
                          </NavDropdown>
                        </>
                      )
                    }
                      <NavDropdown title="Biz" id="basic-nav-dropdown">
                        <NavDropdown.Item>
                          <Nav.Link as={Link} to={`/admin-dashboard/${user._id}/add-biz`} className="navbar-options">
                            Add Biz
                          </Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Nav.Link as={Link} to={`/admin-dashboard/${user._id}/see-biz`} className="navbar-options">
                            See Biz
                          </Nav.Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                  </>
                  
                )
              }
              <NavDropdown title="Payment" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Nav.Link as={Link} to={`/admin-dashboard/${user._id}/payment-link/monthly`} className="navbar-options">
                    Monthly
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to={`/admin-dashboard/${user._id}/payment-link/annually`} className="navbar-options">
                    Annually
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link action onClick={handleLogout} className="navbar-options">Logout</Nav.Link>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
}
