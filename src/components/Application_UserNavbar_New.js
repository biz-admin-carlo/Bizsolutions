import { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { PiUserLight, PiMagnifyingGlassThin } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiSearch, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../UserContext';

import logo1 from '../assets/icon-app-logo.jpg';

import '../assets/styles/AppNavbar.css';


const ServiceSection = ({ title, services, visible }) => {
  const navigate = useNavigate();

  const serviceToPath = {
    "Website Development": "/website-development-solutions",
    "Website Revamp": "/website-revamp-solutions",
    "SEO Solutions": "/seo-solutions",
    "Bookkeeping": "/bookkeeping-services",
    "Technical & IT Support": "/technical-support-services",
    "Customer Support": "/customer-support-services",
    "Sales & Collection": "/sales-collection-services"
  };

  const handleServiceClick = (service) => {
    const path = serviceToPath[service];
    if (path) {
      navigate(path);
    } else {
      console.error("No path found for service:", service);
    }
  };

  if (!visible) return null;

  return (
    <div className="bg-light" data-aos="fade-down">
      <div className="container">
        <div className="row">
          <div className="col mt-3">
            <h6>{title}</h6>
            <hr />
              {services.map((service, index) => (
                <p key={index} className="service-item" onClick={() => handleServiceClick(service)}>
                  {service}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  const [ searchBarVisible, setSearchBarVisible ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ userCoordinates, setUserCoordinates ] = useState({});
  const [ showPromo, setShowPromo ] = useState(true);
  const [ location, setLocation ] = useState('');
  const [ showSolutions, setShowSolutions ] = useState(false);
  const [ showServices, setShowServices ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ userLocation, setUserLocation ] = useState('');
  const [ isTokenPresent, setIsTokenPresent ] = useState(false);

  const navigate = useNavigate();
  const locations = useLocation();

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

  const handleHideDiv = () => {
    setShowPromo(false);
  };

  const toggleSearchBarVisible = () => {
    setSearchBarVisible(prev => {
      if (prev) { 
        return false;
      } else {
        setShowSolutions(false);
        setShowServices(false);
        return true;
      }
    });
  };

  const toggleSolutions = () => {
    setShowSolutions(prev => !prev);
    if (!showSolutions) {
      setShowServices(false);
      setSearchBarVisible(false);
    }
  };

  const toggleServices = () => {
    setShowServices(prev => !prev);
    if (!showServices) {
      setShowSolutions(false);
      setSearchBarVisible(false);
    }
  };

  const [ showFirst, setShowFirst ] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prevShowFirst) => !prevShowFirst);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setShowSolutions(false);
    setShowServices(false);
    setSearchBarVisible(false);
  }, [locations.pathname]);

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

  const servicesInfo = [
    { key: 'solutions', title: 'BizSolutions', services: ['Website Development', 'Website Revamp', 'SEO Solutions'], visible: showSolutions },
    { key: 'services', title: 'BizServices', services: ['Bookkeeping', 'Technical & IT Support', 'Customer Support', 'Sales & Collection'], visible: showServices }
  ];

  return (
    <>
      {showPromo && (
        <div className="bg-light" data-aos="fade-down">
          <div className="container" data-aos="fade-down">
            <div className="row" data-aos="fade-down">
              <div className="col text-center mt-3" data-aos="fade-down">
                {showFirst && (
                  <p data-aos="fade-down">
                    <span style={{ fontWeight: 'bold' }}>Enjoy referral discounts and earn credits! </span>
                    <FiX
                      style={{ cursor: 'pointer' }}
                      color="#000000"
                      size="1.3em"
                      className="float-end"
                      data-aos="fade-down"
                      onClick={handleHideDiv}
                    />
                  </p>
                )}
                {!showFirst && (
                  <p data-aos="fade-down">
                    Save up to 10% off on selected services. <span style={{ textDecoration: 'underline' }}>Check now</span>.
                    <FiX
                      style={{ cursor: 'pointer' }}
                      color="#000000"
                      size="1.3em"
                      className="float-end"
                      data-aos="fade-down"
                      onClick={handleHideDiv}
                    />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Navbar expand="lg" className="py-3 biz-bg-color">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img alt="BizSolutions LLC" src={logo1} width="auto" height="50px" />
            </Navbar.Brand>
          </Link>

          {/* Icons for small and medium screens */}
          <Nav className="ms-auto nav-link d-lg-none flex-row">
            <div onClick={toggleSearchBarVisible}>
              <Nav.Link href="#link" className="px-2">
                <PiMagnifyingGlassThin title="Search Products" color="#000000" size="2em" />
              </Nav.Link>
            </div>
            <Nav.Link as={Link} to={user.id ? "/account" : "/login"} className="px-2">
              <PiUserLight title="Account Settings" color="#000000" size="2em" />
            </Nav.Link>
          </Nav>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-auto nav-link text-uppercase">
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
                  <div onClick={toggleSolutions}>
                    <Nav.Link className="px-2">
                      Solutions {showSolutions ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Nav.Link>
                  </div>
                  <div onClick={toggleServices}>
                    <Nav.Link className="px-2">
                        Services {showServices ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Nav.Link>
                  </div>
                  <Nav.Link as={Link} to="/support">Support</Nav.Link>
                  <Nav.Link as={Link} to="/blog">Blog</Nav.Link>

                </>
            </Nav>
          </Navbar.Collapse>

          {/* Icons for large screens */}
          <Nav className="ms-auto nav-link d-none d-lg-flex flex-row">
            <div onClick={toggleSearchBarVisible}>
              <Nav.Link href="#link" className="px-2">
                <PiMagnifyingGlassThin title="Search Products" color="#000000" size="2em" />
              </Nav.Link>
            </div>
            <Nav.Link as={Link} to={isTokenPresent ? "/account" : "/login"} className="px-2">
              <PiUserLight title="Account Settings" color="#000000" size="2em" />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {servicesInfo.map(info => (
        <ServiceSection key={info.key} title={info.title} services={info.services} visible={info.visible} />
      ))}

      {searchBarVisible && (
        <Navbar style={{ background: '#ffffff' }} expand="lg">
          <Container>
            <Form inline style={{ display: 'flex', alignItems: 'center', width: '100%' }} onSubmit={handleSearchSubmit}>
              <FiSearch style={{ marginRight: '10px' }} />
              <FormControl 
                type="text" 
                value={searchTerm}
                placeholder="Search"
                style={{ width: '100%', border: 'none' }}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <FiX style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={toggleSearchBarVisible} />
            </Form>
          </Container>
        </Navbar>
      )}
    </>
  );
}