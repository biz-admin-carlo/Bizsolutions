import React, { useState, useEffect } from 'react';
import { getBizViaCoords, getBizViaState, haversineDistance } from '../../utils/Biz/ClientUtils';
import { Card, Badge, Pagination } from 'react-bootstrap';
import '../../assets/Biz/styles/SearchResult.css';

const defaultImage = 'https://mybizsolutions.us/static/media/icon-app-logo.83ff8bf39a11df9fb7ac.jpg';

export default function SearchState({location, category}) {
    const [ latitude, setLatitude ] = useState(0);
    const [ longitude, setLongitude ] = useState(0);
    const [ businesses, setBusinesses ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 12;

    // console.log(businesses); 
    // console.log(latitude);
    // console.log(longitude);

    // useEffect(() => {
    //     const coords = parseLocation(location);
    //     setLatitude(coords.lat);
    //     setLongitude(coords.long);
    // }, [location]);

    // function parseLocation(loc) {
    //     const parts = loc.split(',');
    //     const lat = parseFloat(parts[0].split(':')[1]);
    //     const long = parseFloat(parts[1].split(':')[1]);
    //     return { lat, long };
    // }

    const fetchBusinesses = async () => {
        let result = null;
        try {
            if (location.includes('Lat') && location.includes('Long')) {
                const [lat, long] = location.replace('Lat:', '').replace('Long:', '').split(',');
                // console.log(parseFloat(lat), parseFloat(`-${long}`), category)
                result = await getBizViaCoords(parseFloat(lat), parseFloat(`${long}`), category);
            } else {
                result = await getBizViaState(location, category);
            }
            setBusinesses(result.data.data.businesses);
        } catch (error) {
            console.error("Error fetching businesses:", error);
            setBusinesses([]);
        } 
    };

    useEffect(() => {
        fetchBusinesses();
    }, [location, category]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = businesses.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(businesses.length / itemsPerPage);
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div>
            <h1>Bizness Listings</h1>
            <div className="business-container">
                {currentItems.map((business, index) => (
                    <div key={index} className="business-card">
                        <Card style={{ width: '18rem' }} className='my-2'>
                        <Card.Img variant="top" src={business.image_url || defaultImage} onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }} alt={`Image of ${business.name}`} />
                            <Card.Body>
                                <h5 className='biz-color text-start'>{business.name}</h5>
                                <h6>{business.location.address1}</h6>
                                <Badge pill bg="primary">{business.phone}</Badge><br/>
                                <Badge pill bg="danger">{business.categories[0].title}</Badge><br/>
                                <Badge pill bg="success">Create Website with Us!</Badge><br/>
                                {business.isBizDB ? (
                                    <Badge pill bg="warning">Powered By BizSolutions</Badge>
                                ) : null}
                                {/* <span className='text-secondary url-link'>Distance from My Location: <Badge bg="secondary ms-1">{distanceInMiles} Miles</Badge></span> */}
                            
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            {businesses.length === 0 && <p>No businesses found.</p>}
            {businesses.length > 0 && (
                <Pagination className="justify-content-center">{paginationItems}</Pagination>
            )}
        </div>
    );
}