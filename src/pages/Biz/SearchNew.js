import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import { Container } from 'react-bootstrap';

import { getBizViaCoords, getBizViaState, loggedVisitors } from '../../utils/Biz/ClientUtils';
import BusinessCard from '../../components/Biz/Search_BusinessCard';
import Pagination from '../../components/Biz/Search_Pagination';
import Breadcrumb from '../../components/Biz/Search_Breadcrumb';
import AppFooter from '../../components/Biz/Application_Footer';
import BusinessCardSkeleton from '../../components/Biz/Search_BusinessCardSkeleton';

import 'react-loading-skeleton/dist/skeleton.css';
import '../../assets/Biz/styles/Search.css';

export default function Search() {

  const [ searchParams ] = useSearchParams();
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const [ loading, setLoading ] = useState(true);
  const [ resultState, setResultState ] = useState({ businesses: [] });
  const [ currentPage, setCurrentPage ] = useState(1);
  const itemsPerPage = 10;
  
useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        let results;
        const savedCoords = sessionStorage.getItem('userCoordinates');
        if (savedCoords) {
          const { latitude, longitude } = JSON.parse(savedCoords);
          results = await getBizViaCoords(latitude, longitude, category);
        } else if (location.includes('Lat:') && location.includes('Long:')) {
          const coords = location.split(',').reduce((acc, curr) => {
            const [key, value] = curr.split(':');
            acc[key.trim().toLowerCase()] = parseFloat(value);
            return acc;
          }, {});
          results = await getBizViaCoords(coords.lat, coords.long, category);
        } else {
          results = await getBizViaState(location, category);
        }
        setResultState({ businesses: results.data }); 
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };
  
    fetchBusinesses();
  }, [category, location]);

  return (
    <div className='app-background'>
    <>
      <Helmet>
        <title>BizSolutions | Listings</title>
      </Helmet>

      <Container>

        <Breadcrumb
          category={category}
        />
      
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <BusinessCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <div>
            <div className="card-container-new">
              {/* {renderBusinessCards()} */}
            </div>

            {resultState && resultState.businesses && resultState.businesses.length > itemsPerPage && (
              <div className="center-content">
                <Pagination
                  totalItems={resultState.businesses.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
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