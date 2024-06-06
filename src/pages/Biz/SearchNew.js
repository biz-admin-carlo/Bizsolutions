import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import { Container } from 'react-bootstrap';

import BusinessCard from '../../components/Biz/Search_BusinessCard';
import Pagination from '../../components/Biz/Search_Pagination';
import Breadcrumb from '../../components/Biz/Search_Breadcrumb';
import AppFooter from '../../components/Biz/Application_Footer';
import BusinessCardSkeleton from '../../components/Biz/Search_BusinessCardSkeleton';

import 'react-loading-skeleton/dist/skeleton.css';
import '../../assets/Biz/styles/Search.css';


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

// const createClient = async (location, searchTerm, coords) => {

//   try {
//     const response = await axios.post(`${apiUrl}/api/v1/client/create/client`, {
//       clientLocation: location,
//       clientSearchTerm: searchTerm,
//       clientCoords: coords,
//     });
//     console.log(response);
//     return response;
//   } catch (error) {
//   }
// };

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

  const [searchedLocation, setSearchedLocation] = useState(null);
  const [searchedCategory, setSearchedCategory] = useState(null);

  console.log()


  useEffect(() => {
    const storedCoords = sessionStorage.getItem('userCoordinates');
    if (storedCoords) {
      setUserCoordinates(JSON.parse(storedCoords));
    } else {
      getUserCoordinates(setUserCoordinates);
    }

    const storedLocation = sessionStorage.getItem('searchedLocation');
    if (storedLocation) {
      setSearchedLocation(storedLocation);
    }

    const storedCategory = sessionStorage.getItem('searchedCategory');
    if (storedCategory) {
      setSearchedCategory(storedCategory);
    }

    // createClient(searchedLocation, searchedCategory, userCoordinates);

  }, []);

  return (
    <div className='app-background'>
    <>
      <Helmet>
        <title>BizSolutions | Listings</title>
      </Helmet>

      <Container>

        <Breadcrumb
          coordinates={coordinates}
          category={category}
          locationState={locationState}
        />
      
        <h3>{generateHeaderTitle()}</h3>

        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <BusinessCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <div>
            <div className="card-container-new">
              {renderBusinessCards()}
            </div>

            {resultState && resultState.businesses && resultState.businesses.length > itemsPerPage && (
              <div className="center-content">
                <Pagination
                  totalItems={resultState.businesses.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
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