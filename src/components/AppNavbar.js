import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';

import UserContext from '../UserContext';

import '../assets/styles/AppNavbar.css'

export default function AppNavbar() {

  const { user, unsetUser } = useContext(UserContext);
  const [ searchBarVisible, setSearchBarVisible ] = useState(false);

   // Define a function to handle logout
  const handleLogout = () => {
    unsetUser(); // Call the function to unset the user
    window.location.reload(); // Reload the window to reflect changes
  };

  return (
    <>
      <Navbar expand="lg" className="app-navbar pt-1 py-0">
        <Container>
          <Nav.Link as={Link} to="/" className="navbar-logo-name">Bizsolution</Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-link">
                {/* Render based on user.isAdmin and user.id status */}
                {user.isAdmin ? (
                  <>
                    <Nav.Link as={Link} to="/admin" className="navbar-options">Admin</Nav.Link>
                    <Nav.Link as={Link} to="/logout" className="navbar-options" onClick={handleLogout}>>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <div onClick={() => setSearchBarVisible(!searchBarVisible)}>
                      <Nav.Link as={Link} to="/" className="navbar-options">Search</Nav.Link>
                    </div>
                    
                    {/* Check if user is logged in (assuming user.id would be set if logged in) */}
                    {user.id ? (
                      <>
                        {/* User is logged in, show logout option */}
                        <Nav.Link as={Link} to="/account" className="navbar-options">Account</Nav.Link>
                        <Nav.Link as={Link} to="/logout" className="navbar-options" onClick={handleLogout}>Logout</Nav.Link>
                      </>
                    ) : (
                      <>
                        {/* User not logged in, show login and sign up */}
                        <Nav.Link as={Link} to="/login" className="navbar-options">Log In</Nav.Link>
                        <Nav.Link as={Link} to="/sign-up" className="navbar-options">Sign Up</Nav.Link>
                      </>
                    )}
                  </>
                )}
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* Conditional rendering for the search navbar */}
      {searchBarVisible && (
        <Navbar style={{ background: '#FF851A' }} expand="lg" data-aos="fade-down">
          <Container>
            <Form inline style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <FormControl type="text" placeholder="Search" style={{ width: '100%', border: 'none' }} />
              <FiX
                style={{ marginLeft: '10px', cursor: 'pointer' }}
                onClick={() => setSearchBarVisible(false)} // Hide the search bar
              />
            </Form>
          </Container>
        </Navbar>
      )}
      
    </>
  );
}
