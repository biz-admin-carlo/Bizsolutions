import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Breadcrumb } from 'react-bootstrap';
import 'react-loading-skeleton/dist/skeleton.css';
import '../assets/styles/Search.css';
import BusinessCard from '../components/BusinessCard';
import SearchResult from '../components/SearchResult';
import AppFooter from '../components/AppFooter';
import BusinessCardSkeleton from '../components/BusinessCardSkeleton';

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
        sessionStorage.setItem('userCoordinates', JSON.stringify(coords));
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
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get('category');
  
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
    let title = `Best ${category}`;

    if (currentPage === 1) {
      title = `Top 10 ${title}`;
    }
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
    const storedCoords = sessionStorage.getItem('userCoordinates');
    if (!storedCoords) {
      getUserCoordinates(setUserCoordinates);
    } else {
      setUserCoordinates(JSON.parse(storedCoords));
    }
  }, []);

  useEffect(() => {
    const queryLocation = query.get('location');
    const queryCategory = query.get('category');
  
    const isCoordinates = queryLocation && queryLocation.includes('Lat') && queryLocation.includes('Long');
  
    if (isCoordinates) {
      const [latPart, longPart] = queryLocation.split(',');
      const latitude = latPart.split(':')[1];
      const longitude = longPart.split(':')[1];
  
      const api = `${apiUrl}/api/v1/location/search/v1?latitude=${latitude}&longitude=${longitude}&term=${queryCategory}`;
      fetchApiData(api, setResultState, setLoading);
    } else {

      const api = `${apiUrl}/api/v1/location/search/v2/?state=${queryLocation}&category=${queryCategory}`;
      fetchApiData(api, setResultState, setLoading);
    }
  }, []);

  return (
    <div className='app-background'>
    <>
      <SearchResult />

      <Container>
        <Breadcrumb className='pt-2'>
          <Breadcrumb.Item onClick={() => navigate('/')} className="no-text-decoration">Home</Breadcrumb.Item>
          <Breadcrumb.Item active className="no-text-decoration">
            {generateBreadcrumbText()}
          </Breadcrumb.Item>
        </Breadcrumb>
      
      <h3>{generateHeaderTitle()}</h3>

        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
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
      <AppFooter />
    </>
    </div>
  );
};