import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl } from 'react-bootstrap';
import { FiX } from 'react-icons/fi';
import UserContext from '../UserContext';

import logo from '../assets/icon-app-logo.jpg';
import '../assets/styles/AppNavbar.css';

export default function UserNavbar() {

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
  
    const queryParams = new URLSearchParams({
      category: searchTerm,
      location: `Lat:${userCoordinates.latitude},Long:${userCoordinates.longitude}`
    }).toString();
    sessionStorage.setItem('searchedLocation', JSON.stringify(location));
    sessionStorage.setItem('searchedCategory', JSON.stringify(searchTerm));

  
    navigate(`/search?${queryParams}`);
  };

  return (
    <>
      <Navbar expand="lg" className="app-navbar px-5">
        <Container>
          <Link to="/">
            <img src={logo} width={50} height={50} className='mx-3' alt='BizSolution Corporate Logo in Navbar'/> 
          </Link>
          <Nav.Link as={Link} to="/" className="navbar-logo-name">BizSolutions</Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
          <Nav className="ms-auto nav-link">
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
                <NavDropdown.Item as={Link} to="/website-development-services">Website Development</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/bookkeeping-services">Bookkeeping</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/technical-support-services">Technical & IT Support</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/customer-support-services">Customer Support</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sales-collection-services">Sales & Collections</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            
            {isTokenPresent ? (
              <>
                <Nav.Link as={Link} to="/add-biz" className="navbar-options">Be on the Map</Nav.Link>
                <Nav.Link as={Link} to="/account" className="navbar-options">Account</Nav.Link>
                <Nav.Link as={Link} to="/logout" className="navbar-options" onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
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
