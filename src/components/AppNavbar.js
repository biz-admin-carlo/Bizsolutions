import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

import logo from '../assets/app-logo.jpg'

import UserContext from '../UserContext';

import '../assets/styles/AppNavbar.css'

export default function AppNavbar() {

  const { user, unsetUser } = useContext(UserContext);
  const [ searchBarVisible, setSearchBarVisible ] = useState(false);

  const [isTokenPresent, setIsTokenPresent] = useState(false);

  // console.log(isTokenPresent);

  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem('token');
      setIsTokenPresent(!!token);
    };
  
    checkToken();
  
    window.addEventListener('storage', checkToken);
  
    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const handleLogout = () => {
    unsetUser();
    window.location.reload();
  };

  return (
    <>
      <Navbar expand="lg" className="app-navbar px-5">
        <Container>
          <Link to="/">
            <img src={logo} width={50} height={50} className='mx-3' alt='BizSolution Logo'/> 
          </Link>
          <Nav.Link as={Link} to="/" className="navbar-logo-name">BizSolutions</Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
          <Nav className="ms-auto nav-link">
            {/* Search link - always visible */}
            {/* <div onClick={() => setSearchBarVisible(!searchBarVisible)}>
              <Nav.Link as={Link} to="/" className="navbar-options">Search</Nav.Link>
            </div> */}

            {/* Pricing link - always visible */}
            <Nav.Link as={Link} to="/pricing" className="navbar-options">Pricing</Nav.Link>
            {/* <Nav.Link as={Link} to="/services" className="navbar-options">Services</Nav.Link> */}
            
            {/* Conditional rendering based on isTokenPresent */}
            {isTokenPresent ? (
              <>
                {/* These links are shown only when isTokenPresent is true */}
                <Nav.Link as={Link} to="/account" className="navbar-options">Be on the Map</Nav.Link>
                <Nav.Link as={Link} to="/account" className="navbar-options">Account</Nav.Link>
                <Nav.Link as={Link} to="/logout" className="navbar-options" onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                {/* These links are shown only when isTokenPresent is false */}
                <Nav.Link as={Link} to="/login" className="navbar-options">Log In</Nav.Link>
                <Nav.Link as={Link} to="/sign-up" className="navbar-options">Sign Up</Nav.Link>
              </>
            )}
          </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>

      {searchBarVisible && (
        <Navbar style={{ background: '#FF851A' }} expand="lg" data-aos="fade-down">
          <Container>
            <Form inline style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <FormControl type="text" placeholder="Search" style={{ width: '100%', border: 'none' }} />
              <FiX
                style={{ marginLeft: '10px', cursor: 'pointer' }}
                onClick={() => setSearchBarVisible(false)}
              />
            </Form>
          </Container>
        </Navbar>
      )}
      
    </>
  );
}
