import React, { useState, useEffect } from 'react';
import { getBizViaCoords, getBizViaState } from '../../../utils/Biz/ClientUtils.js';
import BusinessCard from './BusinessCardsV2.js';
import '../../../assets/styles/NewSearchResults.css';
import Pagination from './Pagination.js';
import AOS from 'aos';

export default function SearchCoords({ location, category }) {
    const [businesses, setBusinesses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const fetchBusinesses = async () => {
        let result = null;
        try {
            if (location.includes('Lat') && location.includes('Long')) {
                const [lat, long] = location.replace('Lat:', '').replace('Long:', '').split(',');
                result = await getBizViaCoords(parseFloat(lat), parseFloat(long), category);
            } else {
                result = await getBizViaState(location, category);
            }
            setBusinesses(result.data.data.businesses);
        } catch (error) {
            console.error('Error fetching businesses:', error);
            setBusinesses([]);
        }
    };

    useEffect(() => {
        fetchBusinesses();
    }, [location, category]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = businesses.slice(firstItemIndex, lastItemIndex);

    return (
        <div>
            <h1>Bizness Listings</h1>
            <div className="business-container">
                {currentItems.map((business, index) => (
                    <BusinessCard key={index} business={business} index={firstItemIndex + index} />
                ))}
            </div>
            {businesses.length === 0 && <p>No businesses found.</p>}
            {businesses.length > 0 && (
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={businesses.length}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    );
}
