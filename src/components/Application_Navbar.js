import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl } from 'react-bootstrap';
import { FiX } from 'react-icons/fi';
import UserContext from '../UserContext';

import logo from '../assets/icon-app-logo.jpg';
import '../assets/styles/AppNavbar.css';


export default function AppNavbar() {

  const { unsetUser } = useContext(UserContext);
  const [ searchBarVisible, setSearchBarVisible ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ isTokenPresent, setIsTokenPresent ] = useState(false);

  const [ location, setLocation ] = useState('');
  const [ userLocation, setUserLocation ] = useState('');
  const [ userCoordinates, setUserCoordinates ] = useState({});
  const [ loading, setLoading ] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem('token');
      setIsTokenPresent(!!token);
    };

    checkToken();

    window.addEventListener('storage', checkToken);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation('My Current Location');
          setUserCoordinates(coords);
          sessionStorage.setItem('userCoordinates', JSON.stringify(coords));
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    }

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);


  const handleLogout = () => {
    unsetUser();
    window.location.reload();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  
    // Construct query parameters using URLSearchParams
    const queryParams = new URLSearchParams({
      category: searchTerm,
      location: `Lat:${userCoordinates.latitude},Long:${userCoordinates.longitude}`
    }).toString();
    sessionStorage.setItem('searchedLocation', JSON.stringify(location));

  
    // Navigate to the search page with the constructed query parameters
    navigate(`/search?${queryParams}`);
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
            <div onClick={() => setSearchBarVisible(!searchBarVisible)}>
              <Nav.Link as={Link} to="/" className="navbar-options">Search</Nav.Link>
            </div>

            <Nav.Link as={Link} to="/pricing" className="navbar-options">Pricing</Nav.Link>

            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Services"
                className="navbar-options"
              >
                <NavDropdown.Item as={Link} to="/website-development">Website Development</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/bookkeeping">Bookkeeping</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/technical-support">Technical & IT Support</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/customer-service">Customer Service Support</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sales-collection">Sales & Collections</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            
            {/* Conditional rendering based on isTokenPresent */}
            {isTokenPresent ? (
              <>
                {/* These links are shown only when isTokenPresent is true */}
                <Nav.Link as={Link} to="/add-biz" className="navbar-options">Be on the Map</Nav.Link>
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
            <Form inline style={{ display: 'flex', alignItems: 'center', width: '100%' }} onSubmit={handleSearchSubmit}>
              <FormControl
                type="text"
                value={searchTerm}
                placeholder="Search"
                style={{ width: '100%', border: 'none' }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
