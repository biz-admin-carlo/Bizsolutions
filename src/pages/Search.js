import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Container, Navbar, FormControl, Breadcrumb, Card, Pagination } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../assets/styles/Search.css';
import BusinessCard from '../components/BusinessCard';

const apiUrl = process.env.REACT_APP_API_URL;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const fetchApiData = (apiUrl, setData, setLoading) => {
  axios.get(apiUrl)
    .then(response => {
      setData(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
};

const getUserCoordinates = (setUserCoordinates) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setUserCoordinates(coords);
        localStorage.setItem('userCoordinates', JSON.stringify(coords));
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

export default function Search() {
  const query = useQuery();
  const navigate = useNavigate();
  const [category, setCategory] = useState(query.get('category'));
  const [locationParam, setLocationParam] = useState(query.get('location'));
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultState, setResultState] = useState(null);
  const [locationState, setLocationState] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const parseLocation = (location) => {
    if (location && location.includes('Lat') && location.includes('Long')) {
      const coords = location.split(',').reduce((acc, curr) => {
        const [key, value] = curr.split(':');
        acc[key.trim()] = parseFloat(value.trim());
        return acc;
      }, {});
      setCoordinates(coords);
      setLocationState(null);
    } else {
      setLocationState(location);
      setCoordinates(null);
    }
  };

  const generatePlaceholder = () => {
    if (coordinates) {
      return `Search results for ${category} Near My location`;
    } else if (locationState) {
      return `Search results for ${category} in ${locationState}`;
    }
    return `Search results for ${category}`;
  };

  const generateBreadcrumbText = () => {
    if (coordinates) {
      return `Results for ${category} Near Me`;
    } else if (locationState) {
      return `Results for ${category} in ${locationState}`;
    }
    return `Results for ${category}`;
  }
  
  const renderBusinessCards = () => {
    return resultState && resultState.businesses
      ? resultState.businesses
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((business, index) => (
            <BusinessCard state={coordinates} business={business} index={index} key={business.id || index} />
          ))
      : null;
  };

  const generateHeaderTitle = () => {
    // Base title
    let title = `Best ${category}`;

    // If on the first page, prepend "Top 10" to the title
    if (currentPage === 1) {
      title = `Top 10 ${title}`;
    }

    // Adding location description
    if (coordinates) {
      title += ` Near Me`;
    } else if (locationState) {
      title += ` in ${locationState}`;
    }

    return title;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const newCategory = query.get('category');
    const newLocation = query.get('location');
    if (newCategory !== category) {
      setCategory(newCategory);
    }
    parseLocation(newLocation);
  }, [query.get('category'), query.get('location')]);

  useEffect(() => {
    const storedCoords = localStorage.getItem('userCoordinates');
    if (!storedCoords) {
      getUserCoordinates(setUserCoordinates);
    } else {
      setUserCoordinates(JSON.parse(storedCoords));
    }
  }, []);

  useEffect(() => {
    if (userCoordinates && userCoordinates.latitude && userCoordinates.longitude) {
      const api = `${apiUrl}/api/v1/location/search/v1?latitude=${userCoordinates.latitude}&longitude=${userCoordinates.longitude}&term=${category}`;
      fetchApiData(api, setResultState, setLoading);
    } else if (locationParam) {
      const api = `${apiUrl}/api/v1/location/search/v2/?state=${locationParam}&category=${category}`;
      fetchApiData(api, setResultState, setLoading);
    }
  }, [userCoordinates, locationParam, category]);

  return (
    <div className='app-background'>
    <>
      <Navbar expand="lg" className='navbar-search'>
        <Container>
          <Form className='navbar-form'>
            <FormControl
              type="text"
              placeholder={generatePlaceholder()}
              className='navbar-form-control'
            />
          </Form>
        </Container>
      </Navbar>

      <Container>
        <Breadcrumb className='pt-2'>
          <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {generateBreadcrumbText()}
          </Breadcrumb.Item>
        </Breadcrumb>
      
      <h3>{generateHeaderTitle()}</h3>

        {loading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <BusinessCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <div>
            
            {renderBusinessCards()}

            {resultState && resultState.businesses && resultState.businesses.length > itemsPerPage && (
              <div className="center-content">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {[...Array(Math.ceil(resultState.businesses.length / itemsPerPage)).keys()].map(page => (
                      <li className={`page-item ${page + 1 === currentPage ? 'active' : ''}`} key={page + 1}>
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => handlePageChange(page + 1)}
                        >
                          {page + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        )}
      </Container>
    </>
    </div>
  );
}

const BusinessCardSkeleton = () => (
  <Card className="my-2 p-3">
    <Skeleton height={150} />
    <Card.Body>
      <Skeleton count={3} />
    </Card.Body>
  </Card>
);