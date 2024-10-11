import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import { Container } from 'react-bootstrap';
import Breadcrumb from '../../../components/Biz/Search/BreadCrumbs.js';
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'
import { getUserCoordinates } from '../../../utils/Biz/ClientUtils';
import SearchState from '../../../components/Biz/Search/SearchState.js';
import SearchCoords from '../../../components/Biz/Search/SearchCoords.js';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const query = useQuery();
  const searchParams = useLocation().search; // To trigger useEffect on URL change
  const [ category, setCategory ] = useState(query.get('category'));
  const [ location, setLocation ] = useState(query.get('location'));

  // Will always collect the userCoordinates and store them in localStorage
  useEffect(() => {
    const coords = localStorage.getItem('userCoordinates');
    if (!coords) {
      getUserCoordinates((newCoords) => {
      });
    }
  }, []);

  // Will always retrieve the value of the query params
  useEffect(() => {
    setCategory(query.get('category'));
    setLocation(query.get('location'));
    // fetchBusinesses();
  }, [searchParams]);

  return (
    <div className='app-background'>
      <Helmet>
        <title>BizSolutions | Search Results</title>
      </Helmet>

      <Container>

        <Breadcrumb category={category} location={location} />

        {/* Conditional rendering with props */}
        {location.startsWith('Lat:') ? (
          <SearchCoords location={location} category={category} />
        ) : (
          <SearchState location={location} category={category} />
        )}

      </Container>

      <Footer />
    </div>
  );
}
